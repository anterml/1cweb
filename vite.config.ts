import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
//import monacoEditorPlugin from 'vite-plugin-monaco-editor';

export default defineConfig({
	server: {
		watch: {
			ignored: ['code/view/**']
		},
	},
	plugins: [sveltekit(), /*monacoEditorPlugin({})*/]
});
