import React, { useState, useEffect, useRef } from 'react';
import MenuBar from '../../components/CoinEvents/MenuBar';
import CoinEventCards from '../../components/CoinEvents/CoinEventCards';
import EventsNextPrevSection from '../../components/CoinEvents/EventsNextPrevSection';
import { useRouter } from 'next/router';
import Router from 'next/router';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	getFilteredEvents,
	checkNextPageCoinEvents,
} from '../../actions/CoinEvents';
import Footer from '../../components/Layout/Footer';

const CoinEvents = ({
	getFilteredEvents,
	checkNextPageCoinEvents,
	coinEvents: { nextPageCoinEvents },
}) => {
	//Next Prev Btns States
	const [pageState, setPageState] = useState(1);

	//CoinsDropdownStates
	const [isCoinsDropdownActive, setIsCoinsDropdownActive] = useState(false);
	const [coinsDropdownSelected, setCoinsDropdownSelected] = useState('Coins');

	//DateRangeDropdownStates
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;

	//SortByDropdownStates
	const [isSortByDropdownActive, setIsSortByDropdownActive] = useState(false);
	const [sortByDropdownSelected, setSortByDropdownSelected] =
		useState('Sort By');

	//CategoryDropdownStates
	const [isCategoryDropdownActive, setIsCategoryDropdownActive] =
		useState(false);
	const [categoryDropdownSelected, setCategoryDropdownSelected] =
		useState('Category');

	//CategoryDropdownMobileStates
	const [isCategoryDropdownMobileActive, setIsCategoryDropdownMobileActive] =
		useState(false);
	const [categoryDropdownMobileSelected, setCategoryDropdownMobileSelected] =
		useState('Category');

	//dropdownsSelectionsStates
	const [dropdownsSelectionsData, setDropdownSelectionsData] = useState({
		dateRangeSelection: '',
		coinSelection: '',
		categorySelection: '',
		categorySelectionMobile: '',
		sortBySelection: '',
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
				dropdownsSelectionsData.categorySelection,
				dropdownsSelectionsData.categorySelectionMobile,
				dropdownsSelectionsData.sortBySelection,
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
				dropdownsSelectionsData.categorySelection,
				dropdownsSelectionsData.categorySelectionMobile,
				dropdownsSelectionsData.sortBySelection,
				dropdownsSelectionsData.searchSelection,
				1
			);
			setPageState(1);
		}
		if (type === 'selectedCategoryId') {
			setPageState(1);
			setDropdownSelectionsData({
				...dropdownsSelectionsData,
				categorySelection: value,
			});

			filterEvents(
				dropdownsSelectionsData.dateRangeSelection,
				dropdownsSelectionsData.coinSelection,
				value,
				dropdownsSelectionsData.categorySelectionMobile,
				dropdownsSelectionsData.sortBySelection,
				dropdownsSelectionsData.searchSelection,
				1
			);
		}
		if (type === 'selectedMobileCategoryId') {
			setPageState(1);
			setDropdownSelectionsData({
				...dropdownsSelectionsData,
				categorySelectionMobile: value,
			});
			filterEvents(
				dropdownsSelectionsData.dateRangeSelection,
				dropdownsSelectionsData.coinSelection,
				dropdownsSelectionsData.categorySelection,
				value,
				dropdownsSelectionsData.sortBySelection,
				dropdownsSelectionsData.searchSelection,
				1
			);
		}
		if (type === 'selectedSortOption') {
			setPageState(1);
			setDropdownSelectionsData({
				...dropdownsSelectionsData,
				sortBySelection: value,
			});
			filterEvents(
				dropdownsSelectionsData.dateRangeSelection,
				dropdownsSelectionsData.coinSelection,
				dropdownsSelectionsData.categorySelection,
				dropdownsSelectionsData.categorySelectionMobile,
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
				dropdownsSelectionsData.categorySelection,
				dropdownsSelectionsData.categorySelectionMobile,
				dropdownsSelectionsData.sortBySelection,
				value,
				1
			);
		}

		if (type === 'pagePag') {
			filterEvents(
				dropdownsSelectionsData.dateRangeSelection,
				dropdownsSelectionsData.coinSelection,
				dropdownsSelectionsData.categorySelection,
				dropdownsSelectionsData.categorySelectionMobile,
				dropdownsSelectionsData.sortBySelection,
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
				categorySelection: value,
				categorySelectionMobile: value,
				sortBySelection: value,
				searchSelection: value,
			});

			filterEvents(value, value, value, value, value, value, value);
		}
	};

	const filterEvents = (
		dateRange,
		coinId,
		categoryId,
		categoryIdMobile,
		sortBy,
		searchBy,
		pageNo
	) => {
		let filterURL = '';
		let nextPageFilterURL = '';

		if (dateRange !== '' && dateRange[1] !== null) {
			filterURL =
				filterURL +
				'dateEvent[gte]=' +
				dateRange[0].toString() +
				'&' +
				'dateEvent[lte]=' +
				dateRange[1].toString() +
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
		if (categoryId !== '') {
			filterURL = filterURL + 'categories=' + categoryId + '&';
			//nextPage
			nextPageFilterURL = nextPageFilterURL + 'categories=' + categoryId + '&';
		}
		if (categoryIdMobile !== '') {
			filterURL = filterURL + 'categories=' + categoryIdMobile + '&';
			//nextPage
			nextPageFilterURL =
				nextPageFilterURL + 'categories=' + categoryIdMobile + '&';
		}
		if (sortBy !== '') {
			filterURL = filterURL + sortBy + '&';
			//nextPage
			nextPageFilterURL = nextPageFilterURL + sortBy + '&';
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
			getFilteredEvents(filterURL);
			checkNextPageCoinEvents(nextPageFilterURL);
		}
		if (dateRange[1] !== null && searchBy.length >= 3) {
			getFilteredEvents(filterURL);
			checkNextPageCoinEvents(nextPageFilterURL);
		}
	};

	//Scroll to top
	const eventsPageRef = useRef(null);
	const PageScrollToTop = () => {
		(() => {
			eventsPageRef.current.scrollIntoView();
		})();
	};
	//Next page data checking when loading first time
	useEffect(() => {
		checkNextPageCoinEvents('page=2');
	}, []);

	return (
		<div ref={eventsPageRef}>
			<div className='container-fluid m-0 p-0'>
				<div className='row mt-3 m-0 p-0'>
					<MenuBar
						isCoinsDropdownActive={isCoinsDropdownActive}
						setIsCoinsDropdownActive={setIsCoinsDropdownActive}
						coinsDropdownSelected={coinsDropdownSelected}
						setCoinsDropdownSelected={setCoinsDropdownSelected}
						dateRange={dateRange}
						setDateRange={setDateRange}
						startDate={startDate}
						endDate={endDate}
						isSortByDropdownActive={isSortByDropdownActive}
						setIsSortByDropdownActive={setIsSortByDropdownActive}
						sortByDropdownSelected={sortByDropdownSelected}
						setSortByDropdownSelected={setSortByDropdownSelected}
						isCategoryDropdownActive={isCategoryDropdownActive}
						setIsCategoryDropdownActive={setIsCategoryDropdownActive}
						categoryDropdownSelected={categoryDropdownSelected}
						setCategoryDropdownSelected={setCategoryDropdownSelected}
						isCategoryDropdownMobileActive={isCategoryDropdownMobileActive}
						setIsCategoryDropdownMobileActive={
							setIsCategoryDropdownMobileActive
						}
						categoryDropdownMobileSelected={categoryDropdownMobileSelected}
						setCategoryDropdownMobileSelected={
							setCategoryDropdownMobileSelected
						}
						pageState={pageState}
						dropdownsSelectionsData={dropdownsSelectionsData}
						setDropdownSelectionsData={setDropdownSelectionsData}
						handleChange={handleChange}
					/>
				</div>
				<div className='row m-0 p-0'>
					<CoinEventCards />
				</div>
				<EventsNextPrevSection
					pageState={pageState}
					setPageState={setPageState}
					handleChange={handleChange}
					PageScrollToTop={PageScrollToTop}
				/>
			</div>
		</div>
	);
};

CoinEvents.propTypes = {
	getFilteredEvents: PropTypes.func.isRequired,
	checkNextPageCoinEvents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	coinEvents: state.coinEvents,
});

export default connect(mapStateToProps, {
	getFilteredEvents,
	checkNextPageCoinEvents,
})(CoinEvents);
