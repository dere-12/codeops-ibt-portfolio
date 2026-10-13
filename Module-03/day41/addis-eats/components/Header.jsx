import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white">
      <div className="mx-auto flex min-h-16 w-[90%] max-w-6xl items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Addis Eats
        </Link>

        <nav className="flex gap-5">
          <Link href="/" className="hover:underline">
            Home
          </Link>

          <Link href="/menu" className="hover:underline">
            Menu
          </Link>

          <Link href="/cart" className="hover:underline">
            Cart
          </Link>

          <Link href="/checkout" className="hover:underline">
            Checkout
          </Link>
        </nav>
      </div>
    </header>
  );
}
