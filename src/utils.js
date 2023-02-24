const cc = require("cryptocompare");

export const getMarketDataForPair = async (from, to, market) => {
  if (from && to && market) {
    try {
      const pair = `${from}-${to}`;
      const res = await cc.price(from, to, { exchanges: [market] });
      const price = res[to.toUpperCase()].toFixed(4);

      return {
        [pair]: price,
      };
    } catch (err) {
      return err;
    }
  } else {
    return `Can not search without input data or chosen market`;
  }
};

export const getLastHourDataForPair = async (from, to, market) => {
  if (from && to && market) {
    const pair = `${from}-${to}`;
    const historyData = await cc.histoHour(from, to, {
      exchange: market,
      limit: 5,
    });

    return {
      [pair]: historyData.map((item) => ({ low: item.low, high: item.high })),
    };
  } else {
    return `Error with getting history for pair ${from}-${to} in market ${market}`;
  }
};

const ws = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?subscribe=MARKETNAME~PAIRNAME`
);

export const getCryptoDataFromWebsocket = (from, to, market) => {
  // example socket connection 'wss://streamer.cryptocompare.com/v2?subscribe=binance~BTC~ETH'
  const ws = new WebSocket(
    `wss://streamer.cryptocompare.com/v2?subscribe=${market.toLowerCase()}~${from}~${to}`
  );
  ws.onopen = () => {
    console.log("WebSocket connection established");
  };

  ws.onmessage = (event) => {
    console.log(event)
    const data = JSON.parse(event.data);
    console.log(data);
  };
};

getCryptoDataFromWebsocket(`BTC`, `USDT`, `huobi`);

// import ccxt from "ccxt";
// const httpProxy = require("http-proxy");
// const proxy = `http://localhost:3000/`;
// const agent = new httpProxy(proxy);
// const mapData = (data) => {};

// const queryMarketData = async (pair, market) => {
//   console.log(`market is => ${market}`);
//   if (market == `huobi`) {
//     market = `huobipro`;
//   }
//   console.log(ccxt.huobipro.markets);
//   const exchangeMarket = new ccxt[market]({
//     agent,
//   });
//   console.log("exh market => ", exchangeMarket);

//   try {
//     const res = await exchangeMarket.fetchTicker(pair);
//     console.log(res);
//     return res;
//   } catch (err) {
//     console.log(err);
//     return `${market} has no data for: ${pair}`;
//   }
// };

// export const getDataForMakret = async (market, from, to) => {
//   // checking for available crypto pair in the selected market
//   if (from && to) {
//     const pair = `${from}/${to}`;
//     const price = await queryMarketData(pair, market);
//     if (isNaN(price)) {
//       return { error: price };
//     }
//     return { pair: price };
//   }

//   // update the already present data
// }; DEPRECATED
