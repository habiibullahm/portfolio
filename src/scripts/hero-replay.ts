/** Replay hero entrance when returning to top / tapping Home. */

const REDUCE = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCE).matches;
}

function replayHeroAnimation(): void {
  if (prefersReducedMotion()) return;

  const els = document.querySelectorAll<HTMLElement>(".hero-animate");
  for (const el of els) {
    el.style.animation = "none";
  }
  void document.body.offsetWidth;
  for (const el of els) {
    el.style.animation = "";
  }
}

function isHomeTrigger(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  const link = target.closest("a");
  if (!link) return false;
  if (link.matches('[data-nav-link="home"]') || link.matches("[data-nav-home]")) {
    return true;
  }
  const href = link.getAttribute("href");
  return href === "#home" || href === "/#home";
}

export function initHeroReplay(): void {
  const home = document.getElementById("home");
  if (!home) return;

  let hasLeftHero = false;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          hasLeftHero = true;
          continue;
        }
        if (hasLeftHero) {
          hasLeftHero = false;
          replayHeroAnimation();
        }
      }
    },
    { threshold: 0.45 },
  );
  observer.observe(home);

  document.addEventListener("click", (event) => {
    if (!isHomeTrigger(event.target)) return;
    if (window.scrollY < 80) {
      replayHeroAnimation();
      return;
    }
    hasLeftHero = true;
  });

  document.addEventListener("scroll-to-top", () => {
    if (window.scrollY < 80) {
      replayHeroAnimation();
      return;
    }
    hasLeftHero = true;
  });
}

initHeroReplay();
