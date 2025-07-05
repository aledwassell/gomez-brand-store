import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { PRINTFUL_MODULE } from "../../../modules/printful";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const printfulService = req.scope.resolve(PRINTFUL_MODULE);
  const result = await printfulService.syncProducts();
  res.json(result);
}
