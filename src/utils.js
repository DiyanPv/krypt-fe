const cc = require("cryptocompare");

export const queryMarketData = async (from, to, market) => {
  if (from && to && market) {
    try {
      const res = await cc.price(from, to, { exchanges: [market] });
      const price = res[to.toUpperCase()].toFixed(4);
      console.log(price);
      //returns price = Number
      return price;
    } catch (err) {
      //returns string
      console.log(err);
      return err;
    }
  } else {
    return `Can not search without input data`;
  }
};

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
