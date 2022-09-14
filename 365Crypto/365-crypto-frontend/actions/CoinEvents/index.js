import axios from 'axios';
import { setAlert } from '../Alert';

import {
	SET_LOADING_TRUE,
	SET_LOADING_FALSE,
	GET_COINEVENTCARDS_SUCCESS,
	GET_COINS_SUCCESS,
	SET_COINS_LOADING_TRUE,
	SET_COINS_LOADING_FALSE,
	GET_FILTERED_COINS_SUCCESS,
	GET_CATEGORIES_SUCCESS,
	GET_FILTERED_COINEVENTCARDS_SUCCESS,
	CHECK_NEXTPAGE_COINEVENTS,
} from '../types';

// SET ENVIRONMENT BASE URL
const BASE_URL = process.env.BASE_URL;

// @desc        Getting Coin Events
// @api         /api/coin-events
// @access      public

export const getCoinEventCards = () => async (dispatch) => {
	dispatch({
		type: SET_LOADING_TRUE,
	});

	try {
		const response = await axios.get(`${BASE_URL}/coin-events?sort=dateEvent`);

		dispatch({
			type: GET_COINEVENTCARDS_SUCCESS,
			payload: response.data,
		});
	} catch (err) {
		console.log(err);
	}
};

// @desc        Getting Coins
// @api         /api/coin-events-coins
// @access      public

export const getCoins = () => async (dispatch) => {
	try {
		const response = await axios.get(`${BASE_URL}/coin?sort=symbol`);

		dispatch({
			type: GET_COINS_SUCCESS,
			payload: response.data.data,
		});
	} catch (err) {
		console.log(err);
	}
};

// @desc        Getting Filtered Coin List
// @api         /api/coin-events-coins{filterURL}
// @access      public

export const getFilteredCoinsList = (filterURL) => async (dispatch) => {
	dispatch({
		type: SET_COINS_LOADING_TRUE,
	});

	try {
		const response = await axios.get(
			`${BASE_URL}/coin?sort=symbol&${filterURL}`
		);

		dispatch({
			type: GET_FILTERED_COINS_SUCCESS,
			payload: response.data.data,
		});
	} catch (err) {
		dispatch({
			type: SET_COINS_LOADING_FALSE,
		});
		console.log(err);
		dispatch(setAlert('No results found', 'error'));
	}
};

// @desc        Getting Categories
// @api         /api/coin-events-categories
// @access      public

export const getCategories = () => async (dispatch) => {
	try {
		const response = await axios.get(`${BASE_URL}/coin-events-categories`);

		dispatch({
			type: GET_CATEGORIES_SUCCESS,
			payload: response.data.data,
		});
	} catch (err) {
		console.log(err);
	}
};

// @desc        Getting Filtered Events
// @api         /api/coin-events?{filterURL}
// @access      public

export const getFilteredEvents = (filterURL) => async (dispatch) => {
	dispatch({
		type: SET_LOADING_TRUE,
	});
	try {
		const response = await axios.get(
			`${BASE_URL}/coin-events?sort=dateEvent&${filterURL}`
		);

		dispatch({
			type: GET_FILTERED_COINEVENTCARDS_SUCCESS,
			payload: response.data,
		});
	} catch (err) {
		dispatch({
			type: SET_LOADING_FALSE,
		});
		console.log(err);
		dispatch(setAlert('No results found', 'error'));
	}
};

// @desc        Check Next Page Coin Events
// @api         /api/coin-events?{filterURL}
// @access      public

export const checkNextPageCoinEvents =
	(nextPageFilterURL) => async (dispatch) => {
		try {
			const response = await axios.get(
				`${BASE_URL}/coin-events?sort=dateEvent&${nextPageFilterURL}`
			);

			dispatch({
				type: CHECK_NEXTPAGE_COINEVENTS,
				payload: response.data,
			});
		} catch (err) {
			console.log(err, 'next coin events page data error');
		}
	};
