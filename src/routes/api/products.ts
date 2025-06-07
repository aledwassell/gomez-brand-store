import { products } from "~/constants/Products";

export async function GET() {
  try {
    return new Response(JSON.stringify(products), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
