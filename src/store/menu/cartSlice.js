import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionId: null,
  orderDetails: {},
  sessionDetails: {},
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.sessionId = null;
      state.orderDetails = {};
      state.sessionDetails = {};
      state.cartItems = [];
    },
    setSessionId: (state, { payload }) => {
      state.sessionId = payload;
    },
    setOrderDetails: (state, { payload }) => {
      state.orderDetails = payload;
    },
    setSessionDetails: (state, { payload }) => {
      state.sessionDetails = payload;
    },
    clearCartItems: (state) => {
      state.cartItems = [];
    },
    addItemToCart: (state, { payload }) => {
      const existingItem = state.cartItems.find(
        (item) => item.foodItemId === payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          name: payload.name,
          foodItemId: payload._id,
          price: payload.salePrice,
          quantity: 1,
        });
      }
    },
    removeItemFromCart: (state, { payload }) => {
      const existingItem = state.cartItems.find(
        (item) => item.foodItemId === payload._id
      );
      if (existingItem && existingItem.quantity >= 1) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          const index = state.cartItems.findIndex(
            (item) => item.foodItemId === payload._id
          );
          state.cartItems.splice(index, 1);
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearCart,
  addItemToCart,
  removeItemFromCart,
  setSessionId,
  setOrderDetails,
  setSessionDetails,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
