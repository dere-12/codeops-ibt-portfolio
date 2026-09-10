export function cartReduce(state, action) {
  switch (action.type) {
    case "add":
      const exisingItem = state.items.find(
        (item) => item.id === action.dish.id,
      );
      if (exisingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.dish.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.dish, quantity: 1 }],
      };
    case "remove":
      return {
        ...state,
        items: state.items.filter((dish) => dish.id !== action.id),
      };
    case "clear":
      return { items: [] };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}
