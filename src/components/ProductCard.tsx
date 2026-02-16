import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { formatCurrency } from "~/util/format-currency.util";
import { ProductListItem } from "~/models/product-list-item.model";

function ProductCard(props: ProductListItem) {
    // Change the images up when they are hovered.
    const [isHovered, setIsHovered] = createSignal(false);

    return (
        <div
            class="flex flex-col lg:w-80 border border-amber-500 bg-midnight-950 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <A href={`/${props.handle}`} class="cursor-pointer w-full aspect-square">
                <img src={props.featuredImage?.url} alt={props.featuredImage?.altText} class="object-cover" />
            </A>
            <div class="px-2 py-4 flex justify-between items-center">
                <h3 class="font-bold">{props.title}</h3>
                <p class="text-amber-500">
                    {formatCurrency(
                        props.priceRange.minVariantPrice.amount,
                        props.priceRange.minVariantPrice.currencyCode
                    )}
                </p>
            </div>
        </div>
    );
}

export default ProductCard;
