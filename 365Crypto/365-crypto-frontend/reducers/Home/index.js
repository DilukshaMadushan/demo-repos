import { PhoneCallbackOutlined } from '@material-ui/icons';
import {
	GET_WELCOME_COINEVENTS_SUCCESS,
	GET_WELCOME_SOCIALFEEDS_SUCCESS,
	GET_WELCOME_CRYPTONEWS_SUCCESS,
	SHOW_LEARNMOREABOUT365,
	HIDE_LEARNMOREABOUT365,
	SUBSCRIPTION_SUCCESS,
	SUBSCRIPTION_SUCCESS_FALSE,
	GET_FITEREDCOINS_MARKETDATA,
	SET_FILTERED_COINS_NULL,
} from '../../actions/types';

const intialState = {
	loadingWelcomeCoinEvents: true,
	loadingWelcomeSocialFeeds: true,
	loadingWelcomeCryptoNews: true,
	welcomeCoinEventsList: null,
	welcomeSocialFeedsList: null,
	welcomeCryptoNewsList: null,
	learnMoreAbout365PopUpVisibility: false,
	subscriptionStatus: '',
	subscriptionSuccess: false,
	marketDataFilteredCoinsList: null,
};

export default function (state = intialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_WELCOME_COINEVENTS_SUCCESS:
			return {
				...state,
				welcomeCoinEventsList: payload,
				loadingWelcomeCoinEvents: false,
			};

		case GET_WELCOME_SOCIALFEEDS_SUCCESS:
			return {
				...state,
				welcomeSocialFeedsList: payload,
				loadingWelcomeSocialFeeds: false,
			};

		case GET_WELCOME_CRYPTONEWS_SUCCESS:
			return {
				...state,
				welcomeCryptoNewsList: payload,
				loadingWelcomeCryptoNews: false,
			};

		case SHOW_LEARNMOREABOUT365:
			return {
				...state,
				learnMoreAbout365PopUpVisibility: true,
			};
		case HIDE_LEARNMOREABOUT365:
			return {
				...state,
				learnMoreAbout365PopUpVisibility: false,
			};
		case SUBSCRIPTION_SUCCESS:
			return {
				...state,
				subscriptionStatus: payload.data,
				subscriptionSuccess: payload.success,
			};
		case SUBSCRIPTION_SUCCESS_FALSE:
			return {
				...state,
				subscriptionSuccess: false,
			};

		case GET_FITEREDCOINS_MARKETDATA:
			return {
				...state,
				marketDataFilteredCoinsList: payload,
			};

		case SET_FILTERED_COINS_NULL:
			return {
				...state,
				marketDataFilteredCoinsList: null,
			};

		default:
			return state;
	}
}
