import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./components/pages/Home/Home";
import { NoMatch } from "./components/404Page/NoMatch";
import "./App.css";

function App() {
  const markets = ["BINANCE", "HUOBI", "KRAKEN", "BITFINEX"];
  const marketPair = useLocation().pathname.split(`/`)[1].toUpperCase();
  return (
    <Routes>
      <Route element={<Home markets={markets} />} path={`/`} />
      <Route
        element={<Home markets={markets} marketPair={marketPair} />}
        path={`/${marketPair}`}
      />
      <Route
        element={
          <Home markets={markets} marketPair={marketPair} isOpen={true} />
        }
        path={`/${marketPair}/details`}
      />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
