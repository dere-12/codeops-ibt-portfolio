import styles from "./categoryBar.module.css";

function CategoryBar({ selected, onSelect }) {
  let categories = ["All", "Main", "Side", "Vegetarian", "Breakfast"];

  function handleClick(category) {
    onSelect(category);
  }
  return (
    <>
      {categories.map((category) => {
        return (
          <button
            key={category}
            onClick={() => handleClick(category)}
            className={`${styles.btn} ${selected === category ? styles.btnSelected : ""}`}
          >
            {category}
          </button>
        );
      })}
    </>
  );
}

export default CategoryBar;
