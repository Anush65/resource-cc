import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Signal, ExternalLink, ChevronRight } from "lucide-react";
import { ROADMAPS, getRoadmapBySlug } from "@/data/roadmaps";
import { getResourcesByIds } from "@/data/resources";
import { TYPE_CONFIG, DIFFICULTY_CONFIG, cn } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return ROADMAPS.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const roadmap = getRoadmapBySlug(params.slug);
  if (!roadmap) return {};
  return {
    title: `${roadmap.title} Roadmap — CS Hub`,
    description: roadmap.description,
  };
}

export default function RoadmapPage({ params }: Props) {
  const roadmap = getRoadmapBySlug(params.slug);
  if (!roadmap) notFound();

  const diffConf = DIFFICULTY_CONFIG[roadmap.difficulty as keyof typeof DIFFICULTY_CONFIG];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/roadmaps"
        className="mb-8 flex items-center gap-1.5 font-mono text-xs text-ink/40 hover:text-ink/70 transition-colors"
      >
        <ArrowLeft size={13} />
        All roadmaps
      </Link>

      <div className="mb-10">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-4xl">{roadmap.emoji}</span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{roadmap.title}</h1>
            <div className="mt-1 flex items-center gap-4 font-mono text-[11px]">
              <span className="flex items-center gap-1 text-ink/40">
                <Clock size={11} />
                {roadmap.totalTime}
              </span>
              <span className={cn("flex items-center gap-1", diffConf.color)}>
                <Signal size={11} />
                {diffConf.label}
              </span>
              <span className="text-ink/30">{roadmap.steps.length} steps</span>
            </div>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-ink/50">{roadmap.description}</p>
      </div>

      <div className="relative">
        <div className="absolute bottom-8 left-4 top-8 w-px bg-border" />

        <div className="flex flex-col gap-6">
          {roadmap.steps.map((step: typeof roadmap.steps[0], idx: number) => {
            const stepResources = getResourcesByIds(step.resources);
            const stepDiff = DIFFICULTY_CONFIG[step.difficulty as keyof typeof DIFFICULTY_CONFIG];

            return (
              <div key={step.id} className="relative flex gap-5">
                <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-accent/30 bg-bg-surface font-mono text-[11px] font-medium text-accent">
                  {idx + 1}
                </div>

                <div className="flex-1 pb-2">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-[15px] font-semibold text-ink">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink/45">
                        {step.description}
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2 font-mono text-[10px]">
                      <span className="flex items-center gap-1 text-ink/30">
                        <Clock size={10} />
                        {step.estimatedTime}
                      </span>
                      <span className={cn("flex items-center gap-1", stepDiff.color)}>
                        <Signal size={10} />
                        {stepDiff.label}
                      </span>
                    </div>
                  </div>

                  {stepResources.length > 0 && (
                    <div className="mt-3 flex flex-col gap-2">
                      {stepResources.map((r) => {
                        const conf = TYPE_CONFIG[r.type];
                        return (
                          <a
                            key={r.id}
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 rounded-lg border border-border bg-bg-surface px-3 py-2.5 transition-all hover:border-border-hover hover:bg-bg-surface2"
                          >
                            <span className={cn("flex-shrink-0 rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase", conf.color, conf.bg, conf.border)}>
                              {conf.label}
                            </span>
                            <span className="flex-1 truncate text-[13px] text-ink/75 transition-colors group-hover:text-ink">
                              {r.name}
                            </span>
                            {r.free && (
                              <span className="flex-shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] text-emerald-400">
                                Free
                              </span>
                            )}
                            <ExternalLink size={12} className="flex-shrink-0 text-ink/20 transition-colors group-hover:text-ink/50" />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 rounded-xl border border-accent/20 bg-accent/5 p-5 text-center">
        <p className="mb-1 text-sm font-medium text-ink/80">Ready to start?</p>
        <p className="mb-4 text-xs text-ink/40">
          Work through each step in order. Consistency beats intensity.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 font-mono text-xs text-white transition-opacity hover:opacity-85"
        >
          Browse all resources
          <ChevronRight size={13} />
        </Link>
      </div>
    </div>
  );
}