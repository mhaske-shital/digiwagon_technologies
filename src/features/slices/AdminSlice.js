import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const registerAdmin = createAsyncThunk(
	'admin/registerAdmin',
	async (adminData, { dispatch, rejectWithValue }) => {
		try {
			const registeredAdmin = { id: uuidv4(), ...adminData, role: 'admin' };
			dispatch(registerAdminSuccess(registeredAdmin));
			return registeredAdmin;
		} catch (error) {
			return rejectWithValue(error.message || 'Admin registration failed');
		}
	}
);

const adminSlice = createSlice({
	name: 'admin',
	initialState: {
		admins: [],
		error: null,
		loading: false,
	},
	reducers: {
		registerAdminSuccess: (state, action) => {
			console.log(action.payload)
			state.admins.push(action.payload);
			state.loading = false;
			state.error = null;
		},
	},
});

export const { registerAdminSuccess } = adminSlice.actions;

export default adminSlice.reducer;
