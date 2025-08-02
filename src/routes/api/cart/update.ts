import { json } from "@solidjs/router";
import { updateItemInCart } from "~/lib/shopify-store";
import { CartLineUpdateInput } from "~/models/Cart.model";

export async function POST({ request }: { request: Request }) {
    try {
        const body = await request.json();
        const { items, cartId }: { items: CartLineUpdateInput[]; cartId: string | null } = body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return json({ error: "Items are required and must be a non-empty array" }, { status: 400 });
        }

        if (!cartId) {
            return json({ error: "Cart ID is required" }, { status: 400 });
        }

        const cart = await updateItemInCart(items, cartId);

        if (!cart) {
            return json({ error: "Failed to update cart items" }, { status: 500 });
        }

        return json({ cart });
    } catch (error) {
        console.error("Error in cart update API:", error);
        return json({ error: "Internal server error" }, { status: 500 });
    }
}
