import { createSlice } from "@reduxjs/toolkit";

export const restaurantSlice = createSlice({
  name: "cart",
  initialState: {
    restaurantDetails: {},
    branchDetails: {},
    foodItems: {},
    categories: {},
  },
  reducers: {
    setRestaurantDetails: (state, { payload }) => {
      state.restaurantDetails = payload;
    },
    setCategories: (state, { payload }) => {
      state.categories = payload;
    },
    setFoodItems: (state, { payload }) => {
      state.foodItems = payload;
    },
    setBranchDetails: (state, { payload }) => {
      state.branchDetails = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setRestaurantDetails,
  setCategories,
  setFoodItems,
  setBranchDetails,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
