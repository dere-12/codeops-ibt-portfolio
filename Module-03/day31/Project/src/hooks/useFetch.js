import { useState, useEffect } from "react";

export function useFetch(url) {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();

    setLoading(true);
    setError(null);
    async function loadDishes() {
      try {
        const res = await fetch(url, {
          signal: ctrl.signal,
        });

        if (!res.ok) {
          throw new Error("Could not load dishes. Please try again.");
        }

        const data = await res.json();
        setDishes(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadDishes();

    return () => ctrl.abort();
  }, [url]);

  return { dishes, loading, error };
}
