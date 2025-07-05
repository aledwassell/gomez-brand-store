import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { PrintfulService } from "../../../../services/printful"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const printfulService = req.scope.resolve("printfulService") as PrintfulService

  try {
    const syncResult = await printfulService.syncProducts()
    res.json({
      message: "Products synced successfully",
      synced: syncResult.synced,
      skipped: syncResult.skipped,
      errors: syncResult.errors
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to sync products",
      error: error.message
    })
  }
}