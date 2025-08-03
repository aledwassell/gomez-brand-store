import { json } from "@solidjs/router";
import { getCart } from "~/lib/shopify-store";

export async function GET({ request }: { request: Request }) {
    try {
        const url = new URL(request.url);
        const cartId = url.searchParams.get("cartId");

        const cart = await getCart(cartId);

        return json({ cart });
    } catch (error) {
        console.error("Error in cart get API:", error);
        return json({ error: "Internal server error" }, { status: 500 });
    }
}
