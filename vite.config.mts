import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	base: "/Todoist",
	resolve: {
		alias: {
			crypto: 'empty-module',
		},
	},
	define: {
		global: 'globalThis',
	},
});
