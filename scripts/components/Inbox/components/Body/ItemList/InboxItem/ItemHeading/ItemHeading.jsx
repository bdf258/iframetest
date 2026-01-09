import React from "react";
import { addressFilterType } from "../../../../Header/Filters/FilterTypeSelect/FilterTypeSelect.jsx";
import propTypes from "./ItemHeading.propTypes.js";
import useGetSearchableText from "../../../../../hooks/useGetSearchableText.js";
import { useReduxSlice } from "./ItemHeading.redux.js";

const getHeadingValue = ({ to, from } = {}, inboxType) => {
  const toOrFrom = inboxType === "inbox" ? from : to;
  const isTo = inboxType !== "inbox"; 
  const value = (Array.isArray(toOrFrom) ? toOrFrom : [toOrFrom])[0];

  let headingValue =
    value?.name ||
    value?.email ||
    (["number", "string"].includes(typeof value) ? value : "");

  if (isTo && headingValue === "") {
    headingValue = "No recipient specified";
  }

  return headingValue;
};

const ItemHeading = ({ item }) => {
  const { inboxType } = useReduxSlice();

  const headingValue = getHeadingValue(item, inboxType);
  const searchableText = useGetSearchableText(headingValue, addressFilterType);

  return <strong>{searchableText}</strong>;
};

ItemHeading.propTypes = propTypes;

export default ItemHeading;
