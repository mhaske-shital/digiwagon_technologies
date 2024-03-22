import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (userData, { dispatch, rejectWithValue }) => {
		try {
			const registeredUser = { id: uuidv4(), ...userData, role: 'customer' };
			dispatch(registerUserSuccess(registeredUser));
			return registeredUser;
		} catch (error) {
			return rejectWithValue(error.message || 'Registration failed');
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState: {
		users: [],
		error: null,
		loading: false,
	},
	reducers: {
		registerUserSuccess: (state, action) => {
			state.users.push(action.payload);
			state.loading = false;
			state.error = null;
		},
	},
});

export const { registerUserSuccess } = userSlice.actions;

export default userSlice.reducer;
