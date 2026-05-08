import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getFeaturedResources } from "@/data/resources";
import { cn, TYPE_CONFIG } from "@/lib/utils";

export function FeaturedBanner() {
  const featured = getFeaturedResources().slice(0, 4);

  return (
    <div className="mb-6 rounded-xl border border-accent/20 bg-accent/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-accent" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
            Start here
          </span>
        </div>
        <Link
          href="/roadmaps"
          className="flex items-center gap-1 font-mono text-[11px] text-ink/40 transition-colors hover:text-accent"
        >
          View roadmaps <ArrowRight size={11} />
        </Link>
      </div>

      <p className="mb-3 text-sm font-medium text-ink/80">
        Most recommended resources
      </p>

      <div className="flex flex-col gap-2">
        {featured.map((r) => {
          const conf = TYPE_CONFIG[r.type];
          return (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-border bg-bg-surface px-3 py-2.5 transition-colors hover:border-border-hover hover:bg-bg-surface2"
            >
              <span className={cn("rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase", conf.color, conf.bg, conf.border)}>
                {conf.label}
              </span>
              <span className="flex-1 truncate text-[13px] font-medium text-ink/80">
                {r.name}
              </span>
              {r.author && (
                <span className="text-[11px] text-ink/30">{r.author}</span>
              )}
              <ArrowRight size={12} className="flex-shrink-0 text-ink/20" />
            </a>
          );
        })}
      </div>
    </div>
  );
}