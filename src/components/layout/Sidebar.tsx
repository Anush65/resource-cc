"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  BrainCircuit, Globe, Database, Cpu, Wifi, Boxes,
  Smartphone, RefreshCw, Cloud, GitBranch, Terminal,
  Shield, Trophy, Briefcase, FileText, Calculator,
  GitPullRequest, Map, LayoutGrid,
} from "lucide-react";
import { cn, getCountByCategory, COLOR_CONFIG } from "@/lib/utils";
import { CATEGORIES, CATEGORY_GROUPS } from "@/data/categories";
import type { Category } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  BrainCircuit, Globe, Database, Cpu, Wifi, Boxes,
  Smartphone, RefreshCw, Cloud, GitBranch, Terminal,
  Shield, Trophy, Briefcase, FileText, Calculator,
  GitPullRequest,
};

function CategoryItem({ cat }: { cat: Category }) {
  const searchParams = useSearchParams();
  const currentCat = searchParams.get("cat") ?? "all";
  const isActive = currentCat === cat.slug;
  const Icon = ICON_MAP[cat.icon] ?? LayoutGrid;
  const colors = COLOR_CONFIG[cat.color];
  const count = getCountByCategory(cat.slug);

  return (
    <Link
      href={`/?cat=${cat.slug}`}
      className={cn(
        "group flex items-center gap-2.5 px-3 py-2 text-sm transition-all",
        isActive
          ? "sidebar-active text-ink"
          : "text-ink/50 hover:bg-bg-surface2 hover:text-ink/80"
      )}
    >
      <Icon
        size={14}
        className={cn(
          "flex-shrink-0 transition-colors",
          isActive ? colors.text : "text-ink/30 group-hover:text-ink/50"
        )}
      />
      <span className="flex-1 truncate text-[13px] font-medium">{cat.label}</span>
      <span className={cn("font-mono text-[10px] tabular-nums transition-colors", isActive ? colors.text : "text-ink/30")}>
        {count}
      </span>
    </Link>
  );
}

export function Sidebar() {
  const searchParams = useSearchParams();
  const currentCat = searchParams.get("cat") ?? "all";
  const isAll = !currentCat || currentCat === "all";

  const groups = (Object.entries(CATEGORY_GROUPS) as [keyof typeof CATEGORY_GROUPS, string][]).map(
    ([key, label]) => ({
      key,
      label,
      cats: CATEGORIES.filter((c) => c.group === key),
    })
  );

  return (
    <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-52 flex-shrink-0 overflow-y-auto border-r border-border py-4">
      <div className="mb-3 px-3">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-all",
            isAll
              ? "bg-accent/10 font-medium text-accent"
              : "text-ink/50 hover:bg-bg-surface2 hover:text-ink/80"
          )}
        >
          <LayoutGrid size={14} />
          <span className="text-[13px]">All Resources</span>
          <span className="ml-auto font-mono text-[10px] text-ink/40">52</span>
        </Link>
      </div>

      {groups.map(({ key, label, cats }) => (
        <div key={key} className="mb-4">
          <p className="mb-1 px-4 font-mono text-[10px] uppercase tracking-widest text-ink/25">
            {label}
          </p>
          <div className="flex flex-col">
            {cats.map((cat) => (
              <CategoryItem key={cat.slug} cat={cat} />
            ))}
          </div>
        </div>
      ))}

      <div className="mt-2 border-t border-border px-3 pt-4">
        <Link
          href="/roadmaps"
          className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-ink/50 transition-all hover:bg-bg-surface2 hover:text-ink/80"
        >
          <Map size={14} />
          <span className="text-[13px]">View Roadmaps</span>
          <span className="ml-auto font-mono text-[10px] text-ink/30">9</span>
        </Link>
      </div>
    </aside>
  );
}