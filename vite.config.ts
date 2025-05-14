import eslintPlugin from '@nabla/vite-plugin-eslint';
import ConditionalCompile from 'vite-plugin-conditional-compiler';
import { loadEnv, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const isProd = mode === 'production';

    const plugins = [
        react(),
        ConditionalCompile(),
        eslintPlugin(),
    ];

    return {
        build: {
            minify: isProd,
            emptyOutDir: true,
            sourcemap: true,
        },
        plugins,
        server: {
            host: true,
        },
        define: {
            APP_NAME: JSON.stringify(env.npm_package_name),
            APP_VERSION: JSON.stringify(env.npm_package_version),
            APP_MODE: JSON.stringify(isProd ? 'PROD' : 'DEV'),
        },
        envDir: 'env',
        base: '/',
        resolve: {
            alias: {
                devTools: '/src/devTools',
                engine: '/src/engine',
            },
        },
    };
});
