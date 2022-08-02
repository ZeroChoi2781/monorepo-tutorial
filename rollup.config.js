import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from 'rollup-plugin-json';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';

import fs from 'fs';
import readPkgUp from 'read-pkg-up';

const excludePath = 'node_modules/**';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const input = 'index.ts';

// 각 packages의 pcakage.json
const { packageJson: pkg } = readPkgUp.sync({
	cwd: fs.realpathSync(process.cwd()),
});

function buildJS(input, output, format) {
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

	const config = {
		input,
		external: ['react'],
		output: [format === 'es' ? esOutputConfig : cjsOutputConfig],
		plugins: [
			resolve({
				extensions,
			}),
			babel({
				babelrc: false,
				presets: [
					'@babel/env',
					'@babel/preset-typescript',
					'@babel/preset-react',
				],
				plugins: ['@babel/plugin-transform-runtime'],
				extensions,
				babelHelpers: 'runtime',
				exclude: excludePath,
			}),

			// TODO: 이게 뭔지 알아보기
			peerDepsExternal(),
			commonjs(),
			json(),
			url(),
			svgr(),
		],
		preserveModules: format === 'es',
	};

	return config;
}

export default [
	buildJS(input, pkg.main, 'cjs'),
	buildJS(input, pkg.module, 'es'),
];
