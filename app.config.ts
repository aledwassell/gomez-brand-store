import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  ssr: true,
  server: {
    preset: "firebase",
    firebase: {
      gen: 2,
      nodeVersion: "20",
    },
  },
});
