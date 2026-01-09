import React, { useContext } from "react";

import { Button } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { createUseStyles } from "react-jss";
import downloadCsv from "../helpers/downloadCsv";
import flagsAPI from "../api/src/flags";
import genCsv from "../helpers/csvExport";

const useStyles = createUseStyles({
  buttonSize: {
    fontSize: "1rem",
  },
});

const ExportFlag = () => {
  const iln = useContext(TranslationContext);
  const getAllFlags = () => {
    flagsAPI.searchFlags().then((data) => {
      const csv = genCsv(data);
      downloadCsv(csv, "CSV-Flag-list.csv");
      return false;
    });
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <div style={{ fontSize: "110%" }}>
        <Button
          type="text"
          onClick={getAllFlags}
          customClassNames={classes.buttonSize}
        >
          {iln.gettext("Export Flags To CSV")}
        </Button>
      </div>
    </React.Fragment>
  );
};
export default ExportFlag;
