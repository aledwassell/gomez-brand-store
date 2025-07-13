import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { StoreSingleProduct } from "~/models/printful/store.single.product.model";
import { Product } from "~/models/Product.model";
import { ShopifyProduct } from "~/models/shopify/shopify-product.model";

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

export async function getProducts(
  forceRefresh = false
): Promise<ShopifyProduct[]> {
  "use server";

  try {
    const variables = forceRefresh
      ? { first: 10, _refresh: Date.now() }
      : { first: 10 };
    const response = await client.request(GET_PRODUCTS, {
      variables,
    });

    return (
      response.data?.products?.edges?.map(
        (edge: { node: ShopifyProduct }) => edge.node
      ) || []
    );
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
        variants(first: 3) {
        nodes {
            title
            availableForSale
            image {
            url
            altText
            }
        }
        }
        variantsCount {
        count
        }
    }
    }
`;

export async function getProduct(
  handle: string,
  forceRefresh = false
): Promise<StoreSingleProduct | null> {
  "use server";

  try {
    const variables = forceRefresh
      ? { handle, _refresh: Date.now() }
      : { handle };
    const response = await client.request(GET_PRODUCT, {
      variables,
    });

    return response.data?.product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
