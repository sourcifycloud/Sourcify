const { sharedOptions } = require('@sourcify_io/eslint-config/shared');

/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	extends: ['@sourcify_io/eslint-config/base'],

	...sharedOptions(__dirname),

	rules: {
		'@typescript-eslint/consistent-type-imports': 'error',
		'import/order': 'off', // TODO: remove this
	},
};
