/** Section ids observed for scroll-spy (aligned with primary nav). */
const sections = [
  "home",
  "contributions",
  "projects",
  "about",
  "experience",
  "contact",
] as const;

type SectionId = (typeof sections)[number];

function setActive(sectionId: string) {
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

function hashSection(): SectionId | null {
  const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  return (sections as readonly string[]).includes(id) ? (id as SectionId) : null;
}

/** While settling on a deep link, ignore IO so Home does not steal the highlight. */
let hashLockUntil = 0;

const initialHash = hashSection();
if (initialHash) {
  setActive(initialHash);
  hashLockUntil = Date.now() + 400;
}

const observer = new IntersectionObserver(
  (entries) => {
    if (Date.now() < hashLockUntil) return;
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
