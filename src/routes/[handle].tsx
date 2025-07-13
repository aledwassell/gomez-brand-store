import { ErrorBoundary, Show, For, createSignal } from "solid-js";
import { createAsync, useNavigate, useParams } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import { Product } from "~/models/product.model";
import { setStore } from "../store/store";
import { MoveLeft } from "lucide-solid";
import { getPageTitle } from "~/constants/app-title";
import { getProduct } from "~/lib/shopify-store";
import { formatCurrency } from "~/util/format-currency.util";

export default function ProductPage() {
  const navigate = useNavigate();
  const params = useParams();
  const product = createAsync<Product | null>(() =>
    getProduct(params.handle, import.meta.env.DEV)
  );
  const [selectedImageIndex, setSelectedImageIndex] = createSignal(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = createSignal<number | null>(
    null
  );

  const addToCart = () => {
    // const productData = product()?.result?.sync_product;
    // if (!productData) return;

    // const existingItemIndex = store.shoppingCart.findIndex(
    //   (item) => item.id === productData.id
    // );

    // if (existingItemIndex !== -1) {
    //   setStore(
    //     "shoppingCart",
    //     existingItemIndex,
    //     "amount",
    //     (amount) => amount + 1
    //   );
    // } else {
    //   setStore("shoppingCart", (items) => [
    //     ...items,
    //     {
    //       id: productData.id,
    //       external_id: productData.external_id,
    //       name: productData.name,
    //       price: 20.99,
    //       amount: 1,
    //       thumbnail_url: productData.thumbnail_url,
    //       variants: productData.variants || 1,
    //       synced: productData.synced || 1,
    //       is_ignored: false,
    //     },
    //   ]);
    // }

    setStore("isCartOpen", true);
  };

  //   const getProductImages = () => {
  //     const productData = product()?.result?.sync_product;
  //     if (!productData) return [];

  //     const images = product()?.result.sync_variants.map(
  //       (variant) => variant.product.image
  //     );

  //     return [productData.thumbnail_url, images![1], images![12]];
  //   };

  return (
    <div>
      <Show when={product()}>
        <Title>{getPageTitle(product()?.title)}</Title>
      </Show>
      <button class="cursor-pointer mb-6" onClick={() => navigate(-1)}>
        <MoveLeft />
      </button>
      <ErrorBoundary fallback={(err) => <div>Error: {err.message}</div>}>
        <Show
          when={product()}
          fallback={
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-5">
              {/* Loading skeleton */}
              <div class="aspect-square col-span-3 bg-gray-200 animate-pulse rounded" />
              <div class="space-y-4 col-span-2">
                <div class="h-12 bg-gray-200 animate-pulse rounded" />
                <div class="h-6 w-20 bg-gray-200 animate-pulse rounded" />
                <div class="h-10 bg-gray-200 animate-pulse rounded" />
                <div class="h-8 w-24 bg-gray-200 animate-pulse rounded" />
              </div>
              <div class="aspect-square col-span-1 bg-gray-200 animate-pulse rounded" />
              <div class="aspect-square col-span-1 bg-gray-200 animate-pulse rounded" />
              <div class="aspect-square col-span-1 bg-gray-200 animate-pulse rounded" />
            </div>
          }
        >
          <div class="grid grid-cols-3 gap-6 lg:grid-cols-5">
            <div class="aspect-square col-span-3 lg:col-span-3 relative overflow-hidden">
              <img
                src={product()?.featuredImage.url}
                alt={product()?.featuredImage.altText || "Product image"}
                class="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            <div class="space-y-5 col-span-3 lg:col-span-2">
              <h1 class="text-4xl font-bold">{product()?.title}</h1>
              <p class="font-medium text-xl">
                {formatCurrency(
                  product()?.priceRange.maxVariantPrice.amount ?? "",
                  product()?.priceRange.maxVariantPrice.currencyCode ?? ""
                )}
              </p>
              <div class="flex space-x-5">
                <Show when={product()?.variantsCount.count! > 1}>
                  <div class="border-dashed border-3 border-white px-5 py-2 w-fit space-x-2">
                    <span class="mr-2">size</span>
                    <For each={product()?.variants?.nodes}>
                      {(size, index) => (
                        <button
                          class="font-bold min-w-10 min-h-10"
                          disabled={!size.availableForSale}
                          classList={{
                            "text-gray-500": !size.availableForSale,
                            "text-emerald-500 underline":
                              selectedSizeIndex() === index(),
                            "text-white":
                              selectedSizeIndex() !== index() &&
                              size.availableForSale,
                            "line-through": !size.availableForSale,
                            "cursor-pointer": size.availableForSale,
                          }}
                          onClick={() => setSelectedSizeIndex(index())}
                        >
                          {size.title}
                        </button>
                      )}
                    </For>
                  </div>
                </Show>
                <button class="btn-underline btn-auto">size guide</button>
              </div>
              <button
                class="btn-hollow"
                disabled={!product()?.availableForSale}
                onClick={addToCart}
              >
                Add to cart
              </button>
              <div innerHTML={product()?.descriptionHtml} />
            </div>

            <For each={product()?.images?.nodes}>
              {(image, index) => (
                <div
                  class="aspect-square col-span-1 cursor-pointer overflow-hidden border-2 transition-all duration-200"
                  classList={{
                    "border-3": selectedImageIndex() === index(),
                    "border-gray-200 hover:border-gray-400":
                      selectedImageIndex() !== index(),
                  }}
                  onClick={() => setSelectedImageIndex(index())}
                >
                  <img
                    src={image.url}
                    alt={image.altText}
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
            </For>
          </div>
        </Show>
      </ErrorBoundary>
    </div>
  );
}
