export interface ProductListItem {
    id: string;
    title: string;
    handle: string;
    description: string;
    featuredImage?: {
      url: string;
      altText: string;
    };
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
  }
  