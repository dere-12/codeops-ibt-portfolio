import { useState, useEffect, useRef } from "react";
import styles from "./menu.module.css";
import Dish from "../Dish/Dish";
import CategoryBar from "../CategoryBar/CategoryBar";
import OrderForm from "../OrderForm/OrderForm";

function Menu() {
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
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
  }, [category]);

  if (loading) {
    return <p>Loading dishes...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const filteredMenu = dishes.filter((dish) => {
    return category === "All" || category === dish.category;
  });

  if (filteredMenu.length === 0) {
    return <p>No dishes found in {category} category.</p>;
  }

  return (
    <div className={styles.mainContainer}>
      <section className={styles.searchInputContainer}>
        <input ref={searchInputRef} type="text" placeholder="Search Dishes" />
      </section>
      <section className={styles.dishContainer}>
        <div className={styles.categoryBtns}>
          <CategoryBar selected={category} onSelect={setCategory} />
        </div>
        <div className={styles.total}>
          <p>Total: {total} ETB.</p>
        </div>
        {filteredMenu.map((dish) => {
          return (
            <Dish
              key={dish.id}
              dish={{ ...dish }}
              onAddToOrder={setTotal}
              total={total}
            />
          );
        })}
      </section>
      <section className={styles.formContainer}>
        <OrderForm total={total} />
      </section>
    </div>
  );
}

export default Menu;
