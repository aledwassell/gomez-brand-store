import { createResource, For, Show } from "solid-js";
import { Title } from "@solidjs/meta";

import ProductCard from "~/components/ProductCard";
import { Product } from "~/models/Product.model";

const fetchProducts = async (): Promise<Product[]> => {
  "use server";
  const apiOrigin = import.meta.env.PROD
    ? "https://gomez.aledwassell.workers.dev"
    : "http://localhost:3000";

  try {
    const endpoint = `https://gomez.aledwassell.workers.dev/api/products`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default function Home() {
  const [products] = createResource(fetchProducts);

  return (
    <>
      <Title>I am Gomez</Title>
      <button
        class="bg-amber-400 p-6"
        onClick={() => {
          console.log(import.meta.env);
        }}
      >
        thing
      </button>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        <For each={products()}>{(item) => <ProductCard {...item} />}</For>

        <Show when={products.error}>
          <div>Error: {products.error.message}</div>
        </Show>
      </div>
    </>
  );
}
