import { Cart, CartLineInput, CartLineUpdateInput } from "~/models/Cart.model";

export interface CartApiResponse {
    cart?: Cart;
    error?: string;
}

export async function addToCartApi(items: CartLineInput[], cartId: string | null): Promise<CartApiResponse> {
    try {
        const response = await fetch("/api/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ items, cartId }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to add items to cart");
        }

        return data;
    } catch (error) {
        console.error("Error adding items to cart:", error);
        return { error: error instanceof Error ? error.message : "Unknown error" };
    }
}

export async function updateCartApi(items: CartLineUpdateInput[], cartId: string | null): Promise<CartApiResponse> {
    try {
        const response = await fetch("/api/cart/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ items, cartId }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to update cart items");
        }

        return data;
    } catch (error) {
        console.error("Error updating cart items:", error);
        return { error: error instanceof Error ? error.message : "Unknown error" };
    }
}

export async function getCartApi(cartId: string | null): Promise<CartApiResponse> {
    try {
        const params = new URLSearchParams();
        if (cartId) {
            params.append("cartId", cartId);
        }

        const response = await fetch(`/api/cart/get?${params.toString()}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to get cart");
        }

        return data;
    } catch (error) {
        console.error("Error getting cart:", error);
        return { error: error instanceof Error ? error.message : "Unknown error" };
    }
}
