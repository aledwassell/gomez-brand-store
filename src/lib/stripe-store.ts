import { json } from "@solidjs/router";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(cartItems: any[]): Promise<any> {
  "use server";

  // Map cart items to Stripe line items
  const line_items = cartItems.map((item) => ({
    price_data: {
      currency: "gbp",
      product_data: {
        name: item.name,
        images: [item.image],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.BASE_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}`,
  });

  return json({ url: session.url });
}
