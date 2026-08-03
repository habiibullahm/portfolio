/** Section ids observed for scroll-spy. Focus maps to Home in the nav. */
const sections = ["home", "focus", "work", "about", "experience", "contact"] as const;

function navIdForSection(sectionId: string): string {
  return sectionId === "focus" ? "home" : sectionId;
}

function setActive(sectionId: string) {
  const activeNav = navIdForSection(sectionId);
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

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visible[0]?.target.id) {
      setActive(visible[0].target.id);
    }
  },
  { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
);

for (const id of sections) {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
}

document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]").forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.dataset.navLink;
    if (id) setActive(id);
  });
});
