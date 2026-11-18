import type { Dish } from './dish.types';

export const DISHES_SEED: Dish[] = [
  { id: 1, restaurantId: 1, name: 'Doro Wat', priceSantim: 32000 },
  { id: 2, restaurantId: 1, name: 'Kitfo', priceSantim: 52000 },
  { id: 3, restaurantId: 2, name: 'Shiro', priceSantim: 18000 },
  { id: 4, restaurantId: 2, name: 'Siga Wat', priceSantim: 45000 },
  { id: 5, restaurantId: 3, name: 'Beg Alicha', priceSantim: 28000 },
  { id: 6, restaurantId: 3, name: 'Misir Wat', priceSantim: 22000 },
  { id: 7, restaurantId: 4, name: 'Tibs', priceSantim: 38000 },
  { id: 8, restaurantId: 4, name: 'Gomen', priceSantim: 16000 },
];
