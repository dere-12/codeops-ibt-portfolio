"use client";

import { useActionState } from "react";
import { placeOrder } from "@/app/actions";

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(placeOrder, null);

  return (
    <form action={formAction} className="mt-6 space-y-4 rounded-lg border p-6">
      <div>
        <label htmlFor="name">Full name</label>

        <input
          id="name"
          name="name"
          required
          minLength={2}
          className="mt-1 w-full rounded-md border px-3 py-2"
        />

        {state?.fieldErrors?.name?.[0] && (
          <p role="alert" className="text-sm text-red-600">
            {state.fieldErrors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone">Phone number</label>

        <input
          id="phone"
          name="phone"
          type="tel"
          required
          pattern="(09|[+]2519)[0-9]{8}"
          title="Use 09… or +2519… followed by 8 digits"
          className="mt-1 w-full rounded-md border px-3 py-2"
        />

        {state?.fieldErrors?.phone?.[0] && (
          <p role="alert" className="text-sm text-red-600">
            {state.fieldErrors.phone[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="quantity">Quantity</label>

        <input
          id="quantity"
          name="quantity"
          type="number"
          min="1"
          step="1"
          defaultValue="1"
          required
          className="mt-1 w-full rounded-md border px-3 py-2"
        />

        {state?.fieldErrors?.quantity?.[0] && (
          <p role="alert" className="text-sm text-red-600">
            {state.fieldErrors.quantity[0]}
          </p>
        )}
      </div>

      {state?.message && (
        <p role={state.success ? "status" : "alert"}>{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-gray-900 px-5 py-2 text-white disabled:opacity-50"
      >
        {pending ? "Submitting..." : "Place order"}
      </button>
    </form>
  );
}
