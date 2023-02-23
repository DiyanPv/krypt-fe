import "./App.css";
import { Header } from "./components/header/Header";
import { SearchForm } from "./components/searchForm/Form";
function App() {
  const markets = ["BINANCE", "HUOBI", "KRAKEN", "BITFINEX"];

  return (
    <div className="app">
      <div className="app-homescreen">
        <Header markets={markets} />
        <SearchForm />
      </div>
    </div>
  );
}

export default App;
