import "./Dish.css";
import { useState } from "react";

function Dish({ dish, onAddToCart}) {
  const [count, setCount] = useState(0)

  function handleAdd() {
    setCount(count + 1);
    onAddToCart(dish.price);
  }

  return (
    <div className="dish">
      <div className="img-cont">
        <img src={dish.image} alt={dish.name} />
      </div>
      <div className="spicy">
        {dish.spicy && <span>🌶️ spicy</span>}
      </div>
      <p>{dish.name}</p>
      <p>{dish.price}</p>
      <button onClick={handleAdd}>Add ({count})</button>
    </div>
  );
}

export default Dish;
