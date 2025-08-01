import { createStore } from "solid-js/store";

const [store, setStore] = createStore<{
  shoppingCart: any[];
  isCartOpen: boolean;
  checkoutUrl: string;
}>({
  shoppingCart: [],
  isCartOpen: false,
  checkoutUrl: "",
});

export { store, setStore };
