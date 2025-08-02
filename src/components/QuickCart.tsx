import { createEffect, createSignal, Show, onMount, For, ErrorBoundary } from "solid-js";

import { ShoppingCart, SquarePlus, SquareMinus, X } from "lucide-solid";
import { setStore, store } from "../store/store";
import { addToCartApi, getCartApi, updateCartApi } from "~/lib/cart-api";
import { shopifyCartIdLocalStorageKey } from "~/constants/shopify-cart-id";
import { CartLineInput, CartLineUpdateInput } from "~/models/Cart.model";
import { formatCurrency } from "~/util/format-currency.util";

function QuickCart() {
    let triggerRef: HTMLButtonElement | undefined;
    let quickCartRef: HTMLDivElement | undefined;

    const [cartPosition, setCartPosition] = createSignal({ top: 0, left: 0 });
    const [error, setError] = createSignal<string | null>(null);

    onMount(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            // Don't close if clicking on buttons or their children
            if (target.closest("button")) return;

            if (
                store.isCartOpen &&
                !quickCartRef?.contains(event.target as Node) &&
                !triggerRef?.contains(event.target as Node)
            ) {
                setStore("isCartOpen", false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        getCartApi(localStorage.getItem(shopifyCartIdLocalStorageKey))
            .then(response => {
                if (response.error) {
                    setError(response.error);
                } else {
                    setStore("checkoutUrl", response.cart?.checkoutUrl ?? "");
                    setStore("cart", response.cart?.lines?.nodes ?? []);
                }
            })
            .catch(error => setError(error.message || "Failed to load cart"));

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    createEffect(() => {
        if (store.isCartOpen && triggerRef && quickCartRef) {
            const buttonRect = triggerRef.getBoundingClientRect();
            setCartPosition({
                top: buttonRect.bottom,
                left: buttonRect.left - quickCartRef.offsetWidth,
            });
        }
    });

    const handleAddCartItem = async (cartLineInput: CartLineInput) => {
        const cartId = localStorage.getItem(shopifyCartIdLocalStorageKey);
        const response = await addToCartApi([cartLineInput], cartId);
        
        if (response.error) {
            setError(response.error);
        } else if (response.cart) {
            if (response.cart.id && response.cart.id !== cartId) {
                localStorage.setItem(shopifyCartIdLocalStorageKey, response.cart.id);
            }
            setStore("cart", response.cart.lines?.nodes ?? []);
            setStore("checkoutUrl", response.cart.checkoutUrl ?? "");
            setError(null);
        }
    };

    const handleRemoveCartItem = async (cartLineUpdateInput: CartLineUpdateInput) => {
        const cartId = localStorage.getItem(shopifyCartIdLocalStorageKey);
        const response = await updateCartApi(
            [{ ...cartLineUpdateInput, quantity: cartLineUpdateInput.quantity - 1 }],
            cartId
        );
        
        if (response.error) {
            setError(response.error);
        } else if (response.cart) {
            setStore("cart", response.cart.lines?.nodes ?? []);
            setStore("checkoutUrl", response.cart.checkoutUrl ?? "");
            setError(null);
        }
    };

    return (
        <>
            <button
                ref={triggerRef}
                onClick={() => setStore("isCartOpen", !store.isCartOpen)}
                class="ml-auto h-10 w-10 flex items-center justify-center text-3xl cursor-pointer relative"
            >
                <ShoppingCart class="z-10" />
                <Show when={store.cart?.length}>
                    <span class="absolute bg-emerald-500 w-4 h-4 rounded-full top-2 right-2.5"></span>
                </Show>
            </button>

            <Show when={store.isCartOpen}>
                <div
                    ref={quickCartRef}
                    class="fixed bg-white p-4 w-80 max-h-[80vh] flex flex-col"
                    style={{
                        top: `${cartPosition().top}px`,
                        left: `${cartPosition().left}px`,
                        "z-index": 1000,
                    }}
                >
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold">Quick Cart</h3>
                        <button
                            onClick={() => setStore("isCartOpen", false)}
                            class="text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                            <X />
                        </button>
                    </div>
                    <ErrorBoundary fallback={err => <div>Error: {err.message}</div>}>
                        <div class="flex-1 overflow-y-auto">
                            {store.cart?.length === 0 ? (
                                <p class="text-gray-500 text-center py-4">Your cart is empty</p>
                            ) : (
                                <ul class="space-y-2 text-gray-500">
                                    <For each={store.cart}>
                                        {item => (
                                            <li class="flex items-center p-2 border-b gap-1">
                                                <span class="mr-auto">{item.merchandise.title}</span>
                                                <span class="mr-2">
                                                    {formatCurrency(
                                                        item.cost.totalAmount.amount,
                                                        item.cost.totalAmount.currencyCode
                                                    )}
                                                </span>
                                                <button
                                                    class="cursor-pointer"
                                                    onClick={() =>
                                                        handleRemoveCartItem({
                                                            id: item.id,
                                                            quantity: item.quantity,
                                                        })
                                                    }
                                                >
                                                    <SquareMinus />
                                                </button>
                                                <span class="w-4">{item && item.quantity}</span>
                                                <button
                                                    class="cursor-pointer"
                                                    onClick={() =>
                                                        handleAddCartItem({
                                                            merchandiseId: item.merchandise.id,
                                                            quantity: 1,
                                                        })
                                                    }
                                                >
                                                    <SquarePlus />
                                                </button>
                                            </li>
                                        )}
                                    </For>
                                </ul>
                            )}
                        </div>
                    </ErrorBoundary>

                    <div class="mt-4 pt-4 border-t">
                        <button
                            onClick={() => {
                                window.location.href = store.checkoutUrl;
                            }}
                            disabled={!store.checkoutUrl || !store.cart.length}
                            class="btn"
                        >
                            Checkout
                        </button>
                        {error() && <div class="error">{error()}</div>}
                    </div>
                </div>
            </Show>
        </>
    );
}

export default QuickCart;
