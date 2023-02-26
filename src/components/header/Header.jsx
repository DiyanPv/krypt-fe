import React from "react";
import { Link } from "react-router-dom";
import { SiEthereum } from "react-icons/si";

export const Header = () => {
  return (
    <div className="header-wrapper">
      <Link to={`/`}>
        <p className="flex flex-row lg:text-4xl md:text-2xl sm:text-xl">
          <span>{<SiEthereum />}</span>
          <span className="">
            <strong>Krypt</strong>
          </span>
        </p>
      </Link>
      <p className="text-stone-600 lg:text-2xl font-mono sm:text-sm mb-20">
        Your Liquidity Provision Assistant
      </p>
    </div>
  );
};
