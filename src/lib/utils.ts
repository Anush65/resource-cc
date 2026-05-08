import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Fuse from "fuse.js";
import type { Resource, ResourceType, SearchFilters } from "@/types";
import { RESOURCES } from "@/data/resources";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const fuse = new Fuse(RESOURCES, {
  keys: [
    { name: "name", weight: 0.4 },
    { name: "description", weight: 0.25 },
    { name: "tags", weight: 0.2 },
    { name: "author", weight: 0.1 },
    { name: "category", weight: 0.05 },
  ],
  threshold: 0.35,
  includeScore: true,
  minMatchCharLength: 2,
});

export function searchResources(filters: SearchFilters): Resource[] {
  let results: Resource[] = filters.query
    ? fuse.search(filters.query).map((r) => r.item)
    : [...RESOURCES];

  if (filters.category !== "all") {
    results = results.filter((r) => r.category === filters.category);
  }
  if (filters.type !== "all") {
    results = results.filter((r) => r.type === filters.type);
  }
  if (filters.difficulty !== "all") {
    results = results.filter(
      (r) => r.difficulty === filters.difficulty || r.difficulty === "all"
    );
  }
  return results;
}

export const TYPE_CONFIG: Record<
  ResourceType,
  { label: string; color: string; bg: string; border: string }
> = {
  course: {
    label: "Course",
    color: "text-violet-300",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  video: {
    label: "Video",
    color: "text-orange-300",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  sheet: {
    label: "Sheet",
    color: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  repo: {
    label: "Repo",
    color: "text-slate-300",
    bg: "bg-slate-500/10",
    border: "border-slate-500/20",
  },
  pdf: {
    label: "PDF",
    color: "text-rose-300",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  article: {
    label: "Article",
    color: "text-teal-300",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
  },
  cheatsheet: {
    label: "Cheatsheet",
    color: "text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  "roadmap-link": {
    label: "Roadmap",
    color: "text-sky-300",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
  practice: {
    label: "Practice",
    color: "text-pink-300",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
  },
};

export const DIFFICULTY_CONFIG = {
  beginner: { label: "Beginner", color: "text-emerald-400" },
  intermediate: { label: "Intermediate", color: "text-amber-400" },
  advanced: { label: "Advanced", color: "text-rose-400" },
  all: { label: "All levels", color: "text-slate-400" },
};

export const COLOR_CONFIG = {
  purple: {
    text: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    dot: "bg-violet-400",
  },
  teal: {
    text: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    dot: "bg-teal-400",
  },
  coral: {
    text: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    dot: "bg-orange-400",
  },
  green: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
  },
  pink: {
    text: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    dot: "bg-pink-400",
  },
  blue: {
    text: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    dot: "bg-sky-400",
  },
};

export function getCountByCategory(slug: string): number {
  return RESOURCES.filter((r) => r.category === slug).length;
}