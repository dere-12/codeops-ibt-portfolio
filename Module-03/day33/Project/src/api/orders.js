const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(
  /\/$/,
  "",
);

const USE_MOCK_ORDERS = import.meta.env.VITE_MOCK_ORDERS === "true";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mockPlaceOrder(order) {
  await delay(700);

  const phone = String(order.phone ?? "").replace(/\s+/g, "");

  if (phone === "0999999999") {
    const error = new Error("The demo server rejected this phone number.");

    error.fieldErrors = {
      phone: "This number is not registered (simulated server response).",
    };

    throw error;
  }

  return {
    id: `demo-${Date.now()}`,
    demo: true,
  };
}

export async function placeOrder(order) {
  if (USE_MOCK_ORDERS) {
    return mockPlaceOrder(order);
  }

  if (!API_BASE_URL) {
    throw new Error(
      "No backend is configured. Set VITE_API_BASE_URL or enable VITE_MOCK_ORDERS for local testing.",
    );
  }

  let response;

  try {
    response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
  } catch {
    throw new Error(
      "We couldn't reach the order service. Check your connection and try again.",
    );
  }

  let result = {};

  try {
    result = await response.json();
  } catch {
    if (response.ok && response.status !== 204) {
      throw new Error("The order service returned an unexpected response.");
    }
  }

  if (response.status === 422) {
    const error = new Error(
      result.message || "Please correct the highlighted fields and try again.",
    );

    error.fieldErrors = result.fieldErrors ?? {};

    throw error;
  }

  if (!response.ok) {
    throw new Error(
      result.message ||
        `Your order could not be submitted (HTTP ${response.status}).`,
    );
  }

  return result;
}
