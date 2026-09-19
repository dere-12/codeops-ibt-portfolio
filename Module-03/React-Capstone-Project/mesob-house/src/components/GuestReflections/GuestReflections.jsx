import { FiStar } from "react-icons/fi";
import styles from "./GuestReflections.module.css";

const reflections = [
  {
    quote:
      "The Doro Wat was so reminiscent of my grandmother's cooking in Gondar. The berbere depth and the slow-simmered onion sweet finish are impossible to find elsewhere.",
    initials: "AM",
    name: "Amanuel Mengistu",
    role: "Bole Resident & Food Patron",
  },
  {
    quote:
      "Their Fasting Beyaynetu is unmatched on Wednesdays. 12 vibrant dishes, and the Shiro atakilt came out bubbling in clay. True culinary devotion.",
    initials: "ST",
    name: "Sara Tesfaye",
    role: "Plant-Based Dining Advocate",
  },
  {
    quote:
      "We hosted a 10-person family reunion around their large handcrafted mesob. The coffee ceremony with fresh frankincense made the evening unforgettable.",
    initials: "DK",
    name: "Dr. Kebede Wolde",
    role: "Diaspora Homecoming Guest",
  },
];

function GuestReflections() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>VOICES AROUND THE MESOB</p>

        <h2 className={styles.title}>Honored Guest Reflections</h2>
      </div>

      <div className={styles.grid}>
        {reflections.map((reflection) => (
          <article key={reflection.name} className={styles.card}>
            <div className={styles.rating} aria-label="5 out of 5 stars">
              <FiStar />
              <FiStar />
              <FiStar />
              <FiStar />
              <FiStar />
            </div>

            <blockquote className={styles.quote}>
              “{reflection.quote}”
            </blockquote>

            <div className={styles.guest}>
              <span className={styles.avatar}>{reflection.initials}</span>

              <div>
                <p className={styles.name}>{reflection.name}</p>

                <p className={styles.role}>{reflection.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default GuestReflections;
