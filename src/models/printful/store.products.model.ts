import { Paging } from "./paging.model";
import { StoreProduct } from "./store.product.model";

export interface StoreProducts {
  code: number;
  result: StoreProduct[];
  extra: [];
  paging: Paging;
}
