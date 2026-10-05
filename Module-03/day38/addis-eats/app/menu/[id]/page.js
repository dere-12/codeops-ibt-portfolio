import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishes } from "@/lib/menu";

export async function generateStaticParams() {
  const dishes = await getDishes();

  return dishes.map((dish) => ({
    id: dish.slug,
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dishes = await getDishes();

  const dish = dishes.find((item) => item.slug === id);

  if (!dish) {
    notFound();
  }

  return (
    <article className="mx-auto w-[90%] max-w-4xl py-10">
      <Link
        href="/menu"
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back to Menu
      </Link>

      <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{dish.nameEn}</h1>

            <p className="mt-1 text-lg text-gray-500">
              {dish.nameAm}
            </p>
          </div>

          {dish.isSpecial && (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
              Special
            </span>
          )}
        </div>

        <p className="mt-6 text-gray-700">{dish.description}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-medium">{dish.category}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-bold">{dish.priceETB} ETB</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Spice Level</p>
            <p className="font-medium">{dish.spiceLevel}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Servings</p>
            <p className="font-medium">{dish.servings}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold">Ingredients</h2>

          <ul className="mt-3 list-inside list-disc text-gray-700">
            {dish.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}