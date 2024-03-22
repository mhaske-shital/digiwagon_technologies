import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware, { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import AdminSlice from './slices/AdminSlice';
import UserSlice from './slices/UserSlice';
import { composeWithDevTools } from 'redux-devtools-extension';
import LoginSlice from './slices/LoginSlice';
import productSlice from './slices/ProductSlice';


const rootReducer = combineReducers({
	user: UserSlice,
	admin: AdminSlice,
	auth: LoginSlice,
	product: productSlice
});

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['user', 'admin', 'product', 'auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);

export { store, persistor };
