import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiMapPin } from "react-icons/fi";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            Mesob
            <span>HABESHA HOUSE</span>
          </Link>

          <p className={styles.description}>
            Sharing traditions from the Ethiopian highlands — one Gursha at a
            time.
          </p>

          <div className={styles.ceremonyNote}>
            <span aria-hidden="true">☕</span>
            <span>
              Traditional Coffee Ceremony daily
              <br />
              at 4:00 PM
            </span>
          </div>

          <div className={styles.socials}>
            <a href="#facebook" aria-label="Facebook">
              <FiFacebook />
            </a>

            <a href="#instagram" aria-label="Instagram">
              <FiInstagram />
            </a>
          </div>
        </div>

        <div className={styles.column}>
          <h2>Hospitality Hours</h2>

          <p>Tuesday - Sunday: 11:30 AM - 11:00 PM</p>
          <p>Monday: Reserved for Private Banquets</p>

          <strong>Jebena Buna &amp; Fresh Roasting All Evening</strong>
        </div>

        <div className={styles.column}>
          <h2>Dietary Traditions</h2>

          <p>Vegan Fasting (Beyaynetu / Tsom)</p>
          <p>Traditional Prime Meat Feasts</p>
          <p>House Tej (Pure Honey Wine)</p>
          <p>Jebena Buna Roasting Ceremony</p>
        </div>

        <div className={styles.column}>
          <h2>Addis Location</h2>

          <p>
            Bole Medhanelem, Addis Ababa &amp; express delivery across town.
          </p>

          <a href="tel:+251911234567" className={styles.phone}>
            +251 911 234 567
          </a>

          <p className={styles.location}>
            <FiMapPin aria-hidden="true" />
            Addis Ababa, Ethiopia
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          © 2026 Mesob House Habesha Dining. Authentic Ethiopian &amp; Eritrean
          Heritage.
        </p>

        <div>
          <a href="#hospitality">Gursha Hospitality</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Table</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
