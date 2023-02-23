import { configureStore } from "@reduxjs/toolkit";
import { pricesReducer } from "./pricesReducer";
export const store = configureStore({
  reducer: {
    prices: pricesReducer,
  },
});
