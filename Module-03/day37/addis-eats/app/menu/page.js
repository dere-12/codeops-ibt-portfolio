import { Suspense } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

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

export default function MenuPage() {
  return (
    <>
      <CategoryBar />

      <Suspense fallback={<DishSkeleton />}>
        <DishList />
      </Suspense>
    </>
  );
}
