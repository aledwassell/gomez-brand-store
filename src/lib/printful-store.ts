import { StoreProducts } from "~/models/printful/store.products.model";
import { StoreSingleProduct } from "~/models/printful/store.single.product.model";

export async function getProducts(): Promise<StoreProducts> {
  "use server";

  try {
    const response = await fetch("https://api.printful.com/store/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_ACCESS_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Printful API error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching from Printful API:", error);

    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch products"
    );
  }
}

export async function getProduct(id: string): Promise<StoreSingleProduct> {
  "use server";

  try {
    const response = await fetch(
      `https://api.printful.com/store/products/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PRINTFUL_ACCESS_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Printful API error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching from Printful API:", error);

    throw new Error(
      error instanceof Error ? error.message : `Failed to fetch product with ID ${id}`
    );
  }
}
