import { useEffect, useState } from "react";
import { getSpecials } from "../services/menuService";
import DishCard from "../components/DishCard/DishCard";

function TodaysSpecials() {
  const [specials, setSpecials] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSpecials() {
      try {
        setLoading(true);
        setError("");

        const data = await getSpecials();
        setSpecials(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadSpecials();
  }, []);

  function handleQuickAdd(dish) {
    setCartItems((currentItems) => [...currentItems, dish]);
  }

  if (loading) {
    return <p>Loading today's specials...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Today's Specials</h1>

      <p>Cart items: {cartItems.length}</p>

      <section>
        {specials.map((dish) => (
          <DishCard key={dish.id} dish={dish} onQuickAdd={handleQuickAdd} />
        ))}
      </section>
    </main>
  );
}

export default TodaysSpecials;
