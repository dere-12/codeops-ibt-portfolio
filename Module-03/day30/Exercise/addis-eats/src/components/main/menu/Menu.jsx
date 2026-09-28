import { useState, useEffect, useContext, useMemo, useRef } from "react";
import "./Menu.css";
import Dish from "../products/Dish";
import CategoryBar from "../categoryBar/CategoryBar";
import { useFetch } from "../../../hooks/useFetch";

function Menu() {
  const [category, setCategory] = useState("All");
  const serchInputRef = useRef(null);

  const { data: dishes, loading, error } = useFetch("/public/data/dishes.json");

  useEffect(() => {
    if (serchInputRef.current) {
      serchInputRef.current.focus();
    }
  });

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

  return (
    <>
      <section className="dishes">
        <div className="search-container">
          <input type="text" ref={serchInputRef} placeholder="Search dishes" />
        </div>
        <div className="cat-container">
          <CategoryBar selected={category} onSelect={setCategory} />
        </div>
        {filteredDishes.map((item) => {
          return <Dish dish={item} key={item.id} />;
        })}
      </section>
    </>
  );
}

export default Menu;
