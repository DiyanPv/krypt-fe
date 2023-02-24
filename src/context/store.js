import { configureStore } from "@reduxjs/toolkit";
import cryptoDataReducer from "./cryptoDataReducer";

export const store = configureStore({
  reducer: {
    cryptoData: cryptoDataReducer,
  },
});
