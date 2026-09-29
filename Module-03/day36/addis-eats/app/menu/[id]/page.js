import Link from "next/link";
import { notFound } from "next/navigation";

const dishes = ["kitfo", "shiro", "doro-wat"];

export default async function DishPage({ params }) {
  const { id } = await params;

  if (!dishes.includes(id)) {
    notFound();
  }

  return (
    <main>
      <h1>Dish: {id}</h1>
      <Link href={"/menu"}>Back To Menu</Link>
    </main>
  );
}
