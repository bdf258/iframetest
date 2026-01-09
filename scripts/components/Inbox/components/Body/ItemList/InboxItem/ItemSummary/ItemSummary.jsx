import { FlexBox } from "@electedtech/electedtech-ui";
import React from "react";
import { bodyFilterType } from "../../../../Header/Filters/FilterTypeSelect/FilterTypeSelect.jsx";
import propTypes from "./ItemSummary.propTypes.js";
import useGetSearchableText from "../../../../../hooks/useGetSearchableText.js";
import { useStyles } from "./ItemSummary.styles.js";

const ItemSummary = ({ summary }) => {
  const classes = useStyles();

  const searchableText = useGetSearchableText(summary, bodyFilterType);

  return (
    <FlexBox>
      <div className={classes.summary}>
        {searchableText}
        {summary.trim() !== "" && summary.length >= 85 && "..."}
      </div>
    </FlexBox>
  );
};

ItemSummary.propTypes = propTypes;

export default ItemSummary;
