import swc from 'unplugin-swc'
import { Plugin as Plugin$1 } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		poolOptions: {
			threads: {
				singleThread: true,
			},
		},
		include: ['**/*.e2e-spec.ts'],
		globals: true,
		alias: {
			'@src': '../src',
			'@test': '../test',
		},
		root: '../',
	},
	resolve: {
		alias: {
			'@src': '../src',
			'@test': '../test',
		},
	},
	plugins: [tsconfigPaths(), swc.vite({ module: { type: 'nodenext' } }) as Plugin$1],
})
