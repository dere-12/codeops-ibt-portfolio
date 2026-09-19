import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import styles from "./BottomCTA.module.css";

function BottomCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>JOIN OUR TABLE</p>

        <h2 className={styles.title}>
          Experience Authentic Habesha Warmth Tonight
        </h2>
        <p className={styles.description}>
          Whether gathering around our circular mesobs for communal dining or
          ordering freshly baked injera to your home in Addis Ababa.
        </p>
      </div>

      <Link to="/menu" className={styles.button}>
        <span>View Complete Menu</span>
        <FiArrowRight aria-hidden="true" />
      </Link>
    </section>
  );
}

export default BottomCTA;
