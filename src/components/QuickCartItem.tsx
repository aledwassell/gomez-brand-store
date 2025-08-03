import { SquareMinus, SquarePlus } from "lucide-solid";
import { shopifyCartIdLocalStorageKey } from "~/constants/shopify-cart-id";
import { addToCartApi, updateCartApi } from "~/lib/cart-api";
import { BaseCartLine, CartLineInput, CartLineUpdateInput } from "~/models/Cart.model";
import { setStore } from "~/store/store";
import { formatCurrency } from "~/util/format-currency.util";

function QuickCartItem(item: BaseCartLine) {
    const handleAddCartItem = async (cartLineInput: CartLineInput) => {
        const cartId = localStorage.getItem(shopifyCartIdLocalStorageKey);
        const response = await addToCartApi([cartLineInput], cartId);

        if (response.error) {
            setStore("cartError", response.error);
        } else if (response.cart) {
            if (response.cart.id && response.cart.id !== cartId) {
                localStorage.setItem(shopifyCartIdLocalStorageKey, response.cart.id);
            }
            setStore("cart", response.cart.lines?.nodes ?? []);
            setStore("checkoutUrl", response.cart.checkoutUrl ?? "");
            setStore("cartError", "");
        }
    };
    const handleRemoveCartItem = async (cartLineUpdateInput: CartLineUpdateInput) => {
        const cartId = localStorage.getItem(shopifyCartIdLocalStorageKey);
        const response = await updateCartApi(
            [{ ...cartLineUpdateInput, quantity: cartLineUpdateInput.quantity - 1 }],
            cartId
        );

        if (response.error) {
            setStore("cartError", response.error);
        } else if (response.cart) {
            setStore("cart", response.cart.lines?.nodes ?? []);
            setStore("checkoutUrl", response.cart.checkoutUrl ?? "");
            setStore("cartError", "");
        }
    };
    return (
        <>
            <span class="mr-auto">{item.merchandise.title}</span>
            <span class="mr-2">{formatCurrency(item.cost.totalAmount.amount, item.cost.totalAmount.currencyCode)}</span>
            <button
                class="cursor-pointer"
                onClick={() =>
                    handleRemoveCartItem({
                        id: item.id,
                        quantity: item.quantity,
                    })
                }
            >
                <SquareMinus />
            </button>
            <span class="w-4">{item && item.quantity}</span>
            <button
                class="cursor-pointer"
                onClick={() =>
                    handleAddCartItem({
                        merchandiseId: item.merchandise.id,
                        quantity: 1,
                    })
                }
            >
                <SquarePlus />
            </button>
        </>
    );
}

export default QuickCartItem;
