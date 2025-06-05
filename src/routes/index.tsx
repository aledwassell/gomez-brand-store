import { createSignal, For } from "solid-js";
import { Title } from "@solidjs/meta";

import ProductCard from "~/components/ProductCard";
import { Product } from "~/models/Product.model";
import { products } from "~/constants/Products";

export default function Home() {
  const [items, setItems] = createSignal<Product[]>([]);
  setItems(products);

  return (
    <>
      <Title>I am Gomez</Title>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        <For each={items()}>{(item) => <ProductCard {...item} />}</For>
      </div>
    </>
  );
}
