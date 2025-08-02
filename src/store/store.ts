import { createStore } from "solid-js/store";
import { BaseCartLine } from "~/models/Cart.model";

const [store, setStore] = createStore<{
    cart: BaseCartLine[];
    isCartOpen: boolean;
    checkoutUrl: string;
}>({
    cart: [],
    isCartOpen: false,
    checkoutUrl: "",
});

export { store, setStore };
