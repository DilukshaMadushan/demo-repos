import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import { IoCaretDown } from 'react-icons/io5';
import { BiDollarCircle } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import Skeleton from '@material-ui/lab/Skeleton';
import { HiOutlineSearch } from 'react-icons/hi';

// SET ENVIRONMENT BASE URL
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	getSocialFeedsCoins,
	getSocialFeedsFilteredCoinsList,
} from '../../../../actions/SocialFeeds';

const DUMMY_LIST = [
	{ id: '1' },
	{ id: '2' },
	{ id: '3' },
	{ id: '4' },
	{ id: '5' },
];

const CoinsDropdown = ({
	isCoinsDropdownActive,
	setIsCoinsDropdownActive,
	coinsDropdownSelected,
	setCoinsDropdownSelected,
	handleChange,
	getSocialFeedsCoins,
	getSocialFeedsFilteredCoinsList,
	socialFeeds: { loadingSocialFeedsCoins, socialFeedsCoinsList },
}) => {
	//Get Coins
	useEffect(() => {
		getSocialFeedsCoins();
	}, []);

	//CoinsListSearch State
	const [coinListSelection, setCoinListSelection] = useState('');

	const handleCoinSearchInputChange = (coinName) => {
		setCoinListSelection(coinName);
		filterCoinList(coinName);
	};

	const filterCoinList = (coinName) => {
		let filterURL = '';

		if (coinName !== '') {
			filterURL = filterURL + 'search=' + coinName + '&';
		}

		if (coinName === '') {
			getSocialFeedsFilteredCoinsList(filterURL);
		}

		if (coinName.length >= 3) {
			getSocialFeedsFilteredCoinsList(filterURL);
		}
	};

	return (
		<div className={`${styles.mainDiv}`}>
			<div className={`${styles.dropdown}`}>
				<OutsideClickHandler
					onOutsideClick={() => {
						setIsCoinsDropdownActive(false);
					}}
				>
					<div
						onClick={() => setIsCoinsDropdownActive(!isCoinsDropdownActive)}
						className={`${styles.dropdownBtn}`}
					>
						<div className={`${styles.titleSpan}`}>{coinsDropdownSelected}</div>
						<div className={`${styles.arrowSpan}`}>
							<IoCaretDown />
						</div>
					</div>
					{isCoinsDropdownActive && (
						<div className={`${styles.dropdownContent}`}>
							<div className={`${styles.searchCoinTabDiv}`}>
								<div className={`${styles.searchCoinTab}`}>
									<input
										className={`${styles.searchCoinInput}`}
										type='text'
										placeholder='Search'
										value={coinListSelection}
										onChange={(e) =>
											handleCoinSearchInputChange(e.target.value)
										}
									/>
									<div className={`${styles['searchIconDiv']}`}>
										<HiOutlineSearch className={`${styles['searchIcon']}`} />
									</div>
								</div>
							</div>
							{loadingSocialFeedsCoins
								? DUMMY_LIST.map((item, index) => (
										<Skeleton
											style={{ background: '#232327' }}
											variant='text'
											className={`${styles.dropdownItemDiv}`}
											key={index}
											height={30}
										/>
								  ))
								: socialFeedsCoinsList !== null &&
								  socialFeedsCoinsList.map((item) => (
										<div
											onClick={() => {
												setCoinsDropdownSelected(item.symbol);
												setIsCoinsDropdownActive(false);
												handleChange(item._id);
											}}
											className={`${styles.dropdownItemDiv}`}
										>
											<div className={`${styles.coinImgDiv}`}>
												<img
													src={IMAGE_BASE_URL + item.image}
													className={`${styles.coinImg}`}
												/>
											</div>
											<div className={`${styles.dropdownItem}`}>
												<span>{item.symbol}</span>
											</div>
										</div>
								  ))}
						</div>
					)}
				</OutsideClickHandler>
			</div>
		</div>
	);
};

CoinsDropdown.propTypes = {
	getSocialFeedsCoins: PropTypes.func.isRequired,
	getSocialFeedsFilteredCoinsList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	socialFeeds: state.socialFeeds,
});

export default connect(mapStateToProps, {
	getSocialFeedsCoins,
	getSocialFeedsFilteredCoinsList,
})(CoinsDropdown);
