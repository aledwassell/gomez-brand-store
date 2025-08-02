import { json } from "@solidjs/router";
import { addToCart } from "~/lib/shopify-store";
import { CartLineInput } from "~/models/Cart.model";

export async function POST({ request }: { request: Request }) {
    try {
        const body = await request.json();
        const { items, cartId }: { items: CartLineInput[]; cartId: string | null } = body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return json({ error: "Items are required and must be a non-empty array" }, { status: 400 });
        }

        const cart = await addToCart(items, cartId);

        if (!cart) {
            return json({ error: "Failed to add items to cart" }, { status: 500 });
        }

        return json({ cart });
    } catch (error) {
        console.error("Error in cart add API:", error);
        return json({ error: "Internal server error" }, { status: 500 });
    }
}
