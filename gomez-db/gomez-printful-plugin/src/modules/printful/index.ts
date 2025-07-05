import PrintfulModuleService from "./service";
import { Module } from "@medusajs/framework";

export const PRINTFUL_MODULE = "printful";

export default Module(PRINTFUL_MODULE, {
  service: PrintfulModuleService,
});
