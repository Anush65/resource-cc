import { ExternalLink, Clock, Signal } from "lucide-react";
import { cn, TYPE_CONFIG, DIFFICULTY_CONFIG } from "@/lib/utils";
import type { Resource } from "@/types";

interface ResourceCardProps {
  resource: Resource;
  featured?: boolean;
}

export function ResourceCard({ resource, featured }: ResourceCardProps) {
  const typeConf = TYPE_CONFIG[resource.type];
  const diffConf = DIFFICULTY_CONFIG[resource.difficulty];

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex flex-col gap-3 rounded-xl border bg-bg-surface p-4 card-hover transition-all duration-200",
        featured
          ? "border-accent/25 bg-accent/5 hover:border-accent/40"
          : "border-border hover:border-border-hover"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide",
            typeConf.color, typeConf.bg, typeConf.border
          )}
        >
          {typeConf.label}
        </span>
        <div className="flex items-center gap-1.5">
          {featured && (
            <span className="rounded-full border border-accent/25 bg-accent/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-accent">
              Featured
            </span>
          )}
          {resource.free && (
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-emerald-400">
              Free
            </span>
          )}
        </div>
      </div>

      <h3 className="line-clamp-2 text-[14px] font-medium leading-snug text-ink transition-colors group-hover:text-white">
        {resource.name}
      </h3>

      <p className="flex-1 line-clamp-3 text-[12px] leading-relaxed text-ink/50">
        {resource.description}
      </p>

      <div className="flex items-center gap-3 text-[11px]">
        <span className="flex items-center gap-1 font-mono text-ink/35">
          <Clock size={11} />
          {resource.estimatedTime}
        </span>
        <span className={cn("flex items-center gap-1 font-mono", diffConf.color)}>
          <Signal size={11} />
          {diffConf.label}
        </span>
      </div>

      {resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {resource.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-bg-surface2 px-1.5 py-0.5 font-mono text-[10px] text-ink/35"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center gap-1 border-t border-border pt-2 font-mono text-[11px] text-accent/70 transition-colors group-hover:text-accent">
        <ExternalLink size={11} />
        <span>Open resource</span>
        {resource.author && (
          <span className="ml-auto font-sans text-[11px] font-normal text-ink/25">
            {resource.author}
          </span>
        )}
      </div>
    </a>
  );
}