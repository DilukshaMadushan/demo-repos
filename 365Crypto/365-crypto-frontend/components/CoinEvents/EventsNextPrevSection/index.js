import React, { useEffect } from 'react';
import styles from './index.module.css';
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFilteredEvents } from '../../../actions/CoinEvents';

const NextPrevSection = ({
	handleChange,
	pageState,
	setPageState,
	coinEvents: { cardsList, pagination, nextPageCoinEvents },
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
					{cardsList &&
					pagination.next &&
					cardsList.length !== 0 &&
					nextPageCoinEvents &&
					nextPageCoinEvents.length !== 0 ? (
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

NextPrevSection.propTypes = {
	getFilteredEvents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	coinEvents: state.coinEvents,
});

export default connect(mapStateToProps, {
	getFilteredEvents,
})(NextPrevSection);
