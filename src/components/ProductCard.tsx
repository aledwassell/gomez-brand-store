import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { StoreProduct } from "~/models/printful/store.product.model";

function ProductCard(props: StoreProduct) {
  const [isHovered, setIsHovered] = createSignal(false);

  return (
    <div
      class="flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <A href={`/${props.id}`} class="cursor-pointer">
        <img
          src={isHovered() ? props.thumbnail_url : props.thumbnail_url}
          alt={isHovered() ? "Hovered image" : "Default image"}
          class="lg:w-80 aspect-square"
        />
      </A>
      <p class="my-4 w-full flex justify-between">
        {props.name}
        <span class="text-gray-400">10.99</span>
      </p>
    </div>
  );
}

export default ProductCard;
