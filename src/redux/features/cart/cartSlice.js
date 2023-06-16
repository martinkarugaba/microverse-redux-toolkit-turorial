import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../../cartItems";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: cartItems,
  amount: 5,
  total: 0,
  isLoading: true,
  error: false,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  () => {
    return fetch(url).then((res) =>
      res.json().catch((err) => console.log(err))
    );
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== itemId
      );
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.pending]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const { clearCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
