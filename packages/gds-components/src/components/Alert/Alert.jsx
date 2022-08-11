import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Alert as RSAlert } from 'reactstrap';

import styles from './Alert.module.scss';

const Alert = ({ className, leftIcon, children, ...props }) => {
	const LeftIcon = leftIcon;

	return (
		<RSAlert {...props} className={cx(styles.Alert, className)}>
			{LeftIcon && <LeftIcon className={styles.Alert__icon} />}
			<div className={styles.Alert__children}>{children}</div>
		</RSAlert>
	);
};

Alert.propTypes = {
	className: PropTypes.string,
	leftIcon: PropTypes.func,
	children: PropTypes.node,
};
Alert.defaultProps = {
	className: '',
	leftIcon: null,
	children: null,
};

export default Alert;
