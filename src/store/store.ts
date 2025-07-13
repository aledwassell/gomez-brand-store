import { createStore } from "solid-js/store";

const [store, setStore] = createStore<{
  shoppingCart: any[];
  isCartOpen: boolean;
}>({
  shoppingCart: [],
  isCartOpen: false,
});

export { store, setStore };
