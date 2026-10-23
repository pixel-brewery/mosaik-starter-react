import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        include: ['src/**/*.spec.tsx'],
        restoreMocks: true,
        server: {
            // Resolve the published packages through Vite's browser-compatible resolver.
            deps: { inline: [/@pixel-brewery\//] }
        }
    }
});
