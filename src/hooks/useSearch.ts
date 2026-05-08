"use client";

import { useMemo } from "react";
import { searchResources } from "@/lib/utils";

import type {
  CategorySlug,
  DifficultyLevel,
  ResourceType,
} from "@/types";

interface SearchOptions {
  query: string;
  category?: CategorySlug | "all";
  type?: ResourceType | "all";
  difficulty?: DifficultyLevel | "all";
}

export function useSearch({
  query,
  category = "all",
  type = "all",
  difficulty = "all",
}: SearchOptions) {
  return useMemo(() => {
    return searchResources({
      query,
      category,
      type,
      difficulty,
    });
  }, [query, category, type, difficulty]);
}