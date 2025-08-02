import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { Cart, CartInput, CartLineInput, CartLineUpdateInput } from "~/models/Cart.model";
import { ProductListItem } from "~/models/product-list-item.model";
import { Product } from "~/models/Product.model";

const client = createStorefrontApiClient({
    storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
    apiVersion: "2025-07",
    publicAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

export const GET_PRODUCTS = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export async function getProducts(forceRefresh = false): Promise<ProductListItem[]> {
    "use server";

    try {
        const variables = forceRefresh ? { first: 10, _refresh: Date.now() } : { first: 10 };
        const { data } = await client.request(GET_PRODUCTS, {
            variables,
        });

        return data?.products?.edges?.map((edge: { node: ProductListItem }) => edge.node) || [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

const GET_PRODUCT = `
query ProductQuery($handle: String) {
  product(handle: $handle) {
    id
    title
    handle
    descriptionHtml
    availableForSale
    sizeGuide: metafield(namespace: "custom", key: "size_guide") {
      value
    }
    images(first: 12) {
      nodes {
        url
        altText
      }
    }
    featuredImage {
      url
      altText
    }
    encodedVariantExistence
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 50) {
      nodes {
        id
        title
        availableForSale
        image {
          url
          altText
        }
        price {
          amount
          currencyCode
        }
      }
    }
    variantsCount {
      count
    }
  }
}
`;

export async function getProduct(handle: string, forceRefresh = false): Promise<Product | null> {
    "use server";

    try {
        const variables = forceRefresh ? { handle, _refresh: Date.now() } : { handle };
        const { data } = await client.request(GET_PRODUCT, {
            variables,
        });

        return data?.product || null;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

const cartCreateMutation = `
mutation ($input: CartInput!, $country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
  cartCreate(input: $input) {
    userErrors {
      message
      code
      field
    }
    cart {
      id
      checkoutUrl
      lines(first: 100) {
        nodes {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
              }
            }
          }
        }
      }
    }
  }
}
`;

export async function createCart(initialItem?: CartLineInput): Promise<Cart | null> {
    "use server";

    const input: CartInput = { lines: [] };

    if (initialItem) {
        input.lines = [{ ...initialItem }];
    }

    console.log("Cart input:", input);

    try {
        const { data, errors } = await client.request(cartCreateMutation, {
            variables: {
                input,
                country: "GB",
                language: "EN",
            },
        });

        // Check for GraphQL errors
        if (errors) {
            console.error("GraphQL errors:", errors);
            return null;
        }

        // Check for user errors
        if (data.cartCreate.userErrors.length > 0) {
            console.error("User errors:", data.cartCreate.userErrors);
            return null;
        }

        const cart = data.cartCreate.cart;

        return cart;
    } catch (error) {
        console.error("Error creating cart:", error);
        return null;
    }
}

const addItemsToCartMutation = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      checkoutUrl
      lines(first: 100) {
        nodes {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
    userErrors {
      message
    }
    }
  }
`;

export async function addItemsToCart(cartId: string, items: CartLineInput[]) {
    "use server";

    try {
        const { data, errors } = await client.request(addItemsToCartMutation, {
            variables: {
                cartId,
                lines: items,
            },
        });

        if (errors) {
            console.error("GraphQL errors while adding items to cart:", errors);
            return null;
        }

        if (data.cartLinesAdd.userErrors && data.cartLinesAdd.userErrors.length > 0) {
            console.error("User errors while adding items to cart:", data.cartLinesAdd.userErrors);
            return null;
        }

        return data.cartLinesAdd.cart;
    } catch (error) {
        console.error("Error adding items to cart:", error);
        return null;
    }
}

export async function addToCart(items: CartLineInput[], cartId: string | null) {
    "use server";

    if (cartId) {
        return await addItemsToCart(cartId, items);
    } else {
        return await createCart(items[0]); // or create with all items
    }
}

const updateItemInCartMutation = `
mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      id
      checkoutUrl
      lines(first: 100) {
        nodes {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
    userErrors {
      message
    }
    }
  }
`;

export async function updateItemInCart(items: CartLineUpdateInput[], cartId: string | null) {
    "use server";
    try {
        const { data, errors } = await client.request(updateItemInCartMutation, {
            variables: { cartId, lines: items },
        });

        if (errors) {
            console.error("GraphQL errors while updating items in cart:", errors);
            return null;
        }

        if (data.cartLinesUpdate.userErrors && data.cartLinesUpdate.userErrors.length > 0) {
            console.error("User errors while updating items in cart:", data.cartLinesUpdate.userErrors);
            return null;
        }

        return data.cartLinesUpdate.cart;
    } catch (error) {
        console.error("Error updating items in cart:", error);
        return null;
    }
}

const getCartQuery = `
query getCart($cartId: ID!, $country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
  cart(id: $cartId) {
    id
    checkoutUrl
    lines(first: 100) {
      nodes {
        id
        quantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
}
`;

export async function getCart(cartId: string | null): Promise<Cart | null> {
    "use server";

    if (!cartId) {
        return Promise.resolve(null);
    }

    try {
        const { data, errors } = await client.request(getCartQuery, {
            variables: {
                cartId,
                country: "GB",
                language: "EN",
            },
        });

        if (errors) {
            console.error("Error fetching cart:", errors);
            return null;
        }

        return data.cart;
    } catch (error) {
        console.error("Error fetching cart:", error);
        return null;
    }
}
