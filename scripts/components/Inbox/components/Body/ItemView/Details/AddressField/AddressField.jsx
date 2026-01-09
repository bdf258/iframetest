import React from "react";
import { addressFilterType } from "../../../../Header/Filters/FilterTypeSelect/FilterTypeSelect.jsx";
import propTypes from "./propTypes";
import useGetSearchableText from "../../../../../hooks/useGetSearchableText.js";
import { useStyles } from "./styles";
import { useTheme } from "react-jss";

const AddressField = ({ addresses, label }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const addressesValue = (Array.isArray(addresses) ? addresses : [addresses])
    .map((value) => value?.email || (typeof value === "string" ? value : ""))
    .join(", ");

  const searchableText = useGetSearchableText(
    addressesValue,
    addressFilterType
  );

  if (!addresses || addresses?.length <= 0) return null;

  return (
    <div className={classes.addressField}>
      <div className={classes.label}>{label}:</div>
      <div className={classes.addressList}>{searchableText}</div>
    </div>
  );
};
AddressField.propTypes = propTypes;

export default AddressField;
