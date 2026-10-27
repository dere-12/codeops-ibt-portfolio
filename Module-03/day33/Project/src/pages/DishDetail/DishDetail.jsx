import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useCartStore } from "../../store/cartStore";
import styles from "./DishDetail.module.css";

function DishDetail() {
  const { id } = useParams();
  const numericId = Number(id);
  const addItem = useCartStore((state) => state.addItem);
  const { dishes, loading, error } = useFetch("/public/data/dishes.json");
  const dish = dishes.find((dish) => dish.id === numericId);

  if (loading) {
    return <p>Loading dish...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  function handleAddToCart() {
    addItem(dish);
  }

  if (!dish) {
    return (
      <section className={styles.errorCont}>
        <h2>Dish Not Found</h2>

        <p>No dish with ID "{id}" exists.</p>

        <Link to="/menu">Back to Menu</Link>
      </section>
    );
  }

  return (
    <section className={styles.dishCont}>
      <h2>{dish.name}</h2>

      <p>Category: {dish.category}</p>

      <p>Price: {dish.price} ETB</p>

      <button onClick={handleAddToCart}>Add to Cart</button>

      <br />
      <br />

      <Link to="/menu">← Back to Menu</Link>
    </section>
  );
}

export default DishDetail;
