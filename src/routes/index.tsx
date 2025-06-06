import { createResource, createSignal, For, Show } from "solid-js";
import { Title } from "@solidjs/meta";

import ProductCard from "~/components/ProductCard";
import { Product } from "~/models/Product.model";
import { products } from "~/constants/Products";

const fetchProducts = async (): Promise<Product[]> => {
  const apiOrigin = process.env.API_ORIGIN || "http://localhost:3000";

  console.log(process.env);
  console.log(apiOrigin);

  try {
    // const response = await fetch(`${apiOrigin}/api/products`);

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // const products = await response.json();

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default function Home() {
  const [products] = createResource(fetchProducts);

  const logEnv = () => {
    const apiOrigin = process.env.API_ORIGIN || "http://localhost:3000";
    console.log(process.env);
    console.log(import.meta.env);
    console.log(apiOrigin);
  };

  return (
    <>
      <Title>I am Gomez</Title>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        <button onClick={logEnv}>log env</button>
        <For each={products()}>{(item) => <ProductCard {...item} />}</For>

        <Show when={products.error}>
          <div>Error: {products.error.message}</div>
        </Show>
      </div>
    </>
  );
}
