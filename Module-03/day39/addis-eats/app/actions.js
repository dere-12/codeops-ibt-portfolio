"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { orderSchema } from "@/lib/schema";
import { createOrder, getSession, getOrder, markCancelled } from "@/lib/db";

export async function placeOrder(previousState, formData) {
  const orderData = {
    name: formData.get("name") ?? undefined,
    phone: formData.get("phone") ?? undefined,
    quantity: Number(formData.get("quantity") || 1),
  };

  const result = orderSchema.safeParse(orderData);

  if (!result.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: z.flattenError(result.error).fieldErrors,
    };
  }

  const order = await createOrder(result.data);

  revalidatePath("/orders");

  return {
    success: true,
    message: `Order created successfully: ${order.id}`,
    orderId: order.id,
    fieldErrors: {},
  };
}

export async function cancelOrder(orderId) {
  const user = await getSession();

  if (!user) {
    throw new Error("Not signed in");
  }

  const order = await getOrder(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.userId !== user.id) {
    throw new Error("Not yours");
  }

  const cancelledOrder = await markCancelled(orderId);

  revalidatePath("/orders");

  return cancelledOrder;
}
