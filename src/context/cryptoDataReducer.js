import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getMarketDataForPair,
  getLastHourDataForPair,
  // getCryptoDataFromWebsocket,
} from "../services";

export const fetchMarketDataPerPair = createAsyncThunk(
  "crypto/getCryptoPrice",
  async (payload) => {
    const { from, to, market } = payload;
    const res = await getMarketDataForPair(from, to, market);
    return { market, res };
  }
);

export const fetchHourlyPreviousDataPerPair = createAsyncThunk(
  "crypto/getCryptoHourlyData",
  async (payload) => {
    const { from, to, market } = payload;
    const res = await getLastHourDataForPair(from, to, market);

    return { [market]: res };
  }
);

const initialState = {
  cryptoPairPriceLoading: false,
  cryptoHistoryDataLoading: false,
  error: null,
  cryptoPairsPerMarket: {},
  cryptoHistoryPerPair: [],
};

const cryptoDataReducer = createSlice({
  name: `cryptoData`,
  initialState,
  reducers: {
    getCryptoHistoryPerMarketAndPair: (state, payload) => {
      const { pair, market } = payload;
      return state.cryptoHistoryPerPair[market][pair];
    },
  },
  extraReducers: (builder) => {
    // CASES FOR MARKET DATA PRICE
    builder.addCase(fetchMarketDataPerPair.fulfilled, (state, action) => {
      state.cryptoPairPriceLoading = false;
      const { market, res } = action.payload;
      const pair = Object.keys(res)[0];
      if (isNaN(res[pair])) {
        state.error = res;
        return;
      }

      if (!state.cryptoPairsPerMarket[market])
        state.cryptoPairsPerMarket[market] = {};
      state.cryptoPairsPerMarket[market][pair] = res[pair];
      if (state.error !== null) {
        return;
      }
      state.error = null;
    });
    builder.addCase(fetchMarketDataPerPair.rejected, (state) => {
      state.cryptoPairPriceLoading = false;
      if (state.error !== null) {
        return;
      }
      state.error = null;
    });
    builder.addCase(fetchMarketDataPerPair.pending, (state) => {
      state.cryptoPairPriceLoading = true;
      if (state.error !== null) {
        return;
      }
      state.error = null;
    });

    // CASES FOR PREVIOUS DATA
    builder.addCase(
      fetchHourlyPreviousDataPerPair.fulfilled,
      (state, action) => {
        state.cryptoHistoryDataLoading = false;
        const market = Object.keys(action.payload)[0];
        const pair = Object.keys(action.payload[market])[0];
        const data = action.payload[market][pair];
        if (!Array.isArray(data)) {
          state.error = action.payload;
          return;
        }

        if (!state.cryproHistoryPerPair) {
          state.cryptoHistoryPerPair = [];
        }

        state.cryptoHistoryPerPair.push({ [market]: data });
      }
    );
    builder.addCase(fetchHourlyPreviousDataPerPair.rejected, (state) => {
      state.cryptoHistoryDataLoading = false;
      state.error = null;
    });
    builder.addCase(fetchHourlyPreviousDataPerPair.pending, (state) => {
      state.cryptoHistoryDataLoading = true;
      state.error = null;
    });
  },
});

export const { addCryptoPair } = cryptoDataReducer.actions;

export default cryptoDataReducer.reducer;
