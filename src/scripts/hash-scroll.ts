/**
 * Land on location.hash (e.g. /#projects from detail) without showing Home first.
 * Also repairs ClientRouter misses: browser Back can update the URL to /#section
 * while the project-detail DOM is still mounted.
 */

import { navigate } from "astro:transitions/client";

function hashId(): string | null {
  const raw = window.location.hash;
  if (!raw || raw === "#") return null;
  const id = decodeURIComponent(raw.slice(1));
  if (!id || /[^\w-]/.test(id)) return null;
  return id;
}

function syncNavToSection(sectionId: string): void {
  const activeNav = sectionId;
  document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]").forEach((link) => {
    const match = link.dataset.navLink === activeNav;
    if (match) {
      link.setAttribute("aria-current", "true");
      link.classList.add("bg-accent", "text-white");
    } else {
      link.removeAttribute("aria-current");
      link.classList.remove("bg-accent", "text-white");
      link.classList.add("text-muted");
    }
  });
}

/** True when location.pathname matches the mounted page shell. */
function domMatchesLocation(): boolean {
  const path = location.pathname.replace(/\/$/, "") || "/";
  const hasHome = !!document.getElementById("home");
  if (path === "/" && !hasHome) return false;
  if (path.startsWith("/projects") && hasHome) return false;
  return true;
}

let repairing = false;

/**
 * ClientRouter sometimes updates the URL on popstate without swapping DOM
 * (detail page still showing while location is /#projects). Force a transition.
 */
function repairLocationMismatch(): boolean {
  if (repairing || domMatchesLocation()) return false;
  repairing = true;
  const href = `${location.pathname}${location.search}${location.hash}`;
  void navigate(href, { history: "replace" }).finally(() => {
    repairing = false;
  });
  return true;
}

export function scrollToHash(): boolean {
  const id = hashId();
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  // Highlight Projects (etc.) immediately — do not flash Home in the nav.
  syncNavToSection(id);

  el.scrollIntoView({ behavior: "auto", block: "start" });
  document.documentElement.classList.add("hash-ready");
  document.documentElement.classList.remove("await-hash");
  return true;
}

function scheduleHashScroll(): void {
  if (!hashId()) {
    document.documentElement.classList.add("hash-ready");
    document.documentElement.classList.remove("await-hash");
    return;
  }
  scrollToHash();
  requestAnimationFrame(() => {
    scrollToHash();
  });
}

let failsafeTimer = 0;
let listenersBound = false;

function bindGlobalListeners(): void {
  if (listenersBound) return;
  listenersBound = true;

  window.addEventListener("load", () => {
    scrollToHash();
  });
  window.addEventListener("hashchange", () => {
    if (repairLocationMismatch()) return;
    scrollToHash();
  });
  window.addEventListener("popstate", () => {
    if (repairLocationMismatch()) return;
    scrollToHash();
  });
}

export function initHashScroll(): void {
  bindGlobalListeners();
  window.clearTimeout(failsafeTimer);
  scheduleHashScroll();
  // Failsafe: never leave the page invisible if the target is missing.
  failsafeTimer = window.setTimeout(() => {
    document.documentElement.classList.add("hash-ready");
    document.documentElement.classList.remove("await-hash");
  }, 800);
}

document.addEventListener("astro:page-load", initHashScroll);
