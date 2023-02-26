import { Header } from "../../header/Header";
import { SearchForm } from "../../searchForm/Form";
import { CryptoResults } from "../../cryptoresults/CryptoResults";
import { Error } from "../../Error/Error";
export const Home = ({ markets, marketPair, isOpen }) => {
  return (
    <div className="app">
      <div className="app-homescreen">
        <Header />
        {marketPair ? `` : <SearchForm markets={markets} />}
        <Error />
        <CryptoResults
          marketPair={marketPair}
          markets={markets}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
};
