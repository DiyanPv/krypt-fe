// import { Modal } from "@mui/material";
import { SubmitButton } from "../searchButton/SearchButton";
import { Input } from "../inputField/Input";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchMarketDataPerPair } from "../../context/cryptoDataReducer";
import { useDispatch } from "react-redux";

export const SearchForm = ({ markets }) => {
  const dispatch = useDispatch();
  const market = useLocation().pathname.split(`/`)[1];

  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchMarketDataPerPair({ from: fromValue, to: toValue, market }));
  };

  return (
    <div className="flex flex-col h-full w-full items-center gap-12 ">
      <div className="flex flex-row w-full justify-around ">
        <Input
          label={"BUY"}
          name={"BUY"}
          value={fromValue.toUpperCase()}
          onChangeHandler={(e) => setFromValue(e.target.value)}
        />

        <SubmitButton onClick={(e) => onSubmit(e)} />

        <Input
          label={"SELL"}
          name={"SELL"}
          value={toValue.toUpperCase()}
          onChangeHandler={(e) => setToValue(e.target.value)}
        />
      </div>
      {/* <Modal /> */}
    </div>
  );
};
