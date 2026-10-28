import styles from "./pageSkeleton.module.css";

function PageSkeleton({ label = "page" }) {
  return (
    <section
      className={styles.skeleton}
      role="status"
      aria-label={`Loading ${label}`}
      aria-busy="true"
    >
      <span className={styles.screenReaderText}>Loading {label}…</span>

      <div className={styles.heading} aria-hidden="true" />
      <div className={styles.shortLine} aria-hidden="true" />

      <div className={styles.contentBlock} aria-hidden="true">
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.mediumLine} />
        <div className={styles.buttonLine} />
      </div>
    </section>
  );
}

export default PageSkeleton;
