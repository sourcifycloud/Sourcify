const { sharedOptions } = require('@sourcify_io/eslint-config/shared');

/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	extends: ['@sourcify_io/eslint-config/node'],

	...sharedOptions(__dirname),

	ignorePatterns: ['index.js'],

	rules: {
		'@typescript-eslint/consistent-type-imports': 'error',

		// TODO: remove all the following rules
		eqeqeq: 'off',
		'id-denylist': 'off',
		'import/extensions': 'off',
		'import/order': 'off',
		'prefer-spread': 'off',
		'import/no-extraneous-dependencies': 'off',

		'@typescript-eslint/naming-convention': ['error', { selector: 'memberLike', format: null }],
		'@typescript-eslint/no-explicit-any': 'off', //812 warnings, better to fix in separate PR
		'@typescript-eslint/no-non-null-assertion': 'off', //665 errors, better to fix in separate PR
		// '@typescript-eslint/no-unsafe-argument': 'off', //1538 errors, better to fix in separate PR
		'@typescript-eslint/no-unsafe-assignment': 'off', //7084 problems, better to fix in separate PR
		'@typescript-eslint/no-unsafe-call': 'off', //541 errors, better to fix in separate PR
		'@typescript-eslint/no-unsafe-member-access': 'off', //4591 errors, better to fix in separate PR
		'@typescript-eslint/no-unsafe-return': 'off', //438 errors, better to fix in separate PR
		'@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true }],
		'@typescript-eslint/restrict-template-expressions': 'off', //1152 errors, better to fix in separate PR
		'@typescript-eslint/unbound-method': 'off',
		'@typescript-eslint/ban-ts-comment': ['warn', { 'ts-ignore': true }],
		'@typescript-eslint/prefer-nullish-coalescing': 'off',
	},

	overrides: [
		{
			files: ['./credentials/*.ts'],
			plugins: ['eslint-plugin-sourcify-nodes-base'],
			rules: {
				'sourcify-nodes-base/cred-class-field-authenticate-type-assertion': 'error',
				'sourcify-nodes-base/cred-class-field-display-name-missing-oauth2': 'error',
				'sourcify-nodes-base/cred-class-field-display-name-miscased': 'error',
				'sourcify-nodes-base/cred-class-field-name-missing-oauth2': 'error',
				'sourcify-nodes-base/cred-class-field-name-unsuffixed': 'error',
				'sourcify-nodes-base/cred-class-field-name-uppercase-first-char': 'error',
				'sourcify-nodes-base/cred-class-field-unobscured-sensitive-input': 'error',
				'sourcify-nodes-base/cred-class-name-missing-oauth2-suffix': 'error',
				'sourcify-nodes-base/cred-class-name-unsuffixed': 'error',
				'sourcify-nodes-base/cred-filename-against-convention': 'error',
			},
		},
		{
			files: ['./nodes/**/*.ts'],
			plugins: ['eslint-plugin-sourcify-nodes-base'],
			rules: {
				'sourcify-nodes-base/node-class-description-credentials-name-unsuffixed': 'error',
				'sourcify-nodes-base/node-class-description-display-name-unsuffixed-trigger-node': 'error',
				'sourcify-nodes-base/node-class-description-empty-string': 'error',
				'sourcify-nodes-base/node-class-description-icon-not-svg': 'error',
				'sourcify-nodes-base/node-class-description-inputs-wrong-regular-node': 'error',
				'sourcify-nodes-base/node-class-description-inputs-wrong-trigger-node': 'error',
				'sourcify-nodes-base/node-class-description-missing-subtitle': 'error',
				'sourcify-nodes-base/node-class-description-non-core-color-present': 'error',
				'sourcify-nodes-base/node-class-description-name-miscased': 'error',
				'sourcify-nodes-base/node-class-description-name-unsuffixed-trigger-node': 'error',
				'sourcify-nodes-base/node-class-description-outputs-wrong': 'error',
				'sourcify-nodes-base/node-dirname-against-convention': 'error',
				'sourcify-nodes-base/node-execute-block-double-assertion-for-items': 'error',
				'sourcify-nodes-base/node-execute-block-wrong-error-thrown': 'error',
				'sourcify-nodes-base/node-filename-against-convention': 'error',
				'sourcify-nodes-base/node-param-array-type-assertion': 'error',
				'sourcify-nodes-base/node-param-collection-type-unsorted-items': 'error',
				'sourcify-nodes-base/node-param-color-type-unused': 'error',
				'sourcify-nodes-base/node-param-default-missing': 'error',
				'sourcify-nodes-base/node-param-default-wrong-for-boolean': 'error',
				'sourcify-nodes-base/node-param-default-wrong-for-collection': 'error',
				'sourcify-nodes-base/node-param-default-wrong-for-fixed-collection': 'error',
				'sourcify-nodes-base/node-param-default-wrong-for-fixed-collection': 'error',
				'sourcify-nodes-base/node-param-default-wrong-for-multi-options': 'error',
				'sourcify-nodes-base/node-param-default-wrong-for-number': 'error',
				'sourcify-nodes-base/node-param-default-wrong-for-simplify': 'error',
				'sourcify-nodes-base/node-param-default-wrong-for-string': 'error',
				'sourcify-nodes-base/node-param-description-boolean-without-whether': 'error',
				'sourcify-nodes-base/node-param-description-comma-separated-hyphen': 'error',
				'sourcify-nodes-base/node-param-description-empty-string': 'error',
				'sourcify-nodes-base/node-param-description-excess-final-period': 'error',
				'sourcify-nodes-base/node-param-description-excess-inner-whitespace': 'error',
				'sourcify-nodes-base/node-param-description-identical-to-display-name': 'error',
				'sourcify-nodes-base/node-param-description-line-break-html-tag': 'error',
				'sourcify-nodes-base/node-param-description-lowercase-first-char': 'error',
				'sourcify-nodes-base/node-param-description-miscased-id': 'error',
				'sourcify-nodes-base/node-param-description-miscased-json': 'error',
				'sourcify-nodes-base/node-param-description-miscased-url': 'error',
				'sourcify-nodes-base/node-param-description-missing-final-period': 'error',
				'sourcify-nodes-base/node-param-description-missing-for-ignore-ssl-issues': 'error',
				'sourcify-nodes-base/node-param-description-missing-for-return-all': 'error',
				'sourcify-nodes-base/node-param-description-missing-for-simplify': 'error',
				'sourcify-nodes-base/node-param-description-missing-from-dynamic-multi-options': 'error',
				'sourcify-nodes-base/node-param-description-missing-from-dynamic-options': 'error',
				'sourcify-nodes-base/node-param-description-missing-from-limit': 'error',
				'sourcify-nodes-base/node-param-description-unencoded-angle-brackets': 'error',
				'sourcify-nodes-base/node-param-description-unneeded-backticks': 'error',
				'sourcify-nodes-base/node-param-description-untrimmed': 'error',
				'sourcify-nodes-base/node-param-description-url-missing-protocol': 'error',
				'sourcify-nodes-base/node-param-description-weak': 'error',
				'sourcify-nodes-base/node-param-description-wrong-for-dynamic-multi-options': 'error',
				'sourcify-nodes-base/node-param-description-wrong-for-dynamic-options': 'error',
				'sourcify-nodes-base/node-param-description-wrong-for-ignore-ssl-issues': 'error',
				'sourcify-nodes-base/node-param-description-wrong-for-limit': 'error',
				'sourcify-nodes-base/node-param-description-wrong-for-return-all': 'error',
				'sourcify-nodes-base/node-param-description-wrong-for-simplify': 'error',
				'sourcify-nodes-base/node-param-description-wrong-for-upsert': 'error',
				'sourcify-nodes-base/node-param-display-name-excess-inner-whitespace': 'error',
				'sourcify-nodes-base/node-param-display-name-miscased-id': 'error',
				'sourcify-nodes-base/node-param-display-name-miscased': 'error',
				'sourcify-nodes-base/node-param-display-name-not-first-position': 'error',
				'sourcify-nodes-base/node-param-display-name-untrimmed': 'error',
				'sourcify-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options': 'error',
				'sourcify-nodes-base/node-param-display-name-wrong-for-dynamic-options': 'error',
				'sourcify-nodes-base/node-param-display-name-wrong-for-simplify': 'error',
				'sourcify-nodes-base/node-param-display-name-wrong-for-update-fields': 'error',
				'sourcify-nodes-base/node-param-min-value-wrong-for-limit': 'error',
				'sourcify-nodes-base/node-param-multi-options-type-unsorted-items': 'error',
				'sourcify-nodes-base/node-param-name-untrimmed': 'error',
				'sourcify-nodes-base/node-param-operation-option-action-wrong-for-get-many': 'error',
				'sourcify-nodes-base/node-param-operation-option-description-wrong-for-get-many': 'error',
				'sourcify-nodes-base/node-param-operation-option-without-action': 'error',
				'sourcify-nodes-base/node-param-operation-without-no-data-expression': 'error',
				'sourcify-nodes-base/node-param-option-description-identical-to-name': 'error',
				'sourcify-nodes-base/node-param-option-name-containing-star': 'error',
				'sourcify-nodes-base/node-param-option-name-duplicate': 'error',
				'sourcify-nodes-base/node-param-option-name-wrong-for-get-many': 'error',
				'sourcify-nodes-base/node-param-option-name-wrong-for-upsert': 'error',
				'sourcify-nodes-base/node-param-option-value-duplicate': 'error',
				'sourcify-nodes-base/node-param-options-type-unsorted-items': 'error',
				'sourcify-nodes-base/node-param-placeholder-miscased-id': 'error',
				'sourcify-nodes-base/node-param-placeholder-missing-email': 'error',
				'sourcify-nodes-base/node-param-required-false': 'error',
				'sourcify-nodes-base/node-param-resource-with-plural-option': 'error',
				'sourcify-nodes-base/node-param-resource-without-no-data-expression': 'error',
				'sourcify-nodes-base/node-param-type-options-missing-from-limit': 'error',
				'sourcify-nodes-base/node-param-type-options-missing-from-password': 'error',
			},
		},
	],
};
