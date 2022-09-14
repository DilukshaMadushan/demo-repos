import axios from 'axios';
import { setAlert } from '../Alert';

import {
	SET_SOCIALFEEDS_LOADING_TRUE,
	SET_SOCIALFEEDS_LOADING_FALSE,
	GET_SOCIALFEEDS_SUCCESS,
	GET_SOCIALFEEDS_COINSLIST_SUCCESS,
	SET_SOCIALFEEDS_COINSLIST_LOADING_TRUE,
	SET_SOCIALFEEDS_COINSLIST_LOADING_FALSE,
	GET_SOCIALFEEDS_FILTERED_COINSLIST_SUCCESS,
	GET_FILTERED_SOCIALFEEDS_SUCCESS,
	CHECK_NEXTPAGE_SOCIALFEEDS,
} from '../types';

// SET ENVIRONMENT BASE URL
const BASE_URL = process.env.BASE_URL;

// @desc        Get Social Feeds
// @api         /api/social-feeds
// @access      public

export const getSocialFeeds = () => async (dispatch) => {
	dispatch({
		type: SET_SOCIALFEEDS_LOADING_TRUE,
	});

	try {
		const response = await axios.get(`${BASE_URL}/social-feeds?sort=-date`);

		dispatch({
			type: GET_SOCIALFEEDS_SUCCESS,
			payload: response.data,
		});
	} catch (err) {
		console.log(err);
	}
};

// @desc        Get Social Feeds CoinsList
// @api         /api/coin
// @access      public

export const getSocialFeedsCoins = () => async (dispatch) => {
	try {
		const response = await axios.get(`${BASE_URL}/coin?sort=symbol`);

		dispatch({
			type: GET_SOCIALFEEDS_COINSLIST_SUCCESS,
			payload: response.data.data,
		});
	} catch (err) {
		console.log(err);
	}
};

// @desc        Get Filtered Social Feeds CoinsList
// @api         /api/coin{filterURL}
// @access      public

export const getSocialFeedsFilteredCoinsList =
	(filterURL) => async (dispatch) => {
		dispatch({
			type: SET_SOCIALFEEDS_COINSLIST_LOADING_TRUE,
		});

		try {
			const response = await axios.get(
				`${BASE_URL}/coin?sort=symbol&${filterURL}`
			);

			dispatch({
				type: GET_SOCIALFEEDS_FILTERED_COINSLIST_SUCCESS,
				payload: response.data.data,
			});
		} catch (err) {
			dispatch({
				type: SET_SOCIALFEEDS_COINSLIST_LOADING_FALSE,
			});
			console.log(err);
			dispatch(setAlert('No results found', 'error'));
		}
	};

// @desc        Get Filtered SocialFeeds
// @api         /api/social-feeds?{filterURL}
// @access      public

export const getFilteredSocialFeeds = (filterURL) => async (dispatch) => {
	dispatch({
		type: SET_SOCIALFEEDS_LOADING_TRUE,
	});
	try {
		const response = await axios.get(`${BASE_URL}/social-feeds?${filterURL}`);

		dispatch({
			type: GET_FILTERED_SOCIALFEEDS_SUCCESS,
			payload: response.data,
		});
	} catch (err) {
		dispatch({
			type: SET_SOCIALFEEDS_LOADING_FALSE,
		});
		console.log(err);
		dispatch(setAlert('No results found', 'error'));
	}
};

// @desc        Check Next Page Social Frrds
// @api         /api/social-feeds?{filterURL}
// @access      public

export const checkNextPageSocialFeeds =
	(nextPageFilterURL) => async (dispatch) => {
		try {
			const response = await axios.get(
				`${BASE_URL}/social-feeds?${nextPageFilterURL}`
			);
			console.log(response, 'social res');
			dispatch({
				type: CHECK_NEXTPAGE_SOCIALFEEDS,
				payload: response.data,
			});
		} catch (err) {
			console.log(err, 'next social feeds page data error');
		}
	};
