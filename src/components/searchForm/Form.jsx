import { SubmitButton } from "../searchButton/SearchButton";
import { Input } from "../inputField/Input";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { queryMarketData } from "../../utils";

export const SearchForm = () => {
  let { pathname } = useLocation();
  pathname = pathname.split(`/`)[1];
  const [isLoading, setIsLoading] = useState(false);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [orderBook, setOrderBook] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await queryMarketData(fromValue, toValue, pathname);
  };

  return (
    <div className="flex flex-col h-full w-full items-center gap-12">
      <div className="flex flex-row w-full justify-around">
        <Input
          label={"BUY"}
          name={"BUY"}
          value={fromValue.toUpperCase()}
          onChangeHandler={(e) => setFromValue(e.target.value)}
        />
        <Input
          label={"SELL"}
          name={"SELL"}
          value={toValue.toUpperCase()}
          onChangeHandler={(e) => setToValue(e.target.value)}
        />
      </div>
      <SubmitButton onClick={(e) => onSubmit(e)} />
    </div>
  );
};
