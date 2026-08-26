"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ShipfrontMark } from "@/components/shipfront/mark";
import { easeOutExpo } from "@/lib/motion";
import { cx } from "@/lib/utils";

const links = [
  { href: "#crate", label: "Platform" },
  { href: "#why", label: "Why Shipfront" },
  { href: "#operations", label: "Operations" },
  { href: "#integrations", label: "Developers" },
  { href: "#industries", label: "Resources" },
];

export function Navbar() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <motion.nav
        layout
        className={cx(
          "mx-auto flex max-w-[1520px] items-center justify-between gap-4 px-4 py-3 transition-colors duration-200 md:px-6",
          compact
            ? "rounded-[12px] border border-sf-line bg-sf-paper/90 shadow-[0_12px_40px_rgba(16,17,17,0.08)] backdrop-blur-md"
            : "rounded-none border-transparent bg-transparent",
        )}
        aria-label="Primary"
      >
        <a href="#top" className="flex min-h-11 items-center gap-2 text-sf-ink">
          <ShipfrontMark className="h-7 w-7" />
          <span className="text-[13px] font-bold tracking-[0.18em]">SHIPFRONT</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a className="text-[14px] text-sf-ink/80 transition-colors hover:text-sf-ink" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <a className="text-[14px] text-sf-muted hover:text-sf-ink" href="#access">
            Sign in
          </a>
          <a
            className="inline-flex min-h-11 items-center bg-sf-ink px-4 text-[14px] font-medium text-sf-paper transition-colors hover:bg-sf-blue"
            href="#access"
          >
            Request access
          </a>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
          <span className="sr-only">Menu</span>
        </button>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: easeOutExpo }}
            className="fixed inset-0 z-40 bg-sf-canvas px-6 pt-24"
          >
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    className="block py-3 text-4xl font-semibold tracking-tight"
                    href={link.href}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              className="mt-10 flex min-h-14 items-center justify-center bg-sf-ink text-sf-paper"
              href="#access"
              onClick={() => setOpen(false)}
            >
              Request access
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
