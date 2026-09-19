import { FiCheck, FiCoffee } from "react-icons/fi";
import styles from "./SpecialSelection.module.css";

function SpecialSelection() {
  return (
    <section className={styles.hero}>
      <div className={styles.topRow}>
        <span className={styles.label}>
          <FiCheck aria-hidden="true" />
          Special Selection
        </span>

        <span className={styles.decorativeMarks} aria-hidden="true">
          ▪▪▪▪ ▪▪▪▪
        </span>
      </div>

      <h1 className={styles.title}>
        Communal Warmth,
        <br />
        Slow-Cooked Heritage
      </h1>

      <p className={styles.description}>
        Gather around our handwoven mesob for time-honored wots, sizzling clay
        stoves, and authentic Gursha sharing.
      </p>

      <div className={styles.bottomRow}>
        <span className={styles.info}>
          <FiCoffee aria-hidden="true" />
          Table-side Warm Bread Refills
        </span>

        <span className={styles.batch}>Today's Batch</span>
      </div>
    </section>
  );
}

export default SpecialSelection;
