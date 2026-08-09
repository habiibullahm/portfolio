/** Shared active styles for primary pill nav vs hero eyebrow links. */

export function applyNavLinkActive(
  link: HTMLAnchorElement,
  match: boolean,
): void {
  const heroLink = Boolean(link.closest("#hero-nav"));
  if (match) {
    link.setAttribute("aria-current", "true");
    if (heroLink) {
      link.classList.add("text-ink");
      link.classList.remove("text-muted");
    } else {
      link.classList.add("bg-accent", "text-white");
      link.classList.remove("text-muted");
    }
    return;
  }

  link.removeAttribute("aria-current");
  if (heroLink) {
    link.classList.remove("text-ink");
    link.classList.add("text-muted");
  } else {
    link.classList.remove("bg-accent", "text-white");
    link.classList.add("text-muted");
  }
}

export function syncAllNavLinks(sectionId: string): void {
  document
    .querySelectorAll<HTMLAnchorElement>("[data-nav-link]")
    .forEach((link) => {
      applyNavLinkActive(link, link.dataset.navLink === sectionId);
    });
}
