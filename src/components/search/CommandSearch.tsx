"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, ExternalLink, ArrowRight } from "lucide-react";
import Fuse from "fuse.js";
import { RESOURCES } from "@/data/resources";
import { cn, TYPE_CONFIG } from "@/lib/utils";
import type { Resource } from "@/types";
import * as Dialog from "@radix-ui/react-dialog";

const fuse = new Fuse(RESOURCES, {
  keys: [
    { name: "name", weight: 0.5 },
    { name: "tags", weight: 0.3 },
    { name: "description", weight: 0.15 },
    { name: "category", weight: 0.05 },
  ],
  threshold: 0.3,
  includeScore: true,
});

const QUICK_SEARCHES = [
  "DSA sheet", "React roadmap", "System design",
  "ML course", "Placement prep", "Linux basics",
];

export function CommandSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Resource[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults([]);
      setSelected(0);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    setResults(fuse.search(query).map((r) => r.item).slice(0, 8));
    setSelected(0);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => (s + 1) % Math.max(results.length, 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => (s - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1)); }
      else if (e.key === "Enter") {
        if (results[selected]) { window.open(results[selected].url, "_blank"); setOpen(false); }
        else if (query) { router.push(`/?q=${encodeURIComponent(query)}`); setOpen(false); }
      } else if (e.key === "Escape") { setOpen(false); }
    },
    [results, selected, query, router]
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-bg-surface px-3 py-1.5 text-sm text-ink/40 transition-colors hover:border-border-hover hover:text-ink/60">
          <Search size={14} />
          <span className="hidden text-[13px] sm:inline">Search...</span>
          <kbd className="hidden items-center rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px] text-ink/30 sm:flex">
            ⌘K
          </kbd>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content className="fixed left-1/2 top-[15%] z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-border-hover bg-bg-surface shadow-2xl data-[state=open]:animate-slide-up focus:outline-none">
          <Dialog.Title className="sr-only">Search resources</Dialog.Title>

          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search size={16} className="flex-shrink-0 text-ink/40" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search resources, topics, tools..."
              className="flex-1 bg-transparent font-sans text-sm text-ink placeholder-ink/30 outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} className="font-mono text-[10px] text-ink/30 hover:text-ink/60">
                Clear
              </button>
            )}
            <kbd className="hidden rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px] text-ink/25 sm:block">
              ESC
            </kbd>
          </div>

          <div className="max-h-80 overflow-y-auto py-2">
            {!query && (
              <div className="px-3 py-2">
                <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-widest text-ink/25">
                  Quick searches
                </p>
                <div className="flex flex-wrap gap-1.5 px-2">
                  {QUICK_SEARCHES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="rounded-full border border-border bg-bg-surface2 px-3 py-1 font-mono text-[11px] text-ink/50 transition-colors hover:border-border-hover hover:text-ink/80"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {results.length > 0 && (
              <div className="py-1">
                {results.map((r, i) => {
                  const conf = TYPE_CONFIG[r.type];
                  return (
                    <a
                      key={r.id}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => setSelected(i)}
                      className={cn(
                        "flex items-start gap-3 px-4 py-2.5 transition-colors",
                        i === selected ? "bg-accent/8 text-ink" : "text-ink/70 hover:bg-bg-surface2"
                      )}
                    >
                      <span className={cn("mt-0.5 flex-shrink-0 rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase", conf.color, conf.bg, conf.border)}>
                        {conf.label}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium">{r.name}</p>
                        <p className="mt-0.5 line-clamp-1 text-[11px] text-ink/40">{r.description}</p>
                      </div>
                      <ExternalLink size={13} className={cn("mt-0.5 flex-shrink-0 transition-opacity", i === selected ? "opacity-60" : "opacity-0")} />
                    </a>
                  );
                })}
              </div>
            )}

            {query && results.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-ink/30">
                No resources found for &ldquo;{query}&rdquo;
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-border px-4 py-2">
            <div className="flex items-center gap-3 font-mono text-[10px] text-ink/25">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border px-1 py-0.5">↑↓</kbd> navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border px-1 py-0.5">↵</kbd> open
              </span>
            </div>
            {query && (
              <button
                onClick={() => { router.push(`/?q=${encodeURIComponent(query)}`); setOpen(false); }}
                className="flex items-center gap-1 font-mono text-[11px] text-accent transition-colors hover:text-accent/80"
              >
                See all results <ArrowRight size={11} />
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}