import { FiHeart } from "react-icons/fi";
import styles from "./TraditionalGursha.module.css";

function TraditionalGursha() {
  return (
    <section className={styles.banner}>
      <div className={styles.icon} aria-hidden="true">
        <FiHeart />
      </div>

      <div className={styles.content}>
        <h2>Traditional Gursha Experience</h2>

        <p>Fresh roll of pure brown Teff Injera served with every dish.</p>
      </div>

      <FiHeart className={styles.endIcon} aria-hidden="true" />
    </section>
  );
}

export default TraditionalGursha;
