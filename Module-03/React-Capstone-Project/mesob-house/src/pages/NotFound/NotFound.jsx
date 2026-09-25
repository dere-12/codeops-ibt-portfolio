import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiBookOpen, FiShoppingBag, FiHome } from "react-icons/fi";
import styles from "./NotFound.module.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <span className={styles.eyebrow}>PAGE NOT FOUND</span>

        <h1 className={styles.title}>404</h1>

        <p className={styles.message}>
          Looks like this page could not be found.
        </p>

        <p className={styles.description}>
          The page may have moved, the address may be incorrect, or the content
          may no longer be available.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={() => navigate("/")}
          >
            <FiHome />
            Return to Today&apos;s Specials
          </button>

          <button
            type="button"
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={() => navigate("/menu")}
          >
            <FiBookOpen />
            Explore Full Menu
          </button>

          <button
            type="button"
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={() => navigate("/cart")}
          >
            <FiShoppingBag />
            Check Current Order
          </button>
        </div>

        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft />
          Go Back
        </button>
      </section>
    </main>
  );
}

export default NotFound;
