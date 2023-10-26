import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        nodePolyfills(),
    ],
    build: {
        target: 'es2015',
        rollupOptions: {
            input: {
                main: 'src/main.js',
                webworker: 'src/webworker.js'
            },
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`
            }
        },
    }
})
