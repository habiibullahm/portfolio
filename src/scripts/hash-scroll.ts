/**
 * Land on location.hash (e.g. /#projects from detail) without showing Home first.
 */

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
      link.classList.remove("text-muted");
    } else {
      link.removeAttribute("aria-current");
      link.classList.remove("bg-accent", "text-white");
      link.classList.add("text-muted");
    }
  });
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
