import React from "react";
import { searchButtonClasses } from "./SearchButtonClasses";
import { Link } from "react-router-dom";
export const SubmitButton = ({ onClick, pair }) => {
  const { fromValue, toValue } = pair;
  return (
    <button onClick={(e) => onClick(e)}>
      <Link to={`${fromValue}${toValue}`} className={searchButtonClasses}>
        SEARCH QUOTES
      </Link>
    </button>
  );
};
