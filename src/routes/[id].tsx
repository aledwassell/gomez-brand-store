import { ErrorBoundary, Show, For, createSignal } from "solid-js";
import { createAsync, useNavigate, useParams } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import { StoreSingleProduct } from "~/models/printful/store.single.product.model";
import { getProduct } from "~/lib/printful-store";
import { setStore, store } from "../store/store";
import { MoveLeft } from "lucide-solid";

export default function Product() {
  const navigate = useNavigate();
  const params = useParams();
  const product = createAsync<StoreSingleProduct>(() => getProduct(params.id));
  const [selectedImageIndex, setSelectedImageIndex] = createSignal(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = createSignal(2);

  const addToCart = () => {
    const productData = product()?.result?.sync_product;
    if (!productData) return;

    const existingItemIndex = store.shoppingCart.findIndex(
      (item) => item.id === productData.id
    );

    if (existingItemIndex !== -1) {
      setStore(
        "shoppingCart",
        existingItemIndex,
        "amount",
        (amount) => amount + 1
      );
    } else {
      setStore("shoppingCart", (items) => [
        ...items,
        {
          id: productData.id,
          external_id: productData.external_id,
          name: productData.name,
          price: 20.99,
          amount: 1,
          thumbnail_url: productData.thumbnail_url,
          variants: productData.variants || 1,
          synced: productData.synced || 1,
          is_ignored: false,
        },
      ]);
    }
  };

  const sizes = () => ["XS", "S", "M", "L", "XL", "2XL"];

  const getProductImages = () => {
    const productData = product()?.result?.sync_product;
    if (!productData) return [];

    const images = [
      "https://placehold.net/3.png",
      "https://placehold.net/5.png",
    ];

    if (productData.thumbnail_url) {
      images.unshift(productData.thumbnail_url);
    }

    return images.slice(0, 3); // Limit to 3 images max
  };

  return (
    <div>
      <Title>{product()?.result?.sync_product?.name || "...loading"}</Title>
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
                src={
                  getProductImages()[selectedImageIndex()] ||
                  product()?.result?.sync_product?.thumbnail_url
                }
                alt={product()?.result?.sync_product?.name || "Product image"}
                class="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            <div class="space-y-5 col-span-3 lg:col-span-2">
              <h1 class="text-4xl font-bold">
                {product()?.result?.sync_product?.name}
              </h1>

              <p class="font-medium text-xl">£20.99</p>

              <div class="flex space-x-5">
                <div class="border-dashed border-3 border-white px-5 py-2 w-fit">
                  <span class="mr-2">size</span>
                  <For each={sizes()}>
                    {(size, index) => (
                      <button
                        class="font-bold w-10 h-10 cursor-pointer"
                        classList={{
                          "text-emerald-500 underline":
                            selectedSizeIndex() === index(),
                          "text-white": selectedSizeIndex() !== index(),
                        }}
                        onClick={() => setSelectedSizeIndex(index())}
                      >
                        {size}
                      </button>
                    )}
                  </For>
                </div>
                <button class="btn-underline btn-auto">size guide</button>
              </div>

              <button
                class="btn-hollow"
                disabled={!product()?.result?.sync_product}
                onClick={addToCart}
              >
                Add to cart
              </button>
            </div>

            <For each={getProductImages().slice(0, 3)}>
              {(imageUrl, index) => (
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
                    src={imageUrl}
                    alt={`${product()?.result?.sync_product?.name} view ${
                      index() + 1
                    }`}
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
