import React, { useEffect, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { makeStyles } from '@material-ui/core/styles';
import Autosuggest from 'react-autosuggest';
import { defaultTheme } from 'react-autosuggest/dist/theme';
import styles from './index.module.css';
import OutsideClickHandler from 'react-outside-click-handler';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	getMarketDataFilteredCoins,
	setNullMarketDataFilteredCoins,
} from '../../../../actions/Home/index';
import { webSocketParams1 } from '../../../../actions/Websocket';

// SET ENVIRONMENT BASE URL
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const SearchBarFutures = ({
	home: { marketDataFilteredCoinsList },
	getMarketDataFilteredCoins,
	setNullMarketDataFilteredCoins,
	coinListSelectionFutures,
	setCoinListSelectionFutures,
	togglebuttonFutures,
	setTogglebuttonFutures,
	webSocketParams1,
}) => {
	const [dropdownActive, setDropdownActive] = useState(false);

	const handleOnClick = () => {
		setDropdownActive(true);
	};

	const handleCoinSearchInputChange = (coinName) => {
		setCoinListSelectionFutures(coinName);
		filterCoinList(coinName);
	};

	const filterCoinList = (coinName) => {
		let filterURL = '';

		if (coinName !== '') {
			filterURL = filterURL + 'search=' + coinName + '&';
		}

		if (coinName === '') {
			setNullMarketDataFilteredCoins();
			webSocketParams1('future', togglebuttonFutures, null);
		}

		if (coinName.length >= 1) {
			getMarketDataFilteredCoins(filterURL);
		}
	};

	return (
		<div className={`${styles['main-div']}`}>
			<OutsideClickHandler
				onOutsideClick={() => {
					setDropdownActive(false);
				}}
			>
				<div className={`${styles['upper-div']}`}>
					<div className={`${styles['icon-div']}`}>
						<HiOutlineSearch size='18px' />
					</div>
					<div onClick={handleOnClick}>
						<input
							className={`${styles['input-div']}`}
							placeholder='Search'
							value={coinListSelectionFutures}
							onChange={(e) => handleCoinSearchInputChange(e.target.value)}
						/>
					</div>
				</div>
				{dropdownActive &&
				marketDataFilteredCoinsList &&
				marketDataFilteredCoinsList.length !== 0 ? (
					<div className={`${styles['lower-div']}`}>
						{marketDataFilteredCoinsList.map((item, index) => (
							<div
								key={index}
								onClick={() => {
									setDropdownActive(false);
									setCoinListSelectionFutures(item.symbol);
									webSocketParams1('future', togglebuttonFutures, item.symbol);
								}}
								className={`${styles['dropdownItemDiv']}`}
							>
								<img
									className={`${styles['toglle-btn']}`}
									src={IMAGE_BASE_URL + item.image}
								/>
								{item.symbol}
							</div>
						))}
					</div>
				) : (
					''
				)}
			</OutsideClickHandler>
		</div>
	);
};

SearchBarFutures.propTypes = {
	getMarketDataFilteredCoins: PropTypes.func.isRequired,
	setNullMarketDataFilteredCoins: PropTypes.func.isRequired,
	webSocketParams1: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	home: state.home,
});
export default connect(mapStateToProps, {
	getMarketDataFilteredCoins,
	setNullMarketDataFilteredCoins,
	webSocketParams1,
})(SearchBarFutures);
