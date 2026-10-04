import Link from "next/link";
import { getDishes } from "@/lib/menu";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function DishList() {
  const dishes = await getDishes();

  // Temporary delay so we can clearly see Suspense streaming.
  await delay(1500);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {dishes.map((dish) => (
        <article
          key={dish.id}
          className="rounded-lg border bg-white p-5 shadow-sm"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <h2 className="text-lg font-bold">{dish.nameEn}</h2>

            {dish.isSpecial && (
              <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700">
                Special
              </span>
            )}
          </div>

          <p className="mb-2 text-sm text-gray-500">{dish.nameAm}</p>

          <p className="mb-3 text-sm text-gray-600">{dish.description}</p>

          <div className="mb-4 flex items-center justify-between">
            <span className="font-bold">{dish.priceETB} ETB</span>

            <span className="text-xs text-gray-500">{dish.category}</span>
          </div>

          <Link
            href={`/menu/${dish.slug}`}
            className="inline-block rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            View Dish
          </Link>
        </article>
      ))}
    </div>
  );
}
