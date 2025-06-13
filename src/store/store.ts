import { createStore } from "solid-js/store";

  const [store, setStore] = createStore({
    shoppingCart: [
      {
        id: 1,
        external_id: "prod_123",
        name: "Classic White T-Shirt",
        price: 19.99,
        amount: 1,
        thumbnail_url:
          "https://files.cdn.printful.com/files/d71/d71947685992e7805be09f251dd81f8b_preview.png",
        variants: 1,
        synced: 1,
        is_ignored: false,
      },
    ],
  });

export { store, setStore };
