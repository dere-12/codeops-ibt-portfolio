import { useEffect, useState } from "react";
import { getSpecials } from "../../services/menuService";
import DishCard from "../../components/DishCard/DishCard";
import SpiritOfGursha from "../../components/SpiritOfGursha/SpiritOfGursha";
import CeremonyCard from "../../components/CeremonyCard/CeremonyCard";
import styles from "./TodaysSpecials.module.css";

function TodaysSpecials() {
  const [specials, setSpecials] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSpecials() {
      try {
        setLoading(true);
        setError("");

        const data = await getSpecials();
        setSpecials(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadSpecials();
  }, []);

  function handleQuickAdd(dish) {
    setCartItems((currentItems) => [...currentItems, dish]);
  }

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.content}>
          <p>Loading today's specials...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.content}>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h1 className={styles.sectionTitle}>Today's Kitchen Highlight</h1>

            <span className={styles.sectionMeta}>
              {specials.length} Specials Live
            </span>
          </div>

          <div className={styles.specialsList}>
            {specials.map((dish) => (
              <DishCard key={dish.id} dish={dish} onQuickAdd={handleQuickAdd} />
            ))}
          </div>

          <SpiritOfGursha />
          <CeremonyCard />
        </section>
      </div>
    </main>
  );
}

export default TodaysSpecials;
