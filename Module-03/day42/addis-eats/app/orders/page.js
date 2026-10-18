import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import { getOrdersFor } from "@/lib/db";
import { cancelOrder } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/orders");
  }

  const orders = await getOrdersFor(user.id);

  return (
    <main className="mx-auto w-[90%] max-w-3xl py-10">
      <h1 className="text-3xl font-bold">My Orders</h1>

      <p className="mt-2 text-gray-600">Orders belonging to {user.name}.</p>

      {orders.length === 0 ? (
        <p className="mt-6">You haven't placed any orders yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <article key={order.id} className="rounded-lg border p-5">
              <p>
                <span className="font-semibold">Order ID:</span> {order.id}
              </p>

              <p className="mt-1">
                <span className="font-semibold">Status:</span> {order.status}
              </p>

              <p className="mt-1">
                <span className="font-semibold">Quantity:</span>{" "}
                {order.quantity}
              </p>

              <Link
                href={`/orders/${order.id}`}
                className="mt-3 inline-block text-blue-600 hover:underline"
              >
                Track order
              </Link>

              {order.status !== "CANCELLED" && (
                <form
                  action={cancelOrder.bind(null, order.id)}
                  className="mt-3"
                >
                  <button
                    type="submit"
                    className="rounded-md border border-red-500 px-3 py-2 text-red-600 hover:bg-red-50"
                  >
                    Cancel order
                  </button>
                </form>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
