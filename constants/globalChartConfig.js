import colors from './globalColor.module.scss';

// chart 전체에 적용되는 color
const globalChartColors = {
	basicColor: [
		colors.green500,
		colors.blue900,
		colors.blue500,
		colors.yellow500,
		colors.orange500,
		colors.grape500,
		colors.cyan500,
		colors.violet500,
		colors.lime500,
		colors.pink500,
	],
	expandedColor: [
		colors.green200,
		colors.blue700,
		colors.blue200,
		colors.yellow200,
		colors.orange200,
		colors.grape200,
		colors.cyan200,
		colors.violet200,
		colors.lime200,
		colors.pink200,
	],
};
const { basicColor, expandedColor } = globalChartColors;

// chart 전체에 적용되는 config
const globalChartConfig = {
	angleField: 'value',
	colorField: 'type',
	theme: {
		colors10: basicColor,
		colors20: basicColor.concat(expandedColor),
	},
	interactions: [{ type: 'element-single-selected' }],
	label: {
		style: {
			fontSize: 12,
			fontWeight: 500,
			fill: colors.gray900,
			textAlign: 'center',
			stroke: colors.white,
			lineWidth: 2,
		},
	},
	legend: {
		flipPage: false,
		marker: {
			spacing: 10,
		},
		maxHeight: 200,
		itemName: {
			style: {
				fontSize: 12,
				fontWeight: 400,
				fill: colors.gray500,
			},
		},
	},
	tooltip: {
		domStyles: {
			'g2-tooltip': {
				backgroundColor: colors.gray900,
				boxShadow: `0px 4px 10px rgba(${colors.black}, 0.2)`,
				borderRadius: '8px',
				padding: '6px 8px',
				opacity: '1',
			},
			'g2-tooltip-title': {
				fontSize: '12px',
				fontWeight: 400,
				lineHeight: '18px',
				color: colors.gray400,
				margin: '0 0 4px 0',
			},
			'g2-tooltip-list-item': {
				fontSize: '12px',
				fontWeight: '400',
				lineHeight: '18px',
				color: colors.gray400,
				margin: 0,
			},
			'g2-tooltip-value': {
				fontWeight: 500,
				color: colors.white,
			},
		},
	},
};

export default globalChartConfig;
