import { Button, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import BulkActions from "./BulkActions/BulkActions.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./BulkActionsButton.propTypes.js";
import useStyles from "./BulkActionsButton.styles.js";

const bulkActionsModalID = "casesPageBulkActionsModalID";

const BulkActionsButton = ({ state, dispatch }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  return (
    <Button
      customClassNames={classes.button}
      type="text"
      isDisabled={!state?.results?.cases || state?.results?.totalResults === 0}
      onClick={() =>
        modalActions.add({
          id: bulkActionsModalID,
          title: iln.gettext("Bulk Actions"),
          component: (
            <BulkActions
              state={state}
              dispatch={dispatch}
              modalID={bulkActionsModalID}
            />
          ),
        })
      }
    >
      {iln.gettext("Take Bulk Action")}
    </Button>
  );
};

BulkActionsButton.propTypes = propTypes;

export default BulkActionsButton;
