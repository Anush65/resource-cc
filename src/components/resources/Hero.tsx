"use client";

import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { useState } from "react";

const QUICK_TAGS = [
  "DSA sheet", "React roadmap", "System Design",
  "ML course", "Placement prep", "Linux", "Git",
];

export function Hero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function submit(q?: string) {
    const term = (q ?? query).trim();
    if (!term) return;
    router.push(`/?q=${encodeURIComponent(term)}`);
  }

  return (
    <section className="relative grid-bg overflow-hidden border-b border-border py-16 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[80px]"
      />

      <div className="relative mx-auto max-w-2xl px-4">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[3px] text-accent/80">
          CodeChef Chapter · Resource Hub
        </p>

        <h1 className="mb-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          Find the right resource,
          <br />
          <span className="gradient-text">not the right WhatsApp chat.</span>
        </h1>

        <p className="mb-8 text-sm font-light leading-relaxed text-ink/50 sm:text-[15px]">
          Curated courses, DSA sheets, repos, and roadmaps —{" "}
          <br className="hidden sm:block" />
          organized so you spend time learning, not searching.
        </p>

        <div className="mx-auto mb-4 flex max-w-lg items-center gap-2 rounded-xl border border-border-hover bg-bg-surface2 px-4 py-3 transition-all focus-within:border-accent/50 focus-within:shadow-[0_0_0_3px_rgba(124,106,247,0.1)]">
          <Search size={16} className="flex-shrink-0 text-ink/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Search DSA, React, System Design, ML..."
            className="flex-1 bg-transparent text-sm text-ink placeholder-ink/30 outline-none"
          />
          {query && (
            <button
              onClick={() => submit()}
              className="flex items-center gap-1 rounded-md bg-accent px-3 py-1 font-mono text-[11px] text-white transition-opacity hover:opacity-85"
            >
              Go <ArrowRight size={11} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {QUICK_TAGS.map((t) => (
            <button
              key={t}
              onClick={() => submit(t)}
              className="rounded-full border border-border bg-bg-surface px-3 py-1 font-mono text-[11px] text-ink/50 transition-all hover:border-accent/40 hover:bg-accent/8 hover:text-accent"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}