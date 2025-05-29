import { createSignal } from "solid-js";
import ProductCard from "../components/ProductCard";

function Products() {
  const [items, setItems] = createSignal([]);
  setItems([
    {
      id: "t-shirt",
      name: "T-shirt",
      price: 12.95,
      defaultImage: "https://placehold.net/5.png",
      hoverImage: "https://placehold.net/3.png",
    },
    {
      id: "gomez",
      name: "Gomez",
      price: 10,
      defaultImage: "https://placehold.net/4.png",
      hoverImage: "https://placehold.net/10.png",
    },
    {
      id: "gomez-hat",
      name: "Gomez Hat",
      price: 23,
      defaultImage: "https://placehold.net/1.png",
      hoverImage: "https://placehold.net/2.png",
    },
    {
      id: "gomezs-mystical-staff",
      name: "Gomez's Mystical Staff",
      price: 45.99,
      defaultImage: "https://placehold.net/7.png",
      hoverImage: "https://placehold.net/6.png",
    },
  ]);

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
      {items().map((item) => (
        <ProductCard
          id={item.id}
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
