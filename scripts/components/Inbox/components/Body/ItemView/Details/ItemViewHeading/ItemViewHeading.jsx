import React from "react";
import { addressFilterType } from "../../../../Header/Filters/FilterTypeSelect/FilterTypeSelect.jsx";
import propTypes from "./ItemViewHeading.propTypes";
import useGetSearchableText from "../../../../../hooks/useGetSearchableText.js";
import { useReduxSlice } from "./ItemViewHeading.redux";
import { useStyles } from "./ItemViewHeading.styles";

const getHeadingValue = ({ to, from } = {}, inboxType) => {
  const toOrFrom = inboxType === "inbox" ? from : to;
  const value = (Array.isArray(toOrFrom) ? toOrFrom : [toOrFrom])[0];

  return value?.name && value?.email
    ? `${from?.name} <${from?.email}>`
    : value?.name || value?.email || (typeof value === "string" ? value : "");
};

const ItemViewHeading = ({ item }) => {
  const classes = useStyles();

  const { inboxType } = useReduxSlice();

  const headingValue = getHeadingValue(item, inboxType);
  const searchableText = useGetSearchableText(headingValue, addressFilterType);

  return <strong className={classes.from}>{searchableText}</strong>;
};

ItemViewHeading.propTypes = propTypes;

export default ItemViewHeading;
