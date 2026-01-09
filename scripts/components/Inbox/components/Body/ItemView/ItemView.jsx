import React, { useContext } from "react";

import ComponentLoading from "../../../../ComponentLoading.jsx";
import Content from "./Content/Content.jsx";
import Details from "./Details/Details.jsx";
import { FlexBox } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../../context/translation/TranslationContext";
import useGetItemDetails from "./hooks/useGetItemDetails.js";
import { useReduxSlice } from "./itemView.redux";
import { useStyles } from "./ItemView.styles.js";

const ItemView = () => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const refreshing = useGetItemDetails();

  const { itemsLoading, focusedItem, totalNumberOfItems, items } =
    useReduxSlice();

  if (itemsLoading && totalNumberOfItems === 0) return <ComponentLoading />;

  if (items && totalNumberOfItems === 0) {
    return (
      <FlexBox hAlign="center" vAlign="center">
        <h2>{iln.gettext("No messages found")}</h2>
      </FlexBox>
    );
  }

  return (
    <div className={classes.itemView}>
      <Details item={focusedItem} refreshing={refreshing} />
      <Content item={focusedItem} />
    </div>
  );
};

export default ItemView;
