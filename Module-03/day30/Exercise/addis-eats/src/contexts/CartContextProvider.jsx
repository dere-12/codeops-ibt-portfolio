import { createContext, useMemo, useReducer } from "react";
import { cartReduce } from "../reducers/cartReducer";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReduce, { items: [] });

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const value = useMemo(() => {
    return { items: state.items, dispatch, total };
  }, [state.items, total]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
