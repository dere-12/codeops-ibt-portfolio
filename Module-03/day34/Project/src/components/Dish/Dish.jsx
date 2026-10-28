import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./dish.module.css";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import { useCartStore } from "../../store/cartStore";

function Dish({ dish, currency = "ETB", simulateError = false }) {
  const addItem = useCartStore((state) => state.addItem);
  const addButtonRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (simulateError) {
    throw new Error(`Day 34 test render error for ${dish.name}`);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleConfirmAdd() {
    addItem(dish);
    setIsModalOpen(false);
  }

  return (
    <>
      <Card>
        <div>
          <div className={styles.cardTitle}>
            <h3>{dish.name}</h3>
            {dish.spicy && <span>🌶️ Spicy</span>}
          </div>

          <p className={styles.price}>
            {dish.price} {currency}
          </p>
        </div>

        <div className={styles.cardBottom}>
          <div className={styles.addToCart}>
            <button
              ref={addButtonRef}
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              Add To Cart
            </button>
          </div>

          <div className={styles.viewDetail}>
            <Link to={`/menu/${dish.id}`}>View Details</Link>
          </div>
        </div>
      </Card>

      {isModalOpen && (
        <Modal
          title={`Add ${dish.name} to your order?`}
          onClose={handleCloseModal}
          returnFocusRef={addButtonRef}
        >
          <p className={styles.modalMessage}>
            {dish.name} costs {dish.price} {currency}. Would you like to add it
            to your cart?
          </p>

          <div className={styles.modalActions}>
            <button type="button" onClick={handleCloseModal}>
              Cancel
            </button>

            <button type="button" data-autofocus onClick={handleConfirmAdd}>
              Add to Cart
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Dish;
