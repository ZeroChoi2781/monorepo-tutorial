import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import summary from 'rollup-plugin-summary';
import typescript from 'rollup-plugin-typescript2';

import fs from 'fs';
import readPkgUp from 'read-pkg-up';

const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssPresetEnv = require('postcss-preset-env');
const aliasConf = require('./alias');

const excludePath = 'node_modules/**';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const inputDir = 'index.ts';

// 각 packages의 pcakage.json
const { packageJson: pkg } = readPkgUp.sync({
	cwd: fs.realpathSync(process.cwd()),
});

const plugins = [
	peerDepsExternal(),
	terser(),
	summary(),
	json(),
	resolve({ extensions }),
	alias({
		resolve: extensions,
		entries: Object.keys(aliasConf).map((key) => ({
			find: key,
			replacement: aliasConf[key],
		})),
	}),
	postcss({
		extensions: ['.scss', '.css'],
		plugins: [
			postcssFlexbugsFixes,
			postcssPresetEnv({
				autoprefixer: {
					flexbox: 'no-2009',
				},
			}),
		],
		extract: false,
		modules: {
			generateScopedName: '[hash:base64]',
		},
		minimize: true,
	}),
	commonjs({
		include: ['node_modules/**', '../../node_modules/**'],
	}),
	babel({
		extensions,
		exclude: excludePath,
		babelHelpers: 'runtime',
		babelrc: false,
		presets: ['@babel/preset-env', '@babel/preset-react'],
		plugins: ['@babel/plugin-transform-runtime'],
	}),
	// NOTE:
	typescript({ useTsconfigDeclarationDir: true }),
];

const buildJS = (input, output, format) => {
	const defaultOutputConfig = {
		format,
		exports: 'named',
		sourcemap: true,
	};
	const esOutputConfig = {
		...defaultOutputConfig,
		dir: output,
	};
	const cjsOutputConfig = {
		...defaultOutputConfig,
		file: output,
	};

	return {
		input,
		output: [format === 'es' ? esOutputConfig : cjsOutputConfig],
		// NOTE: es에서만 폴더 구조 유지
		// TODO: ide-site chart 컴포넌트 require 잘되는지 확인해보기
		preserveModules: format === 'es',
		external: [/@babel\/runtime/],
		plugins,
	};
};

export default [
	buildJS(inputDir, pkg.main, 'cjs'),
	buildJS(inputDir, pkg.module, 'es'),
];
