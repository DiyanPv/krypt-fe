import React from "react";
import { useState } from "react";
import { searchButtonClasses } from "./SearchButtonClasses";
export const SubmitButton = ({ onClick }) => {
  return (
    <button className={searchButtonClasses} onClick={(e) => onClick(e)}>
      Search quotes
    </button>
  );
};
