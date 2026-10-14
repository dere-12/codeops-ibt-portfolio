import { notFound } from "next/navigation";
import { getOrder } from "@/lib/db";
import OrderStatus from "./OrderStatus";

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <main className="mx-auto w-[90%] max-w-3xl py-10">
      <h1 className="text-3xl font-bold">Order Status</h1>

      <p className="mt-2 text-gray-600">Tracking order: {order.id}</p>

      <OrderStatus id={id} initial={order} />
    </main>
  );
}
