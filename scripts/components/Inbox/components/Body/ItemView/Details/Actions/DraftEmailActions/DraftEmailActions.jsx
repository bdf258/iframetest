import { ButtonBar } from "@electedtech/electedtech-ui";
import Delete from "../common/Delete/Delete.jsx";
import Edit from "./Edit/Edit.jsx";
import React from "react";
import { useStyles } from "./DraftEmailActions.styles";

const DraftEmailActions = ({ email, constituent }) => {
  const classes = useStyles();

  return (
    <div className={classes.actions}>
      <ButtonBar>
        <Edit email={email} constituent={constituent} />
        <Delete item={email} constituent={constituent} />
      </ButtonBar>
    </div>
  );
};

DraftEmailActions.propTypes;

export default DraftEmailActions;
