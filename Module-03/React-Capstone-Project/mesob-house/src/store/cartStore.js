import { create } from "zustand";

const useCartStore = create((set) => ({
  items: [],

  addToCart: (dish, quantity = 1) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.dish.id === dish.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.dish.id === dish.id
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                }
              : item,
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            dish,
            quantity,
          },
        ],
      };
    }),

  increaseQuantity: (dishId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.dish.id === dishId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    })),

  decreaseQuantity: (dishId) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.dish.id === dishId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    })),

  removeFromCart: (dishId) =>
    set((state) => ({
      items: state.items.filter((item) => item.dish.id !== dishId),
    })),

  clearCart: () => set({ items: [] }),
}));

export default useCartStore;
