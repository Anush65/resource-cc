import { RESOURCES } from "@/data/resources";
import { ROADMAPS } from "@/data/roadmaps";
import { CATEGORIES } from "@/data/categories";

export function StatsBar() {
  const stats = [
    { value: `${RESOURCES.length}+`, label: "Resources" },
    { value: String(CATEGORIES.length), label: "Categories" },
    { value: String(ROADMAPS.length), label: "Roadmaps" },
    { value: "100%", label: "Free" },
  ];

  return (
    <div className="border-b border-border bg-bg-surface">
      <div className="mx-auto flex max-w-screen-xl items-center justify-center gap-8 px-4 py-3 sm:gap-16 sm:px-6">
        {stats.map((s) => (
          <div key={s.label} className="flex items-baseline gap-1.5">
            <span className="font-mono text-base font-medium text-ink">{s.value}</span>
            <span className="text-xs text-ink/35">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}