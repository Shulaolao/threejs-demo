import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    // Base public path when served in production
    base: './',

    // Development server configuration
    server: {
        host: true, // Listen on all local IPs
        port: 3000,
        open: true, // Auto-open browser on server start
        cors: true, // Enable CORS
    },

    // Resolve configuration
    resolve: {
        alias: {
            // Set up aliases for easier imports
            '@': resolve(__dirname, './src'),
            'three/addons': resolve(__dirname, 'node_modules/three/examples/jsm'),
        },
    },

    // Build configuration
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: true,
        // Chunk size warning limit
        chunkSizeWarningLimit: 1600,
        // Minify options
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true, // Remove console.log in production
                drop_debugger: true, // Remove debugger statements in production
            },
        },
        // Rollup options
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
            output: {
                manualChunks: {
                    // Split chunks for better caching
                    three: ['three'],
                    vendor: ['simplex-noise'],
                },
            },
        },
    },

    // Optimizations
    optimizeDeps: {
        include: ['three', 'simplex-noise'],
    },

    // Asset handling
    assetsInclude: ['**/*.jpg', '**/*.png', '**/*.glb', '**/*.gltf', '**/*.tif'],

    // CSS configuration
    css: {
        devSourcemap: true,
    },

    // Define global constants
    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },

    // Plugin options
    plugins: [],
});
