import React from "react";
import { searchButtonClasses } from "./SearchButtonClasses";
export const SubmitButton = ({ onClick, pair }) => {
  return (
    <button onClick={(e) => onClick(e)} className={searchButtonClasses}>
      SEARCH QUOTES
    </button>
  );
};
