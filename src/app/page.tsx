import { Suspense } from "react";
import { Hero } from "@/components/resources/Hero";
import { StatsBar } from "@/components/resources/StatsBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { CategoryHeader } from "@/components/resources/CategoryHeader";
import { FeaturedBanner } from "@/components/resources/FeaturedBanner";

interface HomePageProps {
  searchParams: { cat?: string; q?: string };
}

export default function HomePage({ searchParams }: HomePageProps) {
  const cat = searchParams.cat ?? "all";
  const query = searchParams.q ?? "";
  const isFiltered = cat !== "all" || query !== "";

  return (
    <>
      {!isFiltered && <Hero />}
      <StatsBar />

      <div className="mx-auto flex max-w-screen-xl">
        <Suspense fallback={null}>
          <Sidebar />
        </Suspense>

        <div className="min-w-0 flex-1 px-5 py-6">
          <Suspense fallback={null}>
            <CategoryHeader slug={cat} query={query} />
          </Suspense>

          {!isFiltered && <FeaturedBanner />}

          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-52 rounded-xl border border-border shimmer" />
                ))}
              </div>
            }
          >
            <ResourceGrid />
          </Suspense>
        </div>
      </div>
    </>
  );
}