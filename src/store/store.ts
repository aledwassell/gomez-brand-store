import { createStore } from "solid-js/store";
import { Product } from "~/models/Product.model";

const [store, setStore] = createStore<{
  shoppingCart: Product[];
  isCartOpen: boolean;
}>({
  shoppingCart: [],
  isCartOpen: false,
});

export { store, setStore };
