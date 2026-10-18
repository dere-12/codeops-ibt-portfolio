"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { orderSchema } from "@/lib/schema";
import { createOrder, getOrder, markCancelled } from "@/lib/db";

import { authenticateUser } from "@/lib/auth";
import { createSession, getSession, clearSession } from "@/lib/session";

import { safeNextPath } from "@/lib/redirects";

export async function signIn(_previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const next = safeNextPath(formData.get("next"));

  const user = await authenticateUser(email, password);

  if (!user) {
    return {
      success: false,
      message: "Email or password is incorrect.",
    };
  }

  await createSession(user);

  redirect(next);
}

export async function signOut() {
  await clearSession();

  redirect("/");
}

export async function placeOrder(_previousState, formData) {
  const user = await getSession();

  if (!user) {
    return {
      success: false,
      message: "Please sign in before placing an order.",
      fieldErrors: {},
    };
  }

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

  const order = await createOrder(result.data, user.id);

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
  revalidatePath(`/orders/${orderId}`);

  return cancelledOrder;
}
