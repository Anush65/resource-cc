import Link from "next/link";
import { ArrowRight, Clock, Signal } from "lucide-react";
import { ROADMAPS } from "@/data/roadmaps";
import { DIFFICULTY_CONFIG, cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmaps — CS Hub",
  description: "Structured learning paths for CS students.",
};

export default function RoadmapsPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6">
      <div className="mb-10 text-center">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[3px] text-accent/70">
          Structured Paths
        </p>
        <h1 className="mb-3 text-3xl font-semibold tracking-tight">
          Learning Roadmaps
        </h1>
        <p className="mx-auto max-w-md text-sm font-light text-ink/50">
          Pick a roadmap and follow a step-by-step path from zero to job-ready.
          No guesswork, no scattered WhatsApp links.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ROADMAPS.map((roadmap) => {
          const diffConf = DIFFICULTY_CONFIG[roadmap.difficulty as keyof typeof DIFFICULTY_CONFIG];
          return (
            <Link
              key={roadmap.id}
              href={`/roadmaps/${roadmap.slug}`}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-bg-surface p-5 card-hover transition-all duration-200 hover:border-border-hover"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{roadmap.emoji}</span>
                <div>
                  <h2 className="text-[15px] font-semibold text-ink group-hover:text-white transition-colors">
                    {roadmap.title}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink/45">
                    {roadmap.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 font-mono text-[11px]">
                <span className="flex items-center gap-1 text-ink/35">
                  <Clock size={11} />
                  {roadmap.totalTime}
                </span>
                <span className={cn("flex items-center gap-1", diffConf.color)}>
                  <Signal size={11} />
                  {diffConf.label}
                </span>
                <span className="text-ink/30">{roadmap.steps.length} steps</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {roadmap.steps.slice(0, 4).map((step: typeof roadmap.steps[0]) => (
                  <span
                    key={step.id}
                    className="rounded-md border border-border bg-bg-surface2 px-2 py-0.5 font-mono text-[10px] text-ink/40"
                  >
                    {step.title}
                  </span>
                ))}
                {roadmap.steps.length > 4 && (
                  <span className="px-1 font-mono text-[10px] text-ink/25">
                    +{roadmap.steps.length - 4} more
                  </span>
                )}
              </div>

              <div className="mt-auto flex items-center gap-1 border-t border-border pt-2 font-mono text-[11px] text-accent/60 transition-colors group-hover:text-accent">
                View roadmap
                <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}