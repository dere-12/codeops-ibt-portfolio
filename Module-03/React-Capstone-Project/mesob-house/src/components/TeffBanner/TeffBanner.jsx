import { FiAward } from "react-icons/fi";
import styles from "./TeffBanner.module.css";

function TeffBanner() {
  return (
    <section className={styles.banner}>
      <p className={styles.eyebrow}>100% PURE TEFF</p>

      <div className={styles.mainRow}>
        <div className={styles.daily}>
          <FiAward aria-hidden="true" />
          <span>Slow-Cooked Daily</span>
        </div>

        <span className={styles.badge}>Gluten-Free</span>
      </div>

      <p className={styles.description}>Heritage grains sourced direct from</p>
    </section>
  );
}

export default TeffBanner;
