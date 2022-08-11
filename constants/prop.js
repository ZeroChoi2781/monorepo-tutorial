import PropTypes from 'prop-types';

export default {
	type: {
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.node),
			PropTypes.node,
		]),
		size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
		lottiePlayer: {
			loop: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]), // 반복
			stopped: PropTypes.bool, // 정지
			paused: PropTypes.bool, // 일시 정지
			speed: PropTypes.number, // 속도 ( > 0), 소수점 가능
			reverse: PropTypes.bool, // 거꾸로 재생
			preserveAspectRatio: PropTypes.string, // 영상 비율 정의 https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
			animationData: PropTypes.objectOf(PropTypes.any).isRequired, // 모션 json
			onComplete: PropTypes.func, // loop===false일 때 애니메이션 끝나면 호출됨
			onLoopComplete: PropTypes.func, // loop===true일 때 루프 끝나면 호출됨
			className: PropTypes.string, // animation wrapper 가로 세로 길이 등, 스타일은 css로 지정
			flag: PropTypes.bool, // 변하면 loadAnimation 다시 호출
		},
	},
	default: {
		size: 'md',
		lottiePlayer: {
			loop: true,
			stopped: false,
			paused: false,
			speed: 1,
			reverse: false,
			preserveAspectRatio: 'xMidYMid meet', // 꽉 채우려면 xMidYMid slice(대신 잘릴 수가 있다)
			onComplete: (event) => event,
			onLoopComplete: (event) => event,
			className: '',
			flag: false,
		},
	},
};
