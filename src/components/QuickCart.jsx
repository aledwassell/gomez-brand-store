import { createEffect, createSignal, Show } from "solid-js";

function QuickCart(props) {
  let openButton;
  let quickCart;
  const [isOpen, setIsOpen] = createSignal(false);
  const [items, setItems] = createSignal([]); // You can populate this with actual cart items
  const [cartPosition, setCartPosition] = createSignal({ top: 0, left: 0 }); // You can populate this with actual cart items

  createEffect(() => {
    if (isOpen() && openButton && quickCart) {
      const buttonRect = openButton.getBoundingClientRect();

      setCartPosition({
        top: buttonRect.bottom,
        left: buttonRect.left - quickCart.offsetWidth,
      });
    }
  });

  return (
    <>
      <button
        ref={openButton}
        onClick={() => setIsOpen(!isOpen())}
        class="ml-auto h-10 w-10 rounded-4xl shadow-amber-400 shadow-2xl flex items-center justify-center"
      >
        {props.text}
      </button>

      <Show when={isOpen()}>
        <div
          ref={quickCart}
          class="fixed bg-white rounded-lg p-4 w-80 max-h-[80vh] flex flex-col"
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
              class="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div class="flex-1 overflow-y-auto">
            {items().length === 0 ? (
              <p class="text-gray-500 text-center py-4">Your cart is empty</p>
            ) : (
              <ul class="space-y-2">
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
              class="w-full bg-amber-400 text-white py-2 rounded-lg hover:bg-amber-500 transition-colors"
              onClick={() => {
                console.log(openButton.getBoundingClientRect());
                // Navigate to full cart page
                // window.location.href = "/cart";
              }}
            >
              Go to Cart
            </button>
          </div>
        </div>
      </Show>
    </>
  );
}

export default QuickCart;
