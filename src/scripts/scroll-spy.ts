const sections = ["home", "work", "about", "experience", "contact"] as const;

function setActive(id: string) {
  document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]").forEach((link) => {
    const match = link.dataset.navLink === id;
    link.setAttribute("aria-current", match ? "page" : "false");
    link.classList.toggle("bg-accent", match);
    link.classList.toggle("text-white", match);
    link.classList.toggle("text-muted", !match);
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
