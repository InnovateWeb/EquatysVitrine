"use client";

import { useRef } from "react";
import { useScrollProgressLine } from "@/lib/animations/useScrollProgressLine";
import { useScrollReveal } from "@/lib/animations/useScrollReveal";

const steps = [
  { num: "01", label: "Vous appelez", desc: "Ligne directe 24h/24, 7j/7. Un technicien décroche et évalue votre situation immédiatement." },
  { num: "02", label: "On diagnostique", desc: "Quelques questions ciblées pour cerner la panne avant l'intervention et préparer le bon matériel." },
  { num: "03", label: "On intervient", desc: "Technicien sur place sous 1 à 2 heures selon disponibilité. Intervention garantie sur l'Arc lémanique." },
  { num: "04", label: "Problème résolu", desc: "Réparation sur place dans la majorité des cas. Rapport d'intervention transmis dans les 24h." },
];

function StepItem({ num, label, desc, index }: { num: string; label: string; desc: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>, { x: 24, y: 0, duration: 0.5, delay: 0.05 * index });
  return (
    <div ref={ref} className="relative flex gap-6 pb-14 last:pb-0">
      <div className="relative z-10 flex shrink-0 flex-col items-center" style={{ width: "2px" }}>
        <div className="absolute -left-[7px] top-[4px] size-4 rounded-full border-2 border-accent bg-[#0a0a0a]" />
      </div>
      <div className="flex-1 pl-8">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] text-accent uppercase mb-3">{num}</p>
        <p className="text-[1.15rem] font-medium text-white mb-3 leading-snug">{label}</p>
        <p className="text-body text-white/55 leading-relaxed max-w-[52ch]">{desc}</p>
      </div>
    </div>
  );
}

export function LocalTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useScrollProgressLine(
    containerRef as React.RefObject<HTMLElement>,
    lineRef as React.RefObject<HTMLElement>,
    { start: "top 70%", end: "bottom 80%" },
  );

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/[0.08]" />
      <div
        ref={lineRef}
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent origin-top"
        style={{ transform: "scaleY(0)" }}
      />
      {steps.map((step, i) => (
        <StepItem key={step.num} {...step} index={i} />
      ))}
    </div>
  );
}
