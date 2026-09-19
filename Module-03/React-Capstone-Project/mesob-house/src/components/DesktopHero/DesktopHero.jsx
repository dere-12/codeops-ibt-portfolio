import { Link } from "react-router-dom";
import { FiCheck, FiCoffee, FiArrowDown } from "react-icons/fi";
import styles from "./DesktopHero.module.css";

function DesktopHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span className={styles.pattern} aria-hidden="true">
              ▪▪ ▪▪▪ ▪▪▪▪
            </span>
            <FiCheck aria-hidden="true" />
            Traditional Habesha Hearth
          </p>

          <h1 className={styles.title}>
            Communal Warmth,
            <br />
            <span>Slow-Cooked Heritage.</span>
          </h1>

          <p className={styles.description}>
            Handcrafted wats, ancient stone-ground teff injera, and velvety
            kitfo simmered in 72-hour infused niter kibbeh and heirloom berbere
            harvested from the Ethiopian highlands.
          </p>

          <div className={styles.actions}>
            <a href="#specials" className={styles.primaryButton}>
              Explore Today's Specials
              <FiArrowDown aria-hidden="true" />
            </a>

            <Link to="/menu" className={styles.secondaryButton}>
              Full Banquet Menu
            </Link>

            <span className={styles.ceremony}>
              <FiCoffee aria-hidden="true" />
              Buna Ceremony 4:00 PM Daily
            </span>
          </div>

          <div className={styles.highlights}>
            <div>
              <strong>100%</strong>
              <span>Brown & White Teff</span>
            </div>

            <div>
              <strong>6+ Hours</strong>
              <span>Slow Stew Caramels</span>
            </div>

            <div>
              <strong>Gursha</strong>
              <span>Hospitality Shared</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesktopHero;
