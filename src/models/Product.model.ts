export type Product = {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  availableForSale: boolean;
  priceRange: { maxVariantPrice: { amount: string; currencyCode: string } };
  featuredImage: {
    url: string;
    altText: string;
  };
  images: {
    nodes: {
      url: string;
      altText: string;
    }[];
  };
  variants: {
    nodes: {
      title: string;
      availableForSale: boolean;
      price: {
        amount: string;
        currencyCode: string;
      };
    }[];
  };
  variantsCount: {
    count: number;
  };
};
