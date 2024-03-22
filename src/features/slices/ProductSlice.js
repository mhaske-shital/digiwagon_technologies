import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            localStorage.setItem('products', JSON.stringify(state.products));
        },
    },
});

export const { addProduct } = productSlice.actions;

export const selectProducts = (state) => state.product.products;

export default productSlice.reducer;
