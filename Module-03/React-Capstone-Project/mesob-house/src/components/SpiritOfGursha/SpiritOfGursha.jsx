import { FiHeart, FiSend } from "react-icons/fi";
import styles from "./SpiritOfGursha.module.css";

function SpiritOfGursha() {
  return (
    <section className={styles.card}>
      <div className={styles.icon} aria-hidden="true">
        <FiSend />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>The Spirit of Gursha</h2>

        <p className={styles.description}>
          In Ethiopian culture, dining is an act of love. When you feed someone
          with your own hand—a gursha—you cement bonds of friendship, family,
          and shared respect.
        </p>

        <div className={styles.action}>
          <FiHeart aria-hidden="true" />
          <span>Ask our team for extra teff wraps for shared Gursha</span>
        </div>
      </div>
    </section>
  );
}

export default SpiritOfGursha;
