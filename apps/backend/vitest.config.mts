import swc from 'unplugin-swc'
import { Plugin as Plugin$1 } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		root: './',
	},
	plugins: [tsconfigPaths(), swc.vite({ module: { type: 'nodenext' } }) as Plugin$1],
})
