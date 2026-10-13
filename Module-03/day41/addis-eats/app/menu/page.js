import { Suspense } from "react";
import FilterShell from "./FilterShell";
import DishList from "./DishList";
import { getDishes } from "@/lib/menu";

export const revalidate = 3600;

function DishSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-64 animate-pulse rounded-lg bg-gray-200"
        />
      ))}
    </div>
  );
}

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <Suspense fallback={<DishSkeleton />}>
      <FilterShell>
        <DishList dishes={dishes} />
      </FilterShell>
    </Suspense>
  );
}
