import { Button, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import ExportAsCSV from "./ExportAsCSV/ExportAsCSV.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./ExportAsCSVButton.propTypes.js";
import useStyles from "./ExportAsCSVButton.styles.js";

const exportCSVModalID = "casesPageExportCasesAsCSVModalID";

const ExportAsCSVButton = ({ state }) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  return (
    <Button
      customClassNames={classes.exportAsCSVButton}
      type="text"
      isDisabled={!state?.results?.cases || state?.results?.totalResults === 0}
      onClick={() =>
        modalActions.add({
          id: exportCSVModalID,
          title: iln.gettext("Export Cases to CSV"),
          component: <ExportAsCSV state={state} modalID={exportCSVModalID} />,
        })
      }
    >
      {iln.gettext("Export Cases to CSV")}
    </Button>
  );
};

ExportAsCSVButton.propTypes = propTypes;

export default ExportAsCSVButton;
