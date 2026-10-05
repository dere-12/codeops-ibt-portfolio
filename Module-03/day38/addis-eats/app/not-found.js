import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Dish not found</h1>
      <p>We couldn't find that dish.</p>

      <Link href="/menu">Back to Menu</Link>
    </main>
  );
}
