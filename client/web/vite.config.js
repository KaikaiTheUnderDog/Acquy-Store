import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/ryzel',
	plugins: [react(), eslint()],
	server: {
		proxy: {
			'/api/v1': {
				target: 'http://localhost:8000',
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname, 'src'),
			},
			{
				find: '@helpers',
				replacement: path.resolve(__dirname, 'src/utils/helpers'),
			},
			{
				find: '@hooks',
				replacement: path.resolve(__dirname, 'src/utils/hooks'),
			},
			{
				find: '@hocs',
				replacement: path.resolve(__dirname, 'src/utils/hocs'),
			},
		],
	},
});
