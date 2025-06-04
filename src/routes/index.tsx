import { createSignal } from "solid-js";
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
        {items().map((item) => (
          <ProductCard
            id={item.id}
            name={item.name}
            price={item.price}
            defaultImage={item.defaultImage}
            amount={0}
            hoverImage={item.hoverImage}
          />
        ))}
      </div>
    </>
  );
}
