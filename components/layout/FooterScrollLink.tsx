"use client";

import { usePathname } from "next/navigation";
import { getLenisInstance } from "@/lib/animations/lenisStore";

const linkClass =
  "text-body-s text-muted transition-colors hover:text-ink focus-visible:text-ink focus-visible:outline-none cursor-pointer";

interface FooterScrollLinkProps {
  targetId: string;
  label: string;
}

export function FooterScrollLink({ targetId, label }: FooterScrollLinkProps) {
  const pathname = usePathname();

  if (pathname !== "/") {
    return (
      <a href={`/#${targetId}`} className={linkClass}>
        {label}
      </a>
    );
  }

  const handleClick = () => {
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(`#${targetId}`, { duration: 1.2 });
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button type="button" onClick={handleClick} className={linkClass}>
      {label}
    </button>
  );
}
