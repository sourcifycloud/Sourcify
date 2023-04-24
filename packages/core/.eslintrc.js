const { sharedOptions } = require('@sourcify_io/eslint-config/shared');

/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	extends: ['@sourcify_io/eslint-config/node'],

	...sharedOptions(__dirname),

	ignorePatterns: ['bin/*.js'],

	rules: {
		'@typescript-eslint/consistent-type-imports': 'error',

		// TODO: Remove this
		'import/order': 'off',
		'@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': true }],
	},
};
