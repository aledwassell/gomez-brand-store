import { createEffect, createSignal, Show, onCleanup } from "solid-js";
import {
  FaSolidCartShopping,
  FaSolidSquarePlus,
  FaSolidSquareMinus,
} from "solid-icons/fa";

function QuickCart() {
  let triggerRef;
  let quickCartRef;
  const [isOpen, setIsOpen] = createSignal(false);
  const [items, setItems] = createSignal([]);
  const [cartPosition, setCartPosition] = createSignal({ top: 0, left: 0 });

  const handleClickOutside = (event) => {
    if (
      isOpen() &&
      !quickCartRef?.contains(event.target) &&
      !triggerRef?.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  setItems([
    { name: "T-shirt", price: 12.95, amount: 1 },
    { name: "Gomez", price: 10, amount: 1 },
    { name: "Gomez Hat", price: 23, amount: 1 },
    { name: "Zemog Wizard Hat", price: 23, amount: 1 },
  ]);

  createEffect(() => {
    if (isOpen() && triggerRef && quickCartRef) {
      document.addEventListener("mousedown", handleClickOutside);
      const buttonRect = triggerRef.getBoundingClientRect();

      setCartPosition({
        top: buttonRect.bottom,
        left: buttonRect.left - quickCartRef.offsetWidth,
      });
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  });

  onCleanup(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen())}
        class="ml-auto h-10 w-10 flex items-center justify-center text-3xl cursor-pointer"
      >
        <FaSolidCartShopping />
      </button>

      <Show when={isOpen()}>
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
              onClick={() => setIsOpen(false)}
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
                {items().map((item, itemIndex) => (
                  <li class="flex items-center p-2 border-b gap-1">
                    <span class="mr-auto">{item.name}</span>
                    <span class="mr-2">
                      ${Math.floor(item.price * item.amount * 100) / 100}
                    </span>
                    <button
                      onClick={() => {
                        const item = items().find(
                          (_, index) => index === itemIndex
                        );
                        if (item.amount <= 1) {
                          return setItems((items) =>
                            items.filter((_, index) => index !== itemIndex)
                          );
                        }

                        setItems(
                          items().map((thing, index) => {
                            if (index !== itemIndex) return thing;
                            return { ...thing, amount: thing.amount - 1 };
                          })
                        );
                      }}
                    >
                      <FaSolidSquareMinus />
                    </button>
                    <span class="w-4">{item && item.amount}</span>
                    <button
                      onClick={() =>
                        setItems(
                          items().map((thing, index) => {
                            if (index === itemIndex && thing.amount < 5) {
                              return { ...thing, amount: thing.amount + 1 };
                            }

                            return thing;
                          })
                        )
                      }
                    >
                      <FaSolidSquarePlus />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div class="mt-4 pt-4 border-t">
            <button
              class="w-full btn"
              onClick={() => {
                console.log("Navigate to the cart page");
                // Navigate to full cart page
                // window.location.href = "/cart";
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </Show>
    </>
  );
}

export default QuickCart;
