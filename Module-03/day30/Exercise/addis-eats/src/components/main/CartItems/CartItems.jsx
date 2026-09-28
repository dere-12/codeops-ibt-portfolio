import { useContext } from "react";
import { CartContext } from "../../../contexts/CartContextProvider";
import "./CartItems.css";

function CartItems() {
  const { items, dispatch, total } = useContext(CartContext);

  function handleRemove(id) {
    dispatch({ type: "remove", id: id });
  }

  function handleClear() {
    dispatch({ type: "clear" });
  }

  return (
    <div>
      <div>
        {items.length === 0 ? (
          <p className="emptyCart">Your cart is empty.</p>
        ) : (
          items.map((item) => {
            return (
              <div className="cartItem" key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <p>
                    {`${item.quantity} X ${item.price} = ${item.quantity * item.price} ETB`}
                  </p>
                </div>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            );
          })
        )}
      </div>
      <div className="summary">
        <p>Total: {total} ETB.</p>
        <button onClick={handleClear}>Clear Cart</button>
      </div>
    </div>
  );
}

export default CartItems;
