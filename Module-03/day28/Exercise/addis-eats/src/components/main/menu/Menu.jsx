import "./Menu.css";
import Dish from "../products/Dish";
import CategoryBar from "../categoryBar/CategoryBar";
import OrderForm from "../orderForm/OrderForm";

function Menu({
  filteredDishes,
  onAddToCart,
  selected,
  onSelect,
  total,
  category,
  setCategory,
}) {
  if (filteredDishes.length === 0) {
    return <div>No dishes found in the {selected} category.</div>;
  }

  return (
    <section className="dishes">
      <div className="cat-container">
        <div>
          <CategoryBar selected={category} onSelect={setCategory} />
          <p>
            <strong>Running Total:</strong> {total} ETB
          </p>
        </div>

        <div>
          <OrderForm total={total} />
        </div>
      </div>
      {filteredDishes.map((item) => {
        return <Dish dish={item} key={item.id} onAddToCart={onAddToCart} />;
      })}
    </section>
  );
}

export default Menu;
