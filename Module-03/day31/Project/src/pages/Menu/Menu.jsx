import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import styles from "./menu.module.css";
import Dish from "../../components/Dish/Dish";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import CheckoutPanel from "../CheckoutPanel/CheckoutPanel";

function Menu() {
  // const [category, setCategory] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const { dishes, loading, error } = useFetch("/public/data/dishes.json");
  const searchInputRef = useRef(null);
  const category = searchParams.get("category") ?? "All";

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

  const filteredMenu =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  if (filteredMenu.length === 0) {
    return <p>No dishes found in {category} category.</p>;
  }

  function chooseCategory(category) {
    if (category === "All") {
      setSearchParams({});
      return;
    }

    setSearchParams({
      category,
    });
  }

  return (
    <main className={styles.mainContainer}>
      <section className={styles.searchInputContainer}>
        <input ref={searchInputRef} type="text" placeholder="Search Dishes" />
      </section>
      <section className={styles.dishContainer}>
        <div className={styles.categoryBtns}>
          <CategoryBar selected={category} onSelect={chooseCategory} />
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
