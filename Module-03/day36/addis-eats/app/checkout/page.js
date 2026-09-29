import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main>
      <h1>Checkout</h1>
      <p>Complete your order here.</p>

      <Link href="/cart">Back to Cart</Link>
    </main>
  );
}
