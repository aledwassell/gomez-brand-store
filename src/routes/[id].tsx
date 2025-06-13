import { ErrorBoundary, Show } from "solid-js";
import { createAsync, useParams } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import { StoreSingleProduct } from "~/models/printful/store.single.product.model";
import { getProduct } from "~/lib/printful-store";
import { setStore } from "../store/store";

export default function Product() {
  const params = useParams();
  const product = createAsync<StoreSingleProduct>(() => getProduct(params.id));

  const pageTitle = () => {
    if (!product()) {
      return "Loading...";
    }

    return product()?.result?.sync_product?.name || "i am gomez";
  };

  return (
    <>
      <Title>{pageTitle()}</Title>
      <ErrorBoundary fallback={(err) => <div>Error: {err.message}</div>}>
        <Show when={product} fallback={<p>Loading...</p>}>
          <div class="flex flex-col lg:flex-row gap-5 lg:gap-10">
            <img
              src={product()?.result.sync_product.thumbnail_url}
              alt={product()?.result?.sync_product?.name}
              class="lg:w-80 aspect-square"
            />
            <div class="space-y-4 h-full">
              <h1 class="text-4xl font-bold">
                {product()?.result?.sync_product?.name}
              </h1>

              <p class="font-medium">£20.99</p>

              <button
                class="btn btn-white"
                onClick={() =>
                  setStore("shoppingCart", (items) => {
                    const productData = product()?.result.sync_product;
                    if (!productData) return items;

                    return [
                      ...items,
                      {
                        ...productData,
                        price: 10.99, // Default price
                        amount: 1,
                      },
                    ];
                  })
                }
              >
                Add to cart
              </button>
              <button class="btn-underline mt-auto">Size Guide</button>
            </div>
          </div>
        </Show>
      </ErrorBoundary>
    </>
  );
}
