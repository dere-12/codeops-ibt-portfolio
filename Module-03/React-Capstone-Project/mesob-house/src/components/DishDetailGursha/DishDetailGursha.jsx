import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import styles from "./DishDetailGursha.module.css";

function DishDetailGursha() {
  return (
    <section className={styles.banner}>
      <div className={styles.icon} aria-hidden="true">
        <FiHeart />
      </div>

      <div className={styles.content}>
        <h2>The Spirit of Gursha</h2>

        <p>
          Sharing a bite directly into a companion's mouth is an act of deep
          hospitality and bond.
        </p>
      </div>

      <Link to="/menu" className={styles.button}>
        Explore Full Menu
      </Link>
    </section>
  );
}

export default DishDetailGursha;
