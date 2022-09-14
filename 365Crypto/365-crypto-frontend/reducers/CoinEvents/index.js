import {
	SET_LOADING_TRUE,
	SET_COINS_LOADING_TRUE,
	SET_COINS_LOADING_FALSE,
	SET_LOADING_FALSE,
	GET_COINEVENTCARDS_SUCCESS,
	GET_COINS_SUCCESS,
	GET_FILTERED_COINS_SUCCESS,
	GET_CATEGORIES_SUCCESS,
	GET_FILTERED_COINEVENTCARDS_SUCCESS,
	CHECK_NEXTPAGE_COINEVENTS,
} from '../../actions/types';

const intialState = {
	loadingCards: true,
	loadingCoins: true,
	loadingCategories: true,
	cardsList: null,
	coinsList: null,
	CategoriesList: null,
	pagination: '',
	nextPageCoinEvents: null,
};

export default function (state = intialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_COINEVENTCARDS_SUCCESS:
			return {
				...state,
				cardsList: payload.data,
				loadingCards: false,
				pagination: payload.pagination,
			};
		case GET_COINS_SUCCESS:
			return {
				...state,
				coinsList: payload,
				loadingCoins: false,
			};
		case SET_COINS_LOADING_TRUE:
			return {
				...state,
				loadingCoins: true,
			};
		case SET_COINS_LOADING_FALSE:
			return {
				...state,
				loadingCoins: false,
			};
		case GET_FILTERED_COINS_SUCCESS:
			return {
				...state,
				coinsList: payload,
				loadingCoins: false,
			};
		case GET_CATEGORIES_SUCCESS:
			return {
				...state,
				categoriesList: payload,
				loadingCategories: false,
			};
		case GET_FILTERED_COINEVENTCARDS_SUCCESS:
			return {
				...state,
				cardsList: payload.data,
				loadingCards: false,
				pagination: payload.pagination,
			};

		case SET_LOADING_TRUE:
			return {
				...state,
				loadingCards: true,
			};
		case SET_LOADING_FALSE:
			return {
				...state,
				loadingCards: false,
			};

		case CHECK_NEXTPAGE_COINEVENTS:
			return {
				...state,
				nextPageCoinEvents: payload.data,
			};

		default:
			return state;
	}
}
