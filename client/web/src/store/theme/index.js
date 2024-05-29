/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	themeConfig: {
		mode: 'light',
		stickyHeader: true,
		pageTransitions: false,
		fontFamily: 'Rubik',
		borderRadius: 2,
	},
	isAuthenticated: false,
};

const THEME_CONFIG_KEY = 'SLIM_MUI_THEME_DATA';
const AUTH_KEY = 'isAuthenticated';

const getInitialState = () => {
	const localStorageData = localStorage.getItem(THEME_CONFIG_KEY);
	const authState = JSON.parse(localStorage.getItem(AUTH_KEY));
	if (localStorageData) {
		return {
			themeConfig: JSON.parse(localStorageData),
			isAuthenticated: authState,
		};
	}
	return initialState;
};

const useSlice = createSlice({
	name: 'themeSlice',
	initialState: getInitialState(),
	reducers: {
		setDefaultConfig: (state) => {
			state.themeConfig = initialState.themeConfig;
		},
		setConfig: (state, action) => {
			state.themeConfig = action.payload;
		},
		setConfigKey: (state, action) => {
			state.themeConfig[action.payload.key] = action.payload.value;
		},
		setAuth: (state, action) => {
			state.isAuthenticated = action.payload;
			localStorage.setItem(AUTH_KEY, JSON.stringify(action.payload));
		},
	},
});

export const { setConfig, setDefaultConfig, setConfigKey, setAuth } = useSlice.actions;

export default useSlice.reducer;
