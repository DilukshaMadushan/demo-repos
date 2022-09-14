import React, { useState, useRef, useEffect } from 'react';
import MenuBar from '../../components/SoicialFeeds/MenuBar';
import SocialFeedCards from '../../components/SoicialFeeds/SocialFeedCards';
import SocialNextPrevSection from '../../components/SoicialFeeds/SocialNextPrevSection';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	getFilteredSocialFeeds,
	checkNextPageSocialFeeds,
} from '../../actions/SocialFeeds';

const SocialFeeds = ({ getFilteredSocialFeeds, checkNextPageSocialFeeds }) => {
	//Next Prev Btns States
	const [pageState, setPageState] = useState(1);

	//CoinsDropdownStates
	const [isCoinsDropdownActive, setIsCoinsDropdownActive] = useState(false);
	const [coinsDropdownSelected, setCoinsDropdownSelected] = useState('Coins');

	//PlatformsDropdownStates
	const [isPlatformsDropdownActive, setIsPlatformsDropdownActive] =
		useState(false);
	const [platformsDropdownSelected, setPlatformsDropdownSelected] =
		useState('Platform');

	//PlatformsDropdownMobileStates
	const [isPlatformsDropdownMobileActive, setIsPlatformsDropdownMobileActive] =
		useState(false);
	const [platformsDropdownMobileSelected, setPlatformsDropdownMobileSelected] =
		useState('Platform');

	//DateRangeDropdownStates
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;

	//dropdownsSelectionsStates
	const [dropdownsSelectionsData, setDropdownSelectionsData] = useState({
		dateRangeSelection: '',
		coinSelection: '',
		platformSelection: '',
		platformSelectionMobile: '',
		searchSelection: '',
	});

	const handleChange = (value, type) => {
		if (type === 'selectedDateRange') {
			setPageState(1);
			setDropdownSelectionsData({
				...dropdownsSelectionsData,
				dateRangeSelection: value,
			});
			filterEvents(
				value,
				dropdownsSelectionsData.coinSelection,
				dropdownsSelectionsData.platformSelection,
				dropdownsSelectionsData.platformSelectionMobile,
				dropdownsSelectionsData.searchSelection,
				1
			);
		}
		if (type === 'selectedCoinId') {
			setPageState(1);
			setDropdownSelectionsData({
				...dropdownsSelectionsData,
				coinSelection: value,
			});

			filterEvents(
				dropdownsSelectionsData.dateRangeSelection,
				value,
				dropdownsSelectionsData.platformSelection,
				dropdownsSelectionsData.platformSelectionMobile,
				dropdownsSelectionsData.searchSelection,
				1
			);
		}
		if (type === 'selectedPlatform') {
			setPageState(1);
			setDropdownSelectionsData({
				...dropdownsSelectionsData,
				platformSelection: value,
			});

			filterEvents(
				dropdownsSelectionsData.dateRangeSelection,
				dropdownsSelectionsData.coinSelection,
				value,
				dropdownsSelectionsData.platformSelectionMobile,
				dropdownsSelectionsData.searchSelection,
				1
			);
		}
		if (type === 'selectedMobilePlatform') {
			setPageState(1);
			setDropdownSelectionsData({
				...dropdownsSelectionsData,
				platformSelectionMobile: value,
			});
			filterEvents(
				dropdownsSelectionsData.dateRangeSelection,
				dropdownsSelectionsData.coinSelection,
				dropdownsSelectionsData.platformSelection,
				value,
				dropdownsSelectionsData.searchSelection,
				1
			);
		}
		if (type === 'searchInput') {
			setPageState(1);
			setDropdownSelectionsData({
				...dropdownsSelectionsData,
				searchSelection: value,
			});
			filterEvents(
				dropdownsSelectionsData.dateRangeSelection,
				dropdownsSelectionsData.coinSelection,
				dropdownsSelectionsData.platformSelection,
				dropdownsSelectionsData.platformSelectionMobile,
				value,
				1
			);
		}
		if (type === 'pagePag') {
			filterEvents(
				dropdownsSelectionsData.dateRangeSelection,
				dropdownsSelectionsData.coinSelection,
				dropdownsSelectionsData.platformSelection,
				dropdownsSelectionsData.platformSelectionMobile,
				dropdownsSelectionsData.searchSelection,
				value
			);
		}

		if (type === 'clearAll') {
			setPageState(1);
			setDropdownSelectionsData({
				...dropdownsSelectionsData,
				dateRangeSelection: value,
				coinSelection: value,
				platformSelection: value,
				platformSelectionMobile: value,
				searchSelection: value,
			});

			filterEvents(value, value, value, value, value, value, value);
		}
	};
	const filterEvents = (
		dateRange,
		coinId,
		paltformName,
		platformNameMobile,
		searchBy,
		pageNo
	) => {
		let filterURL = '';
		let nextPageFilterURL = '';

		if (dateRange !== '' && dateRange[1] !== null) {
			filterURL =
				filterURL +
				'date[gte]=' +
				dateRange[0].toISOString() +
				'&' +
				'date[lte]=' +
				dateRange[1].toISOString() +
				'&';
			//nextPage
			nextPageFilterURL =
				nextPageFilterURL +
				'dateEvent[gte]=' +
				dateRange[0].toString() +
				'&' +
				'dateEvent[lte]=' +
				dateRange[1].toString() +
				'&';
		}
		if (coinId !== '') {
			filterURL = filterURL + 'coins=' + coinId + '&';
			//nextPage
			nextPageFilterURL = nextPageFilterURL + 'coins=' + coinId + '&';
		}
		if (paltformName !== '') {
			filterURL = filterURL + paltformName + '&';
			//nextPage
			nextPageFilterURL = nextPageFilterURL + paltformName + '&';
		}
		if (platformNameMobile !== '') {
			filterURL = filterURL + platformNameMobile + '&';
			//nextPage
			nextPageFilterURL = nextPageFilterURL + platformNameMobile + '&';
		}
		if (searchBy !== '') {
			filterURL = filterURL + 'search=' + searchBy + '&';
			//nextPage
			nextPageFilterURL = nextPageFilterURL + 'search=' + searchBy + '&';
		}
		if (pageNo > 0) {
			filterURL = filterURL + 'page=' + pageNo + '&';
			//nextPage
			nextPageFilterURL =
				nextPageFilterURL + 'page=' + parseFloat(pageNo + 1) + '&';
		}
		if (dateRange[1] !== null && searchBy === '') {
			getFilteredSocialFeeds(filterURL);
			checkNextPageSocialFeeds(nextPageFilterURL);
		}
		if (dateRange[1] !== null && searchBy.length >= 3) {
			getFilteredSocialFeeds(filterURL);
			checkNextPageSocialFeeds(nextPageFilterURL);
		}
	};

	//Scroll to top
	const socialPageRef = useRef(null);
	const PageScrollToTop = () => {
		(() => {
			socialPageRef.current.scrollIntoView();
		})();
	};

	//Next page data checking when loading first time
	useEffect(() => {
		checkNextPageSocialFeeds('page=2');
	}, []);

	return (
		<div ref={socialPageRef}>
			<div className='container-fluid m-0 p-0'>
				<div className='row m-0 p-0'>
					<MenuBar
						isCoinsDropdownActive={isCoinsDropdownActive}
						setIsCoinsDropdownActive={setIsCoinsDropdownActive}
						coinsDropdownSelected={coinsDropdownSelected}
						setCoinsDropdownSelected={setCoinsDropdownSelected}
						dateRange={dateRange}
						setDateRange={setDateRange}
						startDate={startDate}
						endDate={endDate}
						isPlatformsDropdownActive={isPlatformsDropdownActive}
						setIsPlatformsDropdownActive={setIsPlatformsDropdownActive}
						platformsDropdownSelected={platformsDropdownSelected}
						setPlatformsDropdownSelected={setPlatformsDropdownSelected}
						isPlatformsDropdownMobileActive={isPlatformsDropdownMobileActive}
						setIsPlatformsDropdownMobileActive={
							setIsPlatformsDropdownMobileActive
						}
						platformsDropdownMobileSelected={platformsDropdownMobileSelected}
						setPlatformsDropdownMobileSelected={
							setPlatformsDropdownMobileSelected
						}
						dropdownsSelectionsData={dropdownsSelectionsData}
						setDropdownSelectionsData={setDropdownSelectionsData}
						handleChange={handleChange}
					/>
				</div>
				<div className='row m-0 p-0'>
					<SocialFeedCards />
				</div>
				<SocialNextPrevSection
					pageState={pageState}
					setPageState={setPageState}
					handleChange={handleChange}
					PageScrollToTop={PageScrollToTop}
				/>
			</div>
		</div>
	);
};

SocialFeeds.propTypes = {
	getFilteredSocialFeeds: PropTypes.func.isRequired,
	checkNextPageSocialFeeds: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	socialFeeds: state.socialFeeds,
});

export default connect(mapStateToProps, {
	getFilteredSocialFeeds,
	checkNextPageSocialFeeds,
})(SocialFeeds);
