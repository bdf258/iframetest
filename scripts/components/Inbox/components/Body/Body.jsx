import { Card } from "@electedtech/electedtech-ui";
import ItemList from "./ItemList/";
import ItemView from "./ItemView/";
import React from "react";
import propTypes from "./propTypes";
import { useStyles } from "./styles";

const Body = () => {
  const classes = useStyles();

  return (
    <Card className={classes.inboxBody}>
      <ItemList />
      <ItemView />
    </Card>
  );
};

Body.propTypes = propTypes;

export default Body;
