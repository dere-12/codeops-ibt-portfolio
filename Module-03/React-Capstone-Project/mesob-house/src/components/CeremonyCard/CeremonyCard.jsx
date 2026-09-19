import { FiCoffee } from "react-icons/fi";
import styles from "./CeremonyCard.module.css";

function CeremonyCard() {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.label}>
          <FiCoffee aria-hidden="true" />
          <span>Daily Ritual</span>
        </div>

        <span className={styles.time}>4:00 PM Sharp</span>
      </div>

      <h2 className={styles.title}>Jebena Buna & Frankincense Ceremony</h2>

      <p className={styles.decorativeMarks} aria-hidden="true">
        ▪▪▪▪ ▪▪ ▪▪▪▪▪▪▪
      </p>

      <p className={styles.description}>
        Experience the three ceremonial pours—Abol, Tona, and Baraka—roasted
        fresh with sweet-popped sorghum (fendisha) and tendrils of sacred
        frankincense.
      </p>

      <p className={styles.price}>
        ETB 120 <span>/ seat</span>
      </p>

      <button
        type="button"
        className={styles.reserveButton}
        disabled
        title="Booking functionality has not been provided yet."
      >
        Reserve Ceremony Spot
      </button>
    </section>
  );
}

export default CeremonyCard;
