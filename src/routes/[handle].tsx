import { ErrorBoundary, Show, For, createSignal } from "solid-js";
import { createAsync, useNavigate, useParams } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import { Product, ProductImage } from "~/models/product.model";
import { setStore } from "../store/store";
import { MoveLeft } from "lucide-solid";
import { getPageTitle } from "~/constants/app-title";
import { addToCart, getProduct } from "~/lib/shopify-store";
import { formatCurrency } from "~/util/format-currency.util";
import { Portal } from "solid-js/web";
import Modal from "~/components/Modal";
import { CartLineInput } from "~/models/Cart.model";
import { shopifyCartIdLocalStorageKey } from "~/constants/shopify-cart-id";

export default function ProductPage() {
    let sizeGuideButtonRef: HTMLButtonElement | undefined;

    const navigate = useNavigate();
    const params = useParams();
    const product = createAsync<Product | null>(() => getProduct(params.handle, import.meta.env.DEV));
    const [selectedImage, setSelectedImage] = createSignal<ProductImage | undefined>(undefined);
    const [selectedVariantId, setSelectedVariantId] = createSignal<string | null>(null);
    const [showSizeGuide, setShowSizeGuide] = createSignal(false);

    const addItemToCart = () => {
        if (!selectedVariantId()) {
            throw "No selected variant";
        }
        const item: CartLineInput = {
            quantity: 1,
            merchandiseId: selectedVariantId() ?? "",
        };

        addToCart([item], localStorage.getItem(shopifyCartIdLocalStorageKey)).then(cart => {
            const { id, checkoutUrl } = cart!;

            if (id) {
                localStorage.setItem(shopifyCartIdLocalStorageKey, id);
            }

            if (checkoutUrl) {
                setStore("checkoutUrl", checkoutUrl);
            }
        });

        setStore("isCartOpen", true);
    };

    const price = () => {
        if (selectedVariantId()) {
            return product()?.variants.nodes.find(variant => variant.id === selectedVariantId())?.price.amount;
        }

        return product()?.priceRange.maxVariantPrice.amount;
    };

    const image = (): ProductImage | undefined => {
        if (selectedImage()) {
            return selectedImage();
        }

        return product()?.featuredImage;
    };

    return (
        <div>
            <Show when={product()}>
                <Title>{getPageTitle(product()?.title)}</Title>
            </Show>

            <button class="cursor-pointer mb-6" onClick={() => navigate(-1)}>
                <MoveLeft />
            </button>

            <ErrorBoundary fallback={err => <div>Error: {err.message}</div>}>
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
                            <Show when={image()} fallback={<div>No image could be found</div>}>
                                <img
                                    src={image()?.url}
                                    alt={image()?.altText || "Product image"}
                                    class="w-full h-full object-cover"
                                    loading="eager"
                                />
                            </Show>
                        </div>

                        <div class="space-y-5 col-span-3 lg:col-span-2">
                            <h1 class="text-4xl font-bold">{product()?.title}</h1>
                            <p class="font-medium text-xl">
                                {formatCurrency(
                                    price() ?? "",
                                    product()?.priceRange.maxVariantPrice.currencyCode ?? ""
                                )}
                            </p>
                            <div class="flex space-x-5">
                                <Show when={product()?.variantsCount.count! > 1}>
                                    <div class="border-dashed border-3 border-white px-5 py-2 w-fit space-x-2">
                                        <span class="mr-2">size</span>
                                        <For each={product()?.variants?.nodes}>
                                            {variant => (
                                                <button
                                                    class="font-bold min-w-10 min-h-10"
                                                    disabled={!variant.availableForSale}
                                                    classList={{
                                                        "text-gray-500": !variant.availableForSale,
                                                        "text-emerald-500 underline":
                                                            selectedVariantId() === variant.id,
                                                        "text-white":
                                                            selectedVariantId() !== variant.id &&
                                                            variant.availableForSale,
                                                        "line-through": !variant.availableForSale,
                                                        "cursor-pointer": variant.availableForSale,
                                                    }}
                                                    onClick={() => {
                                                        setSelectedVariantId(variant.id);
                                                        setSelectedImage(variant.image);
                                                    }}
                                                >
                                                    {variant.title}
                                                </button>
                                            )}
                                        </For>
                                    </div>
                                </Show>
                                <Show when={product()?.sizeGuide}>
                                    <button
                                        ref={sizeGuideButtonRef}
                                        class="btn-underline btn-auto min-w-fit"
                                        onClick={() => setShowSizeGuide(true)}
                                    >
                                        size guide
                                    </button>
                                    <Portal mount={sizeGuideButtonRef}>
                                        <Show when={showSizeGuide()}>
                                            <Modal title="Size Guide" onClose={() => setShowSizeGuide(false)}>
                                                <div innerHTML={product()?.sizeGuide?.value} />
                                            </Modal>
                                        </Show>
                                    </Portal>
                                </Show>
                            </div>
                            <button
                                class="btn btn-hollow"
                                disabled={!selectedVariantId() || !product()?.availableForSale}
                                onClick={addItemToCart}
                            >
                                Add to cart {product()?.availableForSale}
                            </button>
                            <div innerHTML={product()?.descriptionHtml} />
                        </div>

                        <For each={product()?.images?.nodes}>
                            {image => (
                                <div
                                    class="aspect-square col-span-1 cursor-pointer overflow-hidden border-2 transition-all duration-200"
                                    classList={{
                                        "border-3": selectedImage()?.url === image.url,
                                        "border-gray-200 hover:border-gray-400": selectedImage()?.url !== image.url,
                                    }}
                                    onClick={() => setSelectedImage(image)}
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
