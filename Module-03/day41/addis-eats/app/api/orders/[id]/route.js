import { getOrder } from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return Response.json(
      { error: `Order with ID '${id}' not found` },
      { status: 404 },
    );
  }

  return Response.json(order);
}
