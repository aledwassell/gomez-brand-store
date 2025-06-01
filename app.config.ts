import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  ssr: true,
  server: {
    preset: "node",
    rollupConfig: {
      external: ["__STATIC_CONTENT_MANIFEST"],
    },
  },
});
