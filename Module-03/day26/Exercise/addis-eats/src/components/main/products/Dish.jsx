import "./Dish.css";

function Dish({dish}) {

  return (
    <div className="dish">
      <div className="img-cont">
        <img src={dish.image} alt={dish.name}/>
      </div>
      <p>{dish.name}</p>
      <p>{dish.price}</p>
    </div>
  );
}

export default Dish;
