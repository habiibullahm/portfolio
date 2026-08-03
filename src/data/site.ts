export const site = {
  name: "Muhammad Habiibullah",
  chips: ["FULL-STACK", "JAVA", "TYPESCRIPT"] as const,
  eyebrow: "FULL-STACK SOFTWARE DEVELOPER · JAKARTA",
  statement: "I build production web and mobile systems that teams can",
  statementEmphasis: "ship with confidence",
  summary:
    "Full-Stack Developer with 2+ years building enterprise web and mobile systems — Java/Spring Boot, React, React Native, TypeScript. Secure REST APIs, PostgreSQL, and CI/CD delivery. Daily Cursor/MCP user who still owns the engineering decisions.",
  about:
    "I build and maintain backend services and product UIs used by internal teams and field users. I care about clear auth, solid data models, and delivery that survives production — from Spring Boot APIs to React and React Native clients.",
  skills: [
    "Java / Spring Boot",
    "TypeScript / React",
    "React Native",
    "PostgreSQL / PostGIS",
    "Redis · Kafka · RabbitMQ",
    "Docker · CI/CD",
    "JWT / RBAC · Azure AD",
    "OWASP-minded APIs",
  ],
  email: "mr.habiibullahm@gmail.com",
  socials: {
    github: "https://github.com/habiibullahm",
    linkedin: "https://www.linkedin.com/in/muhammad-habibullah/",
    linktree: "https://linktr.ee/habibullahm",
  },
  seo: {
    title: "Muhammad Habiibullah · Full-Stack Software Developer",
    description:
      "Full-Stack Software Developer in Jakarta — Java/Spring Boot, React, TypeScript. Secure APIs, product UIs, and production delivery.",
  },
} as const;

export const nav = [
  { id: "home", label: "Home", short: "Home", href: "#home" },
  { id: "work", label: "Work", short: "Work", href: "#work" },
  { id: "about", label: "About", short: "About", href: "#about" },
  { id: "experience", label: "Experience", short: "Exp.", href: "#experience" },
  { id: "contact", label: "Contact", short: "Contact", href: "#contact" },
] as const;

export const focusAreas = [
  {
    title: "Secure REST APIs",
    blurb: "Java/Spring Boot, JWT/RBAC, PostgreSQL — APIs that stay trustworthy in production.",
  },
  {
    title: "Full-stack delivery",
    blurb: "React + TypeScript admin portals and React Native workflows wired to real services.",
  },
  {
    title: "Platform & async",
    blurb: "Redis, Kafka/RabbitMQ, Docker, and CI/CD for scalable, releasable systems.",
  },
  {
    title: "Production reliability",
    blurb: "Query optimization, tests, and OWASP-aligned API habits that reduce surprise.",
  },
] as const;

export const experience = [
  {
    role: "Full-Stack Developer",
    company: "PT. Dans Multi Pro — Jakarta",
    years: "Apr 2024 – Present",
    win: "Backend services + secure REST (Spring Boot, JWT/RBAC, PostGIS); React/RN clients; Azure AD, Kafka, Redis, S3.",
  },
  {
    role: "Open Source Contributor",
    company: "PipedreamHQ",
    years: "2026",
    win: "Merged Freshdesk Ticket Summary actions (PR #20969) on an 11k+ ★ platform.",
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
