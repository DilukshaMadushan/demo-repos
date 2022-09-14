import React from 'react';
import styles from './index.module.css';

const BUTTON_LIST = [
	{ id: '1', titile: 'Day' },
	{ id: '2', titile: 'Week' },
	{ id: '3', titile: 'Month' },
	{ id: '4', titile: 'Year' },
];

const CandleChartButtonGroup = ({ buttonGroupState, setButtonGroupState }) => {
	return (
		<div className={`${styles.mainDiv}`}>
			<div className={`row ${styles.subDiv}`}>
				{BUTTON_LIST.map((item) => (
					<div
						className={`col ${
							buttonGroupState === item.id
								? styles.buttonSelected
								: styles.buttonNotSelected
						}`}
						onClick={() => setButtonGroupState(item.id)}
					>
						{item.titile}
					</div>
				))}
			</div>
		</div>
	);
};

export default CandleChartButtonGroup;
