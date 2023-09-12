//  @type {import('@sveltejs/kit').Config} 
import { vitePreprocess } from '@astrojs/svelte';

// svelte.config.js
export default {
	// svelte options
	extensions: ['.svelte'],
	compilerOptions: {},
	preprocess: [],
	onwarn: (warning, handler) => handler(warning),
	// plugin options
	vitePlugin: {
	  exclude: [],
	  // experimental options
	  experimental: {}
	}
  };
