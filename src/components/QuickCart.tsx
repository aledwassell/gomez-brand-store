import { createEffect, createSignal, Show, onMount, For } from "solid-js";

import { ShoppingCart, SquarePlus, SquareMinus } from "lucide-solid";
import { setStore, store } from "../store/store";
import { createCheckoutSession } from "~/lib/stripe-store";

function QuickCart() {
  let triggerRef: HTMLButtonElement | undefined;
  let quickCartRef: HTMLDivElement | undefined;

  const [cartPosition, setCartPosition] = createSignal({ top: 0, left: 0 });
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const items = () => store.shoppingCart;

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

  const handleIncrementCartItemCount = (itemIndex: number) => {
    setStore("shoppingCart", (items) =>
      items.map((item, index) => {
        if (index === itemIndex && item.amount < 5) {
          return { ...item, amount: item.amount + 1 };
        }

        return item;
      })
    );
  };

  const handleDecrementCartItemCount = (itemIndex: number) => {
    const item = store.shoppingCart.find((_, index) => index === itemIndex);

    if (item!.amount <= 1) {
      return setStore("shoppingCart", (items) =>
        items.filter((_, index) => index !== itemIndex)
      );
    }

    setStore("shoppingCart", (items) =>
      items.map((item, index) => {
        if (index !== itemIndex) return item;
        return { ...item, amount: item.amount - 1 };
      })
    );
  };

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setStore("isCartOpen", !store.isCartOpen)}
        class="ml-auto h-10 w-10 flex items-center justify-center text-3xl cursor-pointer relative"
      >
        <ShoppingCart class="z-10" />
        <Show when={items().length}>
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
              ✕
            </button>
          </div>

          <div class="flex-1 overflow-y-auto">
            {items().length === 0 ? (
              <p class="text-gray-500 text-center py-4">Your cart is empty</p>
            ) : (
              <ul class="space-y-2 text-gray-500">
                <For each={store.shoppingCart}>
                  {(item, itemIndex) => (
                    <li class="flex items-center p-2 border-b gap-1">
                      <span class="mr-auto">{item.name}</span>
                      <span class="mr-2">
                        ${Math.floor(item.price * item.amount * 100) / 100}
                      </span>
                      <button
                        class="cursor-pointer"
                        onClick={() =>
                          handleDecrementCartItemCount(itemIndex())
                        }
                      >
                        <SquareMinus />
                      </button>
                      <span class="w-4">{item && item.amount}</span>
                      <button
                        class="cursor-pointer"
                        onClick={() =>
                          handleIncrementCartItemCount(itemIndex())
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

          <div class="mt-4 pt-4 border-t">
            <button
              onClick={() => {
                setLoading(true);
                const cartItems = items().map((item) => ({
                  name: item.name,
                  image: item.thumbnail_url,
                  price: item.price,
                  quantity: item.amount,
                }));
                createCheckoutSession(cartItems)
                    .then(data => {
                        setLoading(false);
                        window.location.href = data.url;
                    })
                  .catch((error) => setError(error));
              }}
              disabled={loading() || !items().length}
              class="btn"
            >
              {loading() ? "Redirecting..." : "Checkout"}
            </button>
            {error() && <div class="error">{error()}</div>}
          </div>
        </div>
      </Show>
    </>
  );
}

export default QuickCart;
