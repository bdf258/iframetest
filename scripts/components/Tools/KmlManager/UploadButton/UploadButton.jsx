import { Button, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import KmlEditor from "../KmlEditor/KmlEditor.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./UploadButton.propTypes.js";
import { useStyles } from "./UploadButton.styles.js";

const modalID = "uploadKmlModalID";

const UploadButton = ({ dispatch }) => {
  const classes = useStyles();

  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  return (
    <Button
      customClassNames={classes.createButton}
      onClick={() =>
        modalActions.add({
          id: modalID,
          title: "Upload KML",
          component: <KmlEditor dispatch={dispatch} modalID={modalID} />,
          allowClose: true,
        })
      }
    >
      {iln.gettext("Upload KML")}
    </Button>
  );
};

UploadButton.propTypes = propTypes;

export default UploadButton;
