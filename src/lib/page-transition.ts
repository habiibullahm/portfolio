import type { TransitionDirectionalAnimations } from "astro:transitions";

/** Soft crossfade + slight rise — smoother than the default snap fade. */
export const softPage: TransitionDirectionalAnimations = {
  forwards: {
    old: {
      name: "astroFadeOut",
      duration: "280ms",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fillMode: "both",
    },
    new: {
      name: "softPageIn",
      duration: "420ms",
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fillMode: "both",
    },
  },
  backwards: {
    old: {
      name: "astroFadeOut",
      duration: "240ms",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fillMode: "both",
    },
    new: {
      name: "softPageIn",
      duration: "380ms",
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fillMode: "both",
    },
  },
};
