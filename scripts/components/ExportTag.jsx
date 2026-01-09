import React, { useContext } from "react";

import { Button } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { createUseStyles } from "react-jss";
import downloadCsv from "../helpers/downloadCsv";
import genCsv from "../helpers/csvExport";
import tagsAPI from "../api/src/tags";

const useStyles = createUseStyles({
  buttonSize: {
    fontSize: "1rem",
  },
});

const ExportTag = () => {
  const iln = useContext(TranslationContext);

  const getAllTags = () => {
    tagsAPI.searchTags().then((data) => {
      const csv = genCsv(data);
      downloadCsv(csv, "CSV-Tag-list.csv");
      return false;
    });
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <div style={{ fontSize: "110%" }}>
        <Button
          type="text"
          onClick={getAllTags}
          customClassNames={classes.buttonSize}
        >
          {iln.gettext("Export Tags To CSV")}
        </Button>
      </div>
    </React.Fragment>
  );
};
export default ExportTag;
