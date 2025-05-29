import { createSignal } from "solid-js";
import Product from "../components/Product";

function Products() {
  const [items, setItems] = createSignal([]);
  setItems([
    {
      name: "T-shirt",
      price: 12.95,
      defaultImage: "https://placehold.net/5.png",
      hoverImage: "https://placehold.net/3.png",
    },
    {
      name: "Gomez",
      price: 10,
      defaultImage: "https://placehold.net/4.png",
      hoverImage: "https://placehold.net/10.png",
    },
    {
      name: "Gomez Hat",
      price: 23,
      defaultImage: "https://placehold.net/1.png",
      hoverImage: "https://placehold.net/2.png",
    },
    {
      name: "Gomez's Mystical Staff",
      price: 45.99,
      defaultImage: "https://placehold.net/7.png",
      hoverImage: "https://placehold.net/6.png",
    },
  ]);

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
      {items().map((item) => (
        <Product
          name={item.name}
          price={item.price}
          defaultImage={item.defaultImage}
          hoverImage={item.hoverImage}
        />
      ))}
    </div>
  );
}

export default Products;
