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
} from '../../actions/types';

const intialState = {
	loadingSocialFeeds: true,
	loadingSocialFeedsCoins: true,
	socialFeedsList: null,
	socialFeedsCoinsList: null,
	pagination: '',
	nextPageSocialFeeds: null,
};

export default function (state = intialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_SOCIALFEEDS_SUCCESS:
			return {
				...state,
				socialFeedsList: payload.data,
				loadingSocialFeeds: false,
				pagination: payload.pagination,
			};
		case GET_SOCIALFEEDS_COINSLIST_SUCCESS:
			return {
				...state,
				socialFeedsCoinsList: payload,
				loadingSocialFeedsCoins: false,
			};

		case SET_SOCIALFEEDS_COINSLIST_LOADING_TRUE:
			return {
				...state,
				loadingSocialFeedsCoins: true,
			};

		case SET_SOCIALFEEDS_COINSLIST_LOADING_FALSE:
			return {
				...state,
				loadingSocialFeedsCoins: false,
			};

		case GET_SOCIALFEEDS_FILTERED_COINSLIST_SUCCESS:
			return {
				...state,
				socialFeedsCoinsList: payload,
				loadingSocialFeedsCoins: false,
			};

		case GET_FILTERED_SOCIALFEEDS_SUCCESS:
			return {
				...state,
				socialFeedsList: payload.data,
				loadingSocialFeeds: false,
				pagination: payload.pagination,
			};

		case SET_SOCIALFEEDS_LOADING_TRUE:
			return {
				...state,
				loadingSocialFeeds: true,
			};
		case SET_SOCIALFEEDS_LOADING_FALSE:
			return {
				...state,
				loadingSocialFeeds: false,
			};

		case CHECK_NEXTPAGE_SOCIALFEEDS:
			return {
				...state,
				nextPageSocialFeeds: payload.data,
			};

		default:
			return state;
	}
}
