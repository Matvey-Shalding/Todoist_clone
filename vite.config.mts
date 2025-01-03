import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	base: "/To-do-list",
	resolve: {
		alias: {
			crypto: 'empty-module',
		},
	},
	define: {
		global: 'globalThis',
	},
});