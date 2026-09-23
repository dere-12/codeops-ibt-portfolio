import { useEffect, useState } from "react";
import { getMenu } from "../../services/menuService";
import useCartStore from "../../store/cartStore";
import DishCard from "../../components/DishCard/DishCard";
import BasketBar from "../../components/BasketBar/BasketBar";
import TraditionalGursha from "../../components/TraditionalGursha/TraditionalGursha";
import styles from "./FullMenu.module.css";

function FullMenu() {
  const [menu, setMenu] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Dishes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    async function loadMenu() {
      try {
        setLoading(true);
        setError("");

        const data = await getMenu();
        setMenu(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  function handleQuickAdd(dish) {
    addToCart(dish);
  }

  const categories = [
    "All Dishes",
    ...new Set(menu.map((dish) => dish.category)),
  ];

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredMenu = menu.filter((dish) => {
    const matchesSearch =
      dish.nameEn.toLowerCase().includes(normalizedSearch) ||
      dish.nameAm.includes(searchTerm.trim());

    const matchesCategory =
      selectedCategory === "All Dishes" || dish.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  function getCategoryCount(category) {
    if (category === "All Dishes") {
      return menu.length;
    }

    return menu.filter((dish) => dish.category === category).length;
  }

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p>Loading full menu...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <p className={styles.eyebrow}>
            HANDCRAFTED GONDAR &amp; ADDIS SPICES
          </p>

          <h1 className={styles.title}>Our Complete Culinary Heritage</h1>

          <p className={styles.description}>
            Every dish is prepared daily from scratch using sun-dried spices,
            stone-ground legume flours, and clarified herbal butter sourced
            directly from highland farm cooperatives.
          </p>
        </header>

        <div className={styles.controls}>
          <label className={styles.searchLabel}>
            <span>Search dishes</span>

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search dishes by name (e.g. Kitfo, Shiro, Tibs, Doro Wat)..."
              className={styles.searchInput}
            />
          </label>
        </div>

        <nav className={styles.categories} aria-label="Menu categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                selectedCategory === category
                  ? styles.categoryActive
                  : styles.category
              }
              onClick={() => setSelectedCategory(category)}
            >
              <span>{category}</span>
              <span>{getCategoryCount(category)}</span>
            </button>
          ))}
        </nav>

        <div className={styles.mobileGursha}>
          <TraditionalGursha />
        </div>

        {filteredMenu.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>No dishes found</h2>

            <p>Try another dish name or choose a different category.</p>
          </div>
        ) : (
          <section className={styles.menuGrid}>
            {filteredMenu.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onQuickAdd={handleQuickAdd}
                showDetails={false}
              />
            ))}
          </section>
        )}
      </div>

      <BasketBar />
    </main>
  );
}

export default FullMenu;
