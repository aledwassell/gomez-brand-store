import { createEffect, createSignal, Show, onCleanup } from "solid-js";
import { FaSolidCartShopping } from "solid-icons/fa";

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
    { name: "T-shirt", price: 12.95 },
    { name: "Gomez", price: 10 },
    { name: "Gomez Hat", price: 23 },
    { name: "Zemog Wizard Hat", price: 23 },
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
                {items().map((item) => (
                  <li class="flex justify-between items-center p-2 border-b">
                    <span>{item.name}</span>
                    <span>${item.price}</span>
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
