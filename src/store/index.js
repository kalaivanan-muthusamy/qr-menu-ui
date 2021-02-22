import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./menu/cartSlice";
import restaurantReducer from "./menu/restaurantSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    restaurant: restaurantReducer,
  },
});
