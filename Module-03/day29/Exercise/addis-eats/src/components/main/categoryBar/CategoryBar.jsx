import "./CategoryBar.css";

function CategoryBar({ selected, onSelect }) {
  const categories = ["All", "Main", "Side"];

  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          className={cat === selected ? "chip active" : "chip"}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;
