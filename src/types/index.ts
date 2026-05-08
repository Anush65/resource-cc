export type ResourceType =
  | "course"
  | "video"
  | "sheet"
  | "repo"
  | "pdf"
  | "article"
  | "cheatsheet"
  | "roadmap-link"
  | "practice";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced" | "all";

export type CategorySlug =
  | "dsa"
  | "web-dev"
  | "app-dev"
  | "ml-ai"
  | "cybersecurity"
  | "cloud"
  | "devops"
  | "competitive-programming"
  | "dbms"
  | "os"
  | "computer-networks"
  | "oop"
  | "system-design"
  | "aptitude"
  | "placement"
  | "resume"
  | "git-github"
  | "linux"
  | "open-source";

export interface Resource {
  id: string;
  name: string;
  description: string;
  type: ResourceType;
  category: CategorySlug;
  tags: string[];
  url: string;
  difficulty: DifficultyLevel;
  free: boolean;
  estimatedTime: string;
  author?: string;
  featured?: boolean;
  addedAt: string;
}

export interface Category {
  slug: CategorySlug;
  label: string;
  icon: string;
  description: string;
  color: "purple" | "teal" | "coral" | "green" | "amber" | "pink" | "blue";
  group: "subjects" | "development" | "specialized" | "career";
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  resources: string[];
  estimatedTime: string;
  difficulty: DifficultyLevel;
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  emoji: string;
  slug: string;
  totalTime: string;
  difficulty: DifficultyLevel;
  steps: RoadmapStep[];
  tags: string[];
}

export interface SearchFilters {
  query: string;
  category: CategorySlug | "all";
  type: ResourceType | "all";
  difficulty: DifficultyLevel | "all";
}