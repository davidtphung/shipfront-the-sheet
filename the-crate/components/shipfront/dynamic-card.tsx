"use client";

import { type ButtonHTMLAttributes, type PointerEvent, type ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { easeOutExpo, usePrefersReducedMotion } from "@/lib/motion";
import { cx } from "@/lib/utils";

type Spot = { x: number; y: number; on: boolean };

function useCardSpot() {
  const reduced = usePrefersReducedMotion();
  const [spot, setSpot] = useState<Spot>({ x: 50, y: 28, on: false });

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    setSpot({
      x: ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100,
      y: ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100,
      on: true,
    });
  }

  return {
    spot,
    reduced,
    onPointerMove,
    onPointerEnter: () => {
      if (!reduced) setSpot((current) => ({ ...current, on: true }));
    },
    onPointerLeave: () => setSpot((current) => ({ ...current, on: false })),
  };
}

function Spotlight({ spot, tone = "light" }: { spot: Spot; tone?: "light" | "night" }) {
  const color = tone === "night" ? "rgba(30, 99, 255, 0.18)" : "rgba(30, 99, 255, 0.11)";
  return (
    <span
      aria-hidden
      className="card-spot pointer-events-none absolute inset-0"
      style={{
        opacity: spot.on ? 1 : 0,
        background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, ${color}, transparent 58%)`,
      }}
    />
  );
}

export function CardSurface({
  children,
  className,
  as: Tag = "div",
  tone = "light",
  padded = true,
  type,
  onClick,
  onFocus,
}: {
  children: ReactNode;
  className?: string;
  as?: "article" | "div" | "button";
  tone?: "light" | "night";
  padded?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  onFocus?: ButtonHTMLAttributes<HTMLButtonElement>["onFocus"];
}) {
  const { spot, onPointerMove, onPointerEnter, onPointerLeave } = useCardSpot();
  const classNames = cx(
    "dynamic-card group relative overflow-hidden",
    padded && "p-6",
    tone === "light" && "border border-sf-line bg-white",
    tone === "night" && "border border-sf-night-line bg-sf-night-surface night-card",
    className,
  );
  const body = (
    <>
      <Spotlight spot={spot} tone={tone} />
      <div className="relative z-[1] h-full">{children}</div>
    </>
  );

  if (Tag === "button") {
    return (
      <button
        type={type ?? "button"}
        className={classNames}
        onClick={onClick}
        onFocus={onFocus}
        onPointerEnter={onPointerEnter}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {body}
      </button>
    );
  }

  return (
    <Tag
      className={classNames}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {body}
    </Tag>
  );
}

export function DynamicCard({
  children,
  className,
  delay = 0,
  as: Tag = "article",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "article" | "div";
  tone?: "light" | "night";
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      layout={false}
      className={cx("h-full", className)}
      initial={reduced ? false : { y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "80px 0px" }}
      transition={{ duration: 0.45, delay, ease: easeOutExpo }}
    >
      <CardSurface as={Tag} tone={tone} className="h-full rounded-[16px]">
        {children}
      </CardSurface>
    </motion.div>
  );
}
