export interface StoreSingleProduct {
  code: number;
  result: {
    sync_product: {
      id: number;
      external_id: string;
      name: string;
      variants: number;
      synced: number;
      thumbnail_url: string;
      is_ignored: boolean;
    };
    sync_variants: Array<{
      id: number;
      external_id: string;
      sync_product_id: number;
      name: string;
      synced: boolean;
      variant_id: number;
      retail_price: string;
      sku: string;
      product: {
        variant_id: number;
        product_id: number;
        image: string;
        name: string;
      };
      files: Array<{
        type: string;
        id: number;
        url: string;
        options: Array<{
          id: string;
          value: string;
        }>;
        hash: string;
        filename: string;
        mime_type: string;
        size: number;
        width: number;
        height: number;
        dpi: number;
        status: string;
        created: number;
        thumbnail_url: string;
        preview_url: string;
        visible: boolean;
        is_temporary: boolean;
        stitch_count_tier: string;
      }>;
      options: Array<{
        id: string;
        value: string;
      }>;
      main_category_id: number;
      warehouse_product_id: number;
      warehouse_product_variant_id: number;
      size: string;
      color: string;
      availability_status: string;
    }>;
  };
}