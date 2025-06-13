import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { StoreProduct } from "~/models/printful/store.product.model";

function ProductCard(props: StoreProduct) {
  // Change the images up when they are hovered.
  const [isHovered, setIsHovered] = createSignal(false);

  return (
    <div
      class="flex flex-col lg:w-80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <A href={`/${props.id}`} class="cursor-pointer w-full aspect-square">
        <img
          src={isHovered() ? props.thumbnail_url : props.thumbnail_url}
          alt={isHovered() ? "Hovered image" : "Default image"}
          class="object-cover"
        />
      </A>
      <p class="my-4 w-full flex justify-between">
        <span>{props.name}</span>
        <span class="text-gray-400">10.99</span>
      </p>
    </div>
  );
}

export default ProductCard;
