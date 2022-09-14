import React, { useEffect } from 'react';
import styles from './index.module.css';
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFilteredSocialFeeds } from '../../../actions/SocialFeeds';

const SocialNextPrevSection = ({
	handleChange,
	pageState,
	setPageState,
	getFilteredSocialFeeds,
	socialFeeds: { socialFeedsList, pagination, nextPageSocialFeeds },
	PageScrollToTop,
}) => {
	const PrevPageNoChanger = (value) => {
		if (pageState > 1) {
			setPageState(pageState - value);
			handleChange(pageState - value, 'pagePag');
		}
	};
	const NextPageNoChanger = (value) => {
		setPageState(pageState + value);
		handleChange(pageState + value, 'pagePag');
	};

	return (
		<div className={` ${styles.mainDiv}`}>
			<div className={` ${styles.btnSec}`}>
				<div className={` ${styles.prevBtnDiv}`}>
					{pagination.pre ? (
						<button
							onClick={() => {
								PrevPageNoChanger(1);
								PageScrollToTop();
							}}
							className={` ${styles.btn}`}
						>
							Prev
						</button>
					) : (
						<div className={` ${styles.disableBtn}`}>Prev</div>
					)}
				</div>
				<div className={` ${styles.pageNoDiv}`}>Page {pageState}</div>
				<div className={` ${styles.nextBtnDiv}`}>
					{socialFeedsList &&
					pagination.next &&
					socialFeedsList.length !== 0 &&
					nextPageSocialFeeds &&
					nextPageSocialFeeds.length !== 0 ? (
						<button
							onClick={() => {
								NextPageNoChanger(1);
								PageScrollToTop();
							}}
							className={` ${styles.btn}`}
						>
							Next
						</button>
					) : (
						<div className={` ${styles.disableBtn}`}>Next</div>
					)}
				</div>
			</div>
		</div>
	);
};

SocialNextPrevSection.propTypes = {
	getFilteredSocialFeeds: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	socialFeeds: state.socialFeeds,
});

export default connect(mapStateToProps, {
	getFilteredSocialFeeds,
})(SocialNextPrevSection);
