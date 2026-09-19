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
            A place to slow down, share generously, and experience authentic
            Habesha hospitality around the mesob.
          </p>

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

          <p>Lunch</p>
          <p>11:00 AM - 3:00 PM</p>

          <p>Dinner</p>
          <p>5:00 PM - 10:00 PM</p>
        </div>

        <div className={styles.column}>
          <h2>Dietary Traditions</h2>

          <p>Fasting / Tsom</p>
          <p>Vegetarian</p>
          <p>Gluten-Free Teff</p>
        </div>

        <div className={styles.column}>
          <h2>Visit Us</h2>

          <p className={styles.location}>
            <FiMapPin aria-hidden="true" />
            Addis Ababa, Ethiopia
          </p>

          <Link to="/menu">View Menu</Link>
          <Link to="/account">Account</Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© Mesob House. All rights reserved.</p>

        <div>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
