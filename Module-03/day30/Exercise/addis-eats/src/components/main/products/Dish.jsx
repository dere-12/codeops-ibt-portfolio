import "./Dish.css";
import { useContext } from "react";
import { CartContext } from "../../../contexts/CartContextProvider";

function Dish({ dish }) {
  const { dispatch } = useContext(CartContext);
  function handleAdd() {
    dispatch({ type: "add", dish: dish });
  }

  return (
    <div className="dish">
      <div className="img-cont">
        <img src={dish.image} alt={dish.name} />
      </div>
      <div className="spicy">{dish.spicy && <span>🌶️ spicy</span>}</div>
      <p>{dish.name}</p>
      <p>{dish.price}</p>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Dish;
