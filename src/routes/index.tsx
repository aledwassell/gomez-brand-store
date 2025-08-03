import { ErrorBoundary, For, Show } from "solid-js";
import { Title } from "@solidjs/meta";

import ProductCard from "~/components/ProductCard";
import { createAsync } from "@solidjs/router";
import { appTitle } from "~/constants/app-title";
import { getProducts } from "~/lib/shopify-store";
import { ProductListItem } from "~/models/product-list-item.model";

export default function Home() {
  const products = createAsync<ProductListItem[]>(
    () => getProducts(import.meta.env.DEV),
  );

  return (
    <>
      <Title>{appTitle}</Title>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        <ErrorBoundary fallback={(err) => <div>Error: {err.message}</div>}>
          <Show when={products()} fallback={<div>Loading...</div>}>
            <For each={products()}>
              {(product) => <ProductCard {...product} />}
            </For>
          </Show>
        </ErrorBoundary>
      </div>
    </>
  );
}
