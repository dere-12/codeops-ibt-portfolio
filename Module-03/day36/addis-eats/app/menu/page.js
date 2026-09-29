const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

import Link from "next/link";

const dishes = ["kitfo", "shiro", "doro-wat"];

export default async function MenuPage() {
  await delay(1000);
  //throw "Test Error Route";

  return (
    <main>
      <h1>Our Menu</h1>

      {dishes.map((dish) => (
        <div key={dish}>
          <Link href={`/menu/${dish}`}>{dish}</Link>
        </div>
      ))}
    </main>
  );
}
