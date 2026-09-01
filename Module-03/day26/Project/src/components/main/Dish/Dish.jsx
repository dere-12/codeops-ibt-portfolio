import "./Dish.css";

const menu = [
  { id: 1, name: "Doro Wat", price: 240 },
  { id: 2, name: "Shiro", price: 120 },
  { id: 3, name: "Kitfo", price: 320 },
  { id: 4, name: "Tibs", price: 280 },
  { id: 5, name: "Injera Firfir", price: 100 },
  { id: 6, name: "Beyaynetu", price: 150 },
];

function Dish() {
  return (
    <section>
      {menu.map((dish) => {
        return (
          <div className="card">
            <h3>{dish.name}</h3>
            <p>{dish.price}</p>
          </div>
        );
      })}
    </section>
  );
}

export default Dish;
