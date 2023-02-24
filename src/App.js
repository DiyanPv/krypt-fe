import { CryptoResults } from "./components/cryptoresults/CryptoResults";
import { Header } from "./components/header/Header";
import { SearchForm } from "./components/searchForm/Form";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const markets = ["BINANCE", "HUOBI", "KRAKEN", "BITFINEX"];

  return (
    <div className="app">
      <div className="app-homescreen">
        <Header />
        <SearchForm markets={markets} />
        <CryptoResults />
      </div>
    </div>
  );
}

export default App;
