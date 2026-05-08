"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ResourceCard } from "./ResourceCard";
import { searchResources, cn } from "@/lib/utils";
import { RESOURCES } from "@/data/resources";
import type { ResourceType, DifficultyLevel } from "@/types";
import { SlidersHorizontal, X } from "lucide-react";

const TYPE_FILTERS: { value: ResourceType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "course", label: "Courses" },
  { value: "video", label: "Videos" },
  { value: "sheet", label: "Sheets" },
  { value: "repo", label: "Repos" },
  { value: "pdf", label: "PDFs" },
  { value: "article", label: "Articles" },
  { value: "practice", label: "Practice" },
];

const DIFF_FILTERS: { value: DifficultyLevel | "all"; label: string }[] = [
  { value: "all", label: "All levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export function ResourceGrid() {
  const searchParams = useSearchParams();
  const cat = (searchParams.get("cat") ?? "all") as any;
  const query = searchParams.get("q") ?? "";

  const [typeFilter, setTypeFilter] = useState<ResourceType | "all">("all");
  const [diffFilter, setDiffFilter] = useState<DifficultyLevel | "all">("all");

  const results = useMemo(
    () => searchResources({ query, category: cat, type: typeFilter, difficulty: diffFilter }),
    [query, cat, typeFilter, diffFilter]
  );

  const featuredIds = useMemo(
    () => new Set(RESOURCES.filter((r) => r.featured).map((r) => r.id)),
    []
  );

  const hasFilters = typeFilter !== "all" || diffFilter !== "all";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink/40">
          <SlidersHorizontal size={12} />
          Filter
        </span>

        <div className="flex flex-wrap gap-1.5">
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setTypeFilter(f.value)}
              className={cn(
                "rounded-full border px-3 py-1 font-mono text-[11px] transition-all",
                typeFilter === f.value
                  ? "border-teal-500/40 bg-teal-500/10 text-teal-400"
                  : "border-border bg-bg-surface text-ink/40 hover:border-border-hover hover:text-ink/70"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 border-l border-border pl-2 ml-2">
          {DIFF_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setDiffFilter(f.value)}
              className={cn(
                "rounded-full border px-3 py-1 font-mono text-[11px] transition-all",
                diffFilter === f.value
                  ? "border-violet-500/40 bg-violet-500/10 text-violet-400"
                  : "border-border bg-bg-surface text-ink/40 hover:border-border-hover hover:text-ink/70"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {hasFilters && (
          <button
            onClick={() => { setTypeFilter("all"); setDiffFilter("all"); }}
            className="flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[11px] text-ink/40 hover:text-ink/70 transition-colors"
          >
            <X size={11} /> Clear
          </button>
        )}

        <span className="ml-auto font-mono text-[11px] text-ink/30">
          {results.length} resource{results.length !== 1 ? "s" : ""}
        </span>
      </div>

      {results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <div className="text-4xl">🔍</div>
          <p className="text-sm text-ink/50">No resources found. Try a different search or filter.</p>
          <button
            onClick={() => { setTypeFilter("all"); setDiffFilter("all"); }}
            className="text-sm text-accent hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            featured={featuredIds.has(resource.id)}
          />
        ))}
      </div>
    </div>
  );
}