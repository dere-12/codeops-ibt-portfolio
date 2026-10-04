import Link from "next/link";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  // Reading the session cookie makes this route request-specific.
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  const hasSession = Boolean(session);

  return (
    <main className="mx-auto w-[90%] max-w-3xl py-10">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <p className="mt-3 text-gray-600">Complete your order here.</p>

      <div className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        {hasSession ? (
          <p>Session found. Ready for checkout.</p>
        ) : (
          <p>No active session found.</p>
        )}
      </div>

      <Link
        href="/cart"
        className="mt-6 inline-block text-blue-600 hover:underline"
      >
        ← Back to Cart
      </Link>
    </main>
  );
}
