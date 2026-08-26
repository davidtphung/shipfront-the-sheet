"use client";

import { useEffect, useState } from "react";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeSmooth = [0.22, 1, 0.36, 1] as const;

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}
