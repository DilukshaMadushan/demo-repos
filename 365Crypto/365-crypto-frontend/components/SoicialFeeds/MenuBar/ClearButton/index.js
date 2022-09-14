import React from 'react';
import styles from './index.module.css';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkNextPageSocialFeeds } from '../../../../actions/SocialFeeds';

const ClearButton = ({
	setCoinsDropdownSelected,
	setPlatformsDropdownSelected,
	setDateRange,
	handleChange,
	checkNextPageSocialFeeds,
}) => {
	const handleClearOnClick = () => {
		setDateRange([null, null]);
		setCoinsDropdownSelected('Coins');
		setPlatformsDropdownSelected('Platform');
		checkNextPageSocialFeeds('page=2');
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
				<span className={`${styles.title}`}>Clear</span>
			</div>
		</div>
	);
};

ClearButton.propTypes = { checkNextPageSocialFeeds: PropTypes.func.isRequired };

const mapStateToProps = (state) => ({
	socialFeeds: state.socialFeeds,
});

export default connect(mapStateToProps, { checkNextPageSocialFeeds })(
	ClearButton
);
