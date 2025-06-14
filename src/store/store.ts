import { createStore } from "solid-js/store";
import { Product } from "~/models/Product.model";

const [store, setStore] = createStore<{
  shoppingCart: Product[];
}>({
  shoppingCart: [],
});

export { store, setStore };
