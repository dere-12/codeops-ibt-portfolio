import { useState, useEffect, useRef } from "react";
import "./Menu.css";
import Dish from "../products/Dish";
import CategoryBar from "../categoryBar/CategoryBar";
import OrderForm from "../orderForm/OrderForm";

function Menu() {
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const serchInputRef = useRef(null);

  useEffect(() => {
    if (serchInputRef.current) {
      serchInputRef.current.focus();
    }
  });

  useEffect(() => {
    const ctrl = new AbortController();

    setLoading(true);
    setError(null);
    async function loadDishes() {
      try {
        const res = await fetch("/public/data/dishes.json", {
          signal: ctrl.signal,
        });

        if (!res.ok) {
          throw new Error("Could not load the menu. Please try again.");
        }

        const date = await res.json();
        setDishes(date);
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
  }, [category]);

  if (loading) {
    return <p>Loading the dishes menu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const filteredDishes = dishes.filter((dish) => {
    return category === "All" || category === dish.category;
  });

  if (filteredDishes.length === 0) {
    return <p>No dishes found in this category.</p>;
  }

  function handleAddToCart(price) {
    setTotal((prevTotal) => prevTotal + price);
  }

  return (
    <section className="dishes">
      <div className="search-container">
        <input type="text" ref={serchInputRef} placeholder="Search dishes" />
      </div>
      <div className="cat-container">
        <div>
          <CategoryBar selected={category} onSelect={setCategory} />
          <p>
            <strong>Running Total:</strong> {total} ETB
          </p>
        </div>

        <div>
          <OrderForm total={total} />
        </div>
      </div>
      {filteredDishes.map((item) => {
        return <Dish dish={item} key={item.id} onAddToCart={handleAddToCart} />;
      })}
    </section>
  );
}

export default Menu;
