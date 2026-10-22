import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto w-[90%] max-w-6xl py-10">
      <section className="grid items-center gap-8 rounded-2xl bg-orange-50 p-6 sm:p-10 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Welcome to Addis Eats
          </h1>

          <p className="mt-4 max-w-xl text-lg text-gray-600">
            Discover delicious Ethiopian dishes, explore traditional flavors,
            and order your favorites.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl">
          <Image
            src="/images/ethiopian-hero.jpg"
            alt="A traditional Ethiopian platter of food served on injera"
            width={1200}
            height={900}
            sizes="(max-width: 1023px) 90vw, 50vw"
            preload
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </section>

      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold">Explore Our Dishes</h2>

        <p className="mt-3 text-gray-600">
          From traditional stews to flavorful vegetarian dishes, find something
          you will love.
        </p>

        <Link
          href="/menu"
          className="mt-5 inline-block font-semibold text-orange-700 hover:underline"
        >
          Browse all dishes →
        </Link>
      </section>
    </div>
  );
}
