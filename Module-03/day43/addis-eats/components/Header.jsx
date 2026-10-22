import Link from "next/link";

import { signOut } from "@/app/actions";
import { getSession } from "@/lib/session";

export default async function Header() {
  const user = await getSession();

  return (
    <header className="bg-gray-900 text-white">
      <div className="mx-auto flex min-h-16 w-[90%] max-w-6xl flex-wrap items-center justify-between gap-4 py-3">
        <Link href="/" className="text-xl font-bold">
          Addis Eats
        </Link>

        <nav className="flex flex-wrap items-center gap-5">
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

          <Link href="/orders" className="hover:underline">
            Orders
          </Link>

          {user?.role === "staff" && (
            <Link href="/kitchen" className="hover:underline">
              Kitchen
            </Link>
          )}

          {user ? (
            <>
              <span className="text-sm">Hi, {user.name}</span>

              <form action={signOut}>
                <button type="submit" className="hover:underline">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link href="/signin" className="hover:underline">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
