"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandSearch } from "@/components/search/CommandSearch";

const NAV_LINKS = [
  { href: "/", label: "Resources", icon: BookOpen },
  { href: "/roadmaps", label: "Roadmaps", icon: Map },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-medium text-ink hover:opacity-80 transition-opacity"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/20 ring-1 ring-accent/30">
            <span className="text-[10px] font-bold text-accent">cs</span>
          </span>
          <span className="text-ink/90">hub</span>
          <span className="hidden text-ink/30 sm:inline">/</span>
          <span className="hidden font-mono text-xs font-normal text-ink/40 sm:inline">
            CodeChef Chapter
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                pathname === href
                  ? "bg-accent/10 text-accent"
                  : "text-ink/60 hover:bg-bg-surface2 hover:text-ink"
              )}
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CommandSearch />
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] text-emerald-400 sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            52+ resources
          </span>
        </div>
      </div>
    </header>
  );
}