
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // GitHub Pages에서는 서버가 필요 없는
  // 정적 SPA 형태로 빌드
  nitro: false,

  vite: {
    base: process.env.BASE_PATH ?? "/",
  },

  tanstackStart: {
    spa: {
      enabled: true,
    },
  },
});
