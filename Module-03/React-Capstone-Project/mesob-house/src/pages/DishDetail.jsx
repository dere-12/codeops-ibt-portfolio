import { useParams } from "react-router-dom";

function DishDetail() {
  const { slug } = useParams();

  return (
    <main>
      <h1>Dish Detail</h1>
      <p>Selected dish: {slug}</p>
      <p>This {slug}'s detail page.</p>
    </main>
  );
}

export default DishDetail;
