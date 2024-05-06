import { defineConfig, splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [splitVendorChunkPlugin()],
  base: '/2415501-kekstagram-31/',
});
