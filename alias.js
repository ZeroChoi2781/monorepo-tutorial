const path = require('path');

// jsconfig.json 도 함께 수정 할것
module.exports = {
	// global
	_constants: path.resolve(__dirname, './constants'),
	// packages src
	_components: path.resolve(__dirname, './packages/gds-components/src'),
	_icons: path.resolve(__dirname, './packages/gds-icons/src'),
	_charts: path.resolve(__dirname, './packages/gds-charts/src'),
	// etc
	'_libs/reactstrap': path.resolve(__dirname, './libs/reactstrap'),
};
