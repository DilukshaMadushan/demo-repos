import { SET_THEME_OPPOSITE, SET_TAB_STATE } from '../../actions/types';

const initialState = {
	darkThemeState: true,
	tabState: 'Home',
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_THEME_OPPOSITE:
			return {
				...state,
				darkThemeState: payload,
			};
		case SET_TAB_STATE:
			return {
				...state,
				tabState: payload,
			};
		default:
			return state;
	}
}
