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
    return `Input data required!`;
  }
};

export const getLastHourDataForPair = async (from, to, market) => {
  if (from && to && market) {
    const pair = `${from}-${to}`;

    const historyData = await cc.histoHour(from, to, {
      exchange: market,
      limit: 3,
    });
    return {
      [pair]: historyData.map((item) => ({ low: item.low, high: item.high })),
    };
  } else {
    return `Error with getting history for pair ${from}-${to} in market ${market}`;
  }
};


//attempt to connect to cryptocompare's websocket API. Leaving it for reference
// export const connectToCryptoCompare = (from, to, market) => {
//   const socket = new WebSocket(
//     `wss://streamer.cryptocompare.com/v2?api_key=${window.MY_API_KEY}`
//   );

//   socket.addEventListener("open", (event) => {
//     console.log("Connected to CryptoCompare WebSocket");

//     const subRequest = {
//       action: "SubAdd",
//       subs: [`5~${market}~${from}~${to}`],
//     };

//     socket.send(JSON.stringify(subRequest));
//     console.log("Subscribed to BTC/USD price updates");
//   });

//   socket.addEventListener("message", (event) => {
//     try {
//       const message = JSON.parse(event.data);
//       const pair = `${from}-${to}`;
//       console.log(message.PRICE);
//       // return { [pair]: message.PRICE.toFixed(4) };
//     } catch (err) {
//       return err;
//     }
//   });

//   socket.addEventListener("error", (event) => {
//     console.error("WebSocket error:", event);
//   });
// };
// import ccxt from "ccxt";
// const httpProxy = require("http-proxy");
// const proxy = `http://localhost:3000/`;
// const agent = new httpProxy(proxy);
// const mapData = (data) => {};

// const queryMarketData = async (pair, market) => {
//   if (market == `huobi`) {
//     market = `huobipro`;
//   }
//   console.log(ccxt.huobipro.markets);
//   const exchangeMarket = new ccxt[market]({
//     agent,
//   });

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
