export const site = {
  name: "Muhammad Habiibullah",
  initials: "MH",
  eyebrow: "FULL-STACK DEVELOPER · JAKARTA",
  statement: "I design, build, and deploy end-to-end web applications that",
  statementEmphasis: "ship fast",
  summary:
    "Shipping secure APIs and full-stack products end to end — backends and interfaces that hold up in production.",
  about: {
    lead: "Building the bridge between business strategy and production code.",
    paragraphs: [
      "I'm Habib—a Jakarta-based full-stack developer who took a slightly unconventional path into software engineering. While earning my Business Management degree at the University of Informatics and Business Indonesia (GPA 3.61), I realized I wanted to be the person actually building the products. That business background stuck with me, shaping how I approach tech today: I don't just ask how to build a feature, but why it matters to the user and the business.",
      "Currently at PT. Dans Multi Pro, I build end-to-end enterprise solutions for telecommunications clients. Day-to-day, that means engineering Java/Spring Boot microservices, tuning PostgreSQL queries, and crafting web and mobile interfaces with React and React Native. On the side, I occasionally tinker with open-source integrations on Pipedream to stay sharp with new tooling.",
      "Whether I'm hardening API security, integrating AI workflows, or optimizing database performance, my goal remains straightforward: shipping clean, reliable software that solves real operational problems.",
    ],
  },
  email: "mr.habiibullahm@gmail.com",
  socials: {
    github: "https://github.com/habiibullahm",
    linkedin: "https://www.linkedin.com/in/muhammad-habibullah/",
  },
  seo: {
    title: "Muhammad Habiibullah · Full-Stack Software Developer",
    description:
      "Muhammad Habiibullah — full-stack developer in Jakarta. Helps teams build and launch reliable web products.",
  },
  contactBlurb:
    "Currently Full-Stack Developer at PT. Dans Multi Pro. Open to new opportunities — email.",
} as const;

export const nav = [
  { id: "home", label: "Home", short: "Home", href: "#home" },
  {
    id: "contributions",
    label: "Contributions",
    short: "OSS",
    href: "#contributions",
  },
  { id: "projects", label: "Projects", short: "Proj.", href: "#projects" },
  { id: "about", label: "About", short: "About", href: "#about" },
  { id: "experience", label: "Experience", short: "Exp.", href: "#experience" },
  { id: "contact", label: "Contact", short: "Contact", href: "#contact" },
] as const;

export const focusAreas = [
  {
    title: "Secure REST APIs",
    blurb:
      "Build Spring Boot APIs with clear endpoints, JWT/RBAC auth, and production-minded access control.",
  },
  {
    title: "Full-Stack Delivery",
    blurb:
      "Ship web products end to end—admin portals and apps wired to real backend services.",
  },
  {
    title: "Platform & Performance",
    blurb:
      "Support releases with Redis, Docker, and CI/CD so shipping stays repeatable.",
  },
  {
    title: "Production Reliability",
    blurb:
      "Keep systems steady after deploy—query tuning, automated tests, and careful API habits.",
  },
] as const;

export const contributions = [
  {
    title: "Freshdesk Ticket Summary Actions",
    org: "PipedreamHQ (OSS)",
    outcome:
      "Merged PR #20969 — Freshdesk Ticket Summary actions on Pipedream (11k+ ★ open-source repo).",
    href: "https://github.com/PipedreamHQ/pipedream/pull/20969",
  },
] as const;

export const education = [
  {
    label: "Bachelor",
    title: "Business Management · GPA 3.61",
    org: "University of Informatics and Business Indonesia",
  },
] as const;

export const experience = [
  {
    role: "Full-Stack Developer",
    company: "PT. Dans Multi Pro — Jakarta",
    years: "Apr 2024 – Present",
    stack: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "JWT/RBAC",
      "React",
      "React Native",
    ],
    win: "Secure Spring Boot APIs (JWT/RBAC, PostgreSQL) and React / React Native partner apps for telecom clients — including AI chat actions for core business flows.",
  },
] as const;

/** Allow only https/mailto for external destinations (OWASP A03). */
export function safeExternalUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "https:" || parsed.protocol === "mailto:") {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}

/** Site-relative asset paths only (blocks protocol-relative //… URLs). */
export function safeSitePath(path: string): string | null {
  if (path.startsWith("/") && !path.startsWith("//")) {
    return path;
  }
  return null;
}
