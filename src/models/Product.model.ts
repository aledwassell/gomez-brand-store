export type ProductImage = {
  url: string;
  altText: string;
};

export type Product = {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  availableForSale: boolean;
  priceRange: { maxVariantPrice: { amount: string; currencyCode: string } };
  featuredImage: ProductImage;
  images: {
    nodes: ProductImage[];
  };
  variants: {
    nodes: {
      id: string;
      title: string;
      availableForSale: boolean;
      price: {
        amount: string;
        currencyCode: string;
      };
      image: ProductImage;
    }[];
  };
  sizeGuide: {
    value: string;
  };
  variantsCount: {
    count: number;
  };
};
