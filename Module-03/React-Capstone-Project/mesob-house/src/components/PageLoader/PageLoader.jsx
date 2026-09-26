import styles from "./PageLoader.module.css";

function PageLoader() {
  return (
    <div
      className={styles.loader}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <span className={styles.mark} aria-hidden="true">
        MH
      </span>

      <span className={styles.text}>Preparing your table...</span>
    </div>
  );
}

export default PageLoader;
