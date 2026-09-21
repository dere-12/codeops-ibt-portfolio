import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { getMenu } from "../services/menuService";
import DishPurchase from "../components/DishPurchase/DishPurchase";
import styles from "./DishDetail.module.css";

function DishDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [dish, setDish] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedQuantity, setAddedQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDish() {
      try {
        setLoading(true);
        setError("");

        const menu = await getMenu();

        const selectedDish = menu.find((item) => item.slug === slug);

        if (!selectedDish) {
          throw new Error("Dish not found.");
        }

        setDish(selectedDish);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadDish();
  }, [slug]);

  function handleDecrease() {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  }

  function handleIncrease() {
    setQuantity((currentQuantity) => currentQuantity + 1);
  }

  function handleAddToBasket() {
    setAddedQuantity(quantity);
  }

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p>Loading dish...</p>
        </div>
      </main>
    );
  }

  if (error || !dish) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate(-1)}
          >
            <FiChevronLeft aria-hidden="true" />
            Back
          </button>

          <div className={styles.errorState}>
            <h1>Dish not found</h1>
            <p>{error}</p>

            <Link to="/menu" className={styles.menuLink}>
              Return to Full Menu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const total = dish.priceETB * quantity;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          <FiChevronLeft aria-hidden="true" />
          Back
        </button>

        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/menu">Menu</Link>
          <span>/</span>
          <span>{dish.category}</span>
          <span>/</span>
          <strong>{dish.nameEn}</strong>
        </nav>

        <section className={styles.product}>
          <div className={styles.imageArea}>
            <div className={styles.imagePlaceholder}>
              <span>Food image</span>
            </div>
          </div>

          <div className={styles.content}>
            <span className={styles.category}>{dish.category}</span>

            <h1 className={styles.name}>{dish.nameEn}</h1>

            {dish.nameAm && <p className={styles.nameAm}>{dish.nameAm}</p>}

            <p className={styles.price}>ETB {dish.priceETB.toLocaleString()}</p>

            <p className={styles.description}>{dish.description}</p>

            <div className={styles.desktopPurchase}>
              <DishPurchase
                quantity={quantity}
                onDecrease={handleDecrease}
                onIncrease={handleIncrease}
                onAddToBasket={handleAddToBasket}
                total={total}
              />
            </div>

            {addedQuantity > 0 && (
              <p className={styles.successMessage} role="status">
                {addedQuantity} {addedQuantity === 1 ? "item" : "items"} added
                to basket.
              </p>
            )}
          </div>
        </section>
      </div>

      <div className={styles.mobilePurchase}>
        <DishPurchase
          quantity={quantity}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
          onAddToBasket={handleAddToBasket}
          total={total}
        />
      </div>
    </main>
  );
}

export default DishDetail;
