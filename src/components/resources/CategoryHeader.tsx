import { getCategoryBySlug } from "@/data/categories";
import { getResourcesByCategory } from "@/data/resources";
import { cn, COLOR_CONFIG } from "@/lib/utils";

interface CategoryHeaderProps {
  slug: string;
  query?: string;
}

export function CategoryHeader({ slug, query }: CategoryHeaderProps) {
  if (query) {
    return (
      <div className="mb-5">
        <p className="font-mono text-xs text-ink/40">
          Search results for{" "}
          <span className="font-medium text-ink/70">&ldquo;{query}&rdquo;</span>
        </p>
      </div>
    );
  }

  if (!slug || slug === "all") {
    return (
      <div className="mb-5">
        <h2 className="text-base font-semibold text-ink">All Resources</h2>
        <p className="mt-0.5 text-xs text-ink/40">
          Browse all curated resources across every category
        </p>
      </div>
    );
  }

  const cat = getCategoryBySlug(slug);
  if (!cat) return null;

  const count = getResourcesByCategory(slug).length;
  const colors = COLOR_CONFIG[cat.color];

  return (
    <div className="mb-5 flex items-start gap-3 rounded-xl border border-border bg-bg-surface p-4">
      <div className={cn("flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border text-sm", colors.bg, colors.border)}>
        <span className={cn("font-mono text-xs font-bold", colors.text)}>
          {cat.label.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-semibold text-ink">{cat.label}</h2>
          <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[10px]", colors.text, colors.bg, colors.border)}>
            {count} resources
          </span>
        </div>
        <p className="mt-0.5 text-xs leading-relaxed text-ink/45">{cat.description}</p>
      </div>
    </div>
  );
}