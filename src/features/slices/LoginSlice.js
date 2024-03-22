import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
	name: 'admin',
	initialState: {
		isAuthenticated: false,
	},
	reducers: {
		loginSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.admin = action.payload;
		},
		logOut: (state, action) => {
			state.isAuthenticated = false;
			state.admin = action.payload;
		}
	},
});

export const { loginSuccess ,logOut} = loginSlice.actions;

export default loginSlice.reducer;
