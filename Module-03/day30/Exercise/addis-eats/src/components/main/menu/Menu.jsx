import { useState, useEffect, useContext, useMemo, useRef } from "react";
import "./Menu.css";
import Dish from "../products/Dish";
import CategoryBar from "../categoryBar/CategoryBar";
import OrderForm from "../orderForm/OrderForm";
import { useFetch } from "../../../hooks/useFetch";
import { CartContext } from "../cart/CartProvider";

function Menu() {
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);
  const serchInputRef = useRef(null);

  const { data: dishes, loading, error } = useFetch("/public/data/dishes.json");
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    if (serchInputRef.current) {
      serchInputRef.current.focus();
    }
  });

  const sortedDishes = useMemo(() => {
    return (dishes ?? []).sort((a, b) => a.price - b.price);
  }, [dishes]);

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
    <>
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
          return (
            <Dish dish={item} key={item.id} onAddToCart={handleAddToCart} />
          );
        })}
      </section>
    </>
  );
}

export default Menu;
