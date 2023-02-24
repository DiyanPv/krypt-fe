// import { Modal } from "@mui/material";
import { SubmitButton } from "../searchButton/SearchButton";
import { Input } from "../inputField/Input";
import React, { useState } from "react";
import { fetchMarketDataPerPair } from "../../context/cryptoDataReducer";
import { useDispatch } from "react-redux";

export const SearchForm = ({ markets }) => {
  const dispatch = useDispatch();

  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    markets.map((market) => {
      dispatch(
        fetchMarketDataPerPair({
          from: fromValue.toUpperCase(),
          to: toValue.toUpperCase(),
          market,
        })
      );
    });

    setToValue(``);
    setFromValue(``);
  };

  return (
    <div className="flex flex-col h-full w-full items-center gap-12 ">
      <div className="flex flex-col w-full justify-between gap-10 items-center">
        <div className={`flex flex-row w-full justify-center gap-2`}>
          <Input
            label={"BUY"}
            name={"BUY"}
            value={fromValue.toUpperCase()}
            onChangeHandler={(e) => setFromValue(e.target.value.toUpperCase())}
          />

          <Input
            label={"SELL"}
            name={"SELL"}
            value={toValue.toUpperCase()}
            onChangeHandler={(e) => setToValue(e.target.value.toUpperCase())}
          />
        </div>
        <SubmitButton
          onClick={(e) => onSubmit(e)}
          pair={{ fromValue, toValue }}
        />
      </div>
    </div>
  );
};
