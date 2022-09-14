import React from 'react';
import styles from './index.module.css';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	getCoinEventCards,
	checkNextPageCoinEvents,
} from '../../../../actions/CoinEvents';

const ClearButton = ({
	setDateRange,
	setCoinsDropdownSelected,
	setSortByDropdownSelected,
	setCategoryDropdownSelected,
	handleChange,
	checkNextPageCoinEvents,
}) => {
	const handleClearOnClick = () => {
		setDateRange([null, null]);
		setCoinsDropdownSelected('Coins');
		setSortByDropdownSelected('Sort By');
		setCategoryDropdownSelected('Category');
		checkNextPageCoinEvents('page=2');
	};
	return (
		<div className={`${styles.mainDiv}`}>
			<div
				className={`${styles.dropdownBtn}`}
				onClick={() => {
					handleClearOnClick();
					handleChange('');
				}}
			>
				<div className={`${styles.title}`}>Clear</div>
			</div>
		</div>
	);
};

ClearButton.propTypes = { checkNextPageCoinEvents: PropTypes.func.isRequired };

const mapStateToProps = (state) => ({
	coinEvents: state.coinEvents,
});

export default connect(mapStateToProps, { checkNextPageCoinEvents })(
	ClearButton
);
