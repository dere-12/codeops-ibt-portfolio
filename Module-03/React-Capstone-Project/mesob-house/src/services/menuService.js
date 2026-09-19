const API_BASE_URL = "https://addis-eats-backend.onrender.com";

export async function getSpecials() {
  const response = await fetch(`${API_BASE_URL}/menu/specials`);

  if (!response.ok) {
    throw new Error("Failed to fetch today's specials.");
  }

  const result = await response.json();

  return result.data;
}

export async function getMenu() {
  const response = await fetch(`${API_BASE_URL}/menu/`);

  if (!response.ok) {
    throw new Error("Failed to fetch the menu.");
  }

  const result = await response.json();

  return result.data;
}
