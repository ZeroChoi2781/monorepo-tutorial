const alias = require('./alias');

module.exports = {
	ignorePatterns: [],
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 2018,
		requireConfigFile: false,
		babelOptions: {
			presets: ['@babel/preset-react'],
		},
	},
	env: {
		browser: true,
	},
	extends: ['eslint:recommended', 'airbnb', 'prettier', 'prettier/react'],
	plugins: ['react', 'import', 'prettier'],
	settings: {
		'import/resolver': {
			'babel-module': {
				alias,
			},
		},
	},
	rules: {
		'react/jsx-props-no-spreading': 0,
		'react/require-default-props': 0,
		'react/forbid-prop-types': [2, { forbid: ['any'] }],
		'jsx-a11y/click-events-have-key-events': 0,
		'jsx-a11y/no-static-element-interactions': 0,
		'consistent-return': 0,
		// only storybook
		'import/no-extraneous-dependencies': [0, 'naver'],
	},

	overrides: [
		{
			files: ['**/*.stories.jsx'],
			rules: {
				'react/prop-types': 0,
			},
		},
		{
			files: ['packages/gds-storybook/stories/reactstrap/*.js'],
			rules: {
				'react/jsx-filename-extension': 0,
			},
		},
	],
};
