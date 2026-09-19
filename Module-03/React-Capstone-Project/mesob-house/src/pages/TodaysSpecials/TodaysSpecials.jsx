import { useEffect, useState } from "react";
import { getSpecials } from "../../services/menuService";
import DishCard from "../../components/DishCard/DishCard";
import SpiritOfGursha from "../../components/SpiritOfGursha/SpiritOfGursha";
import CeremonyCard from "../../components/CeremonyCard/CeremonyCard";
import TeffBanner from "../../components/TeffBanner/TeffBanner";
import SpecialSelection from "../../components/SpecialSelection/SpecialSelection";
import DesktopHero from "../../components/DesktopHero/DesktopHero";
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
      <div className={styles.desktopHero}>
        <DesktopHero />
      </div>

      <div className={styles.mobileHero}>
        <div className={styles.content}>
          <TeffBanner />
          <SpecialSelection />
        </div>
      </div>

      <div className={styles.content}>
        <section id="specials" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.mobileSectionTitle}>
              Today's Kitchen Highlight
            </h2>

            <div className={styles.desktopSectionHeader}>
              <p className={styles.specialsEyebrow}>✕ FROM THE CLAY POTS</p>

              <h2 className={styles.specialsTitle}>
                Today's Curated Chef Specials
              </h2>

              <p className={styles.specialsDescription}>
                Carefully balanced stews prepared at dawn using our matriarch's
                4–50-spice blend, served piping hot on hand-stretched injera.
              </p>
            </div>

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
