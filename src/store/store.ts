import { createStore } from "solid-js/store";
import { BaseCartLine } from "~/models/Cart.model";

const [store, setStore] = createStore<{
    cart: BaseCartLine[];
    isCartOpen: boolean;
    checkoutUrl: string;
    cartError: string;
}>({
    cart: [],
    isCartOpen: false,
    checkoutUrl: "",
    cartError: "",
});

export { store, setStore };
