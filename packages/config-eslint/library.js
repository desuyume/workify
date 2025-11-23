const { resolveTsconfigPath } = require('./helper')

const project = resolveTsconfigPath();

/*
 * This is a custom ESLint configuration for use with
 * typescript packages.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
	extends: [
		'@vercel/style-guide/eslint/node',
		'@vercel/style-guide/eslint/typescript',
	].map(require.resolve),
	parserOptions: {
    project,
		tsconfigRootDir: process.cwd(),
		sourceType: 'module',
  },
	globals: {
		React: true,
		JSX: true,
	},
	settings: {
		'import/resolver': {
			typescript: {
				project,
			},
			node: {
				extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	ignorePatterns: ['node_modules/', 'dist/'],
}
