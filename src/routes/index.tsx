import { ErrorBoundary, For, Show } from "solid-js";
import { Title } from "@solidjs/meta";

import ProductCard from "~/components/ProductCard";
import { createAsync } from "@solidjs/router";
import { getProducts } from "~/lib/printful-store";
import { StoreProducts } from "~/models/printful/store.products.model";

export default function Home() {
  const products = createAsync<StoreProducts>(() => getProducts());

  return (
    <>
      <Title>I am Gomez</Title>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        <ErrorBoundary fallback={(err) => <div>Error: {err.message}</div>}>
          <Show when={products()} fallback={<div>Loading...</div>}>
            <For each={products()?.result}>
              {(product) => <ProductCard {...product} />}
            </For>
          </Show>
        </ErrorBoundary>
      </div>
    </>
  );
}
