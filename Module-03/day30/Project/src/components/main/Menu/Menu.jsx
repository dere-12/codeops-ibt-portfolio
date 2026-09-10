import { useState, useEffect, useRef } from "react";
import { useFetch } from "../../../hooks/useFetch";
import styles from "./menu.module.css";
import Dish from "../Dish/Dish";
import CategoryBar from "../CategoryBar/CategoryBar";
import CheckoutPanel from "../CheckoutPanel/CheckoutPanel";

function Menu() {
  const [category, setCategory] = useState("All");
  const { dishes, loading, error } = useFetch("/public/data/dishes.json");
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  });

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
    <main className={styles.mainContainer}>
      <section className={styles.searchInputContainer}>
        <input ref={searchInputRef} type="text" placeholder="Search Dishes" />
      </section>
      <section className={styles.dishContainer}>
        <div className={styles.categoryBtns}>
          <CategoryBar selected={category} onSelect={setCategory} />
        </div>
        {filteredMenu.map((dish) => {
          return <Dish key={dish.id} dish={{ ...dish }} />;
        })}
      </section>
      <section className={styles.checkoutContainer}>
        <CheckoutPanel />
      </section>
    </main>
  );
}

export default Menu;
