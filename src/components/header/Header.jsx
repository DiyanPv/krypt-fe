import React from "react";
import { Link } from "react-router-dom";
import { SiEthereum } from "react-icons/si";
import { useLocation } from "react-router-dom";
const headerItem = (market, idx, pathname) => {
  const isActive = pathname == market;
  return (
    <Link
      key={`header-market-${idx}`}
      className={`font-mono ${isActive ? `active` : ``}`}
      to={`/${market.toLowerCase()}`}
    >
      {market}
    </Link>
  );
};

export const Header = ({ markets }) => {
  const path = useLocation();
  const pathname = path.pathname.split(`/`)[1].toUpperCase();
  console.log(pathname);
  return (
    <div className="header-wrapper">
      <p className="flex flex-row lg:text-4xl md:text-2xl sm:text-xl">
        <span>{<SiEthereum />}</span>
        <span className="">
          <strong>Krypt</strong>
        </span>
      </p>
      <p className="text-stone-600 lg:text-2xl font-mono sm:text-sm">
        Your Liquidity Provision Assistant
      </p>
      <h2 className="font-serif lg:text-xl">Choose Market:</h2>
      <ul className="flex w-full flex-row items-center lg:text-3xl md:text-2xl grow justify-around border-2">
        {markets.map((market, idx) => headerItem(market, idx, pathname))}
      </ul>
    </div>
  );
};
