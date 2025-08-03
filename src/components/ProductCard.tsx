import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { formatCurrency } from "~/util/format-currency.util";
import { ProductListItem } from "~/models/product-list-item.model";

function ProductCard(props: ProductListItem) {
  // Change the images up when they are hovered.
  const [isHovered, setIsHovered] = createSignal(false);

  return (
    <div
      class="flex flex-col lg:w-80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <A href={`/${props.handle}`} class="cursor-pointer w-full aspect-square">
        <img
          src={props.featuredImage?.url}
          alt={props.featuredImage?.altText}
          class="object-cover"
        />
      </A>
      <p class="my-4 w-full flex justify-between">
        <span>{props.title}</span>
        <span class="text-gray-400">
          {formatCurrency(
            props.priceRange.minVariantPrice.amount,
            props.priceRange.minVariantPrice.currencyCode
          )}
        </span>
      </p>
    </div>
  );
}

export default ProductCard;
