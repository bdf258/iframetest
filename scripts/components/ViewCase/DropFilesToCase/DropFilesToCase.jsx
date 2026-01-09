import React, { useContext } from "react";
import {
  caseAttachmentFileTypes,
  caseMaxFileUploadSize,
} from "../../../consts/fileUpload.js";

import DropTarget from "../../common/FileDropTarget/index.js";
import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { getQueryStringParamMap } from "../../../helpers/queryString.js";
import { installationPreferences } from "../../../helpers/localStorageHelper";
import propTypes from "./DropFilesToCase.propTypes.js";
import { useReduxSlice } from "./DropFilesToCase.redux.js";
import { useStyles } from "./DropFilesToCase.styles.js";

const locale = installationPreferences.locale;
const caseID = parseInt(getQueryStringParamMap().get("caseID"));

const DropFilesToCase = ({ modalID }) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const { addCasenote } = useReduxSlice();

  return (
    <DropTarget
      dropHereText={iln.gettext("Drop files or emails here to upload to case")}
      onCloseClick={() => modalActions.removeById(modalID)}
      maxFileSize={caseMaxFileUploadSize}
      acceptedFileTypes={caseAttachmentFileTypes}
      className={classes.DropFilesToCase}
      handleValidFile={async ({ file, success, fail }) => {
        return api
          .uploadDroppedFile(
            {
              file,
              subdomain: window.location.host.split(".")[0],
              caseID,
              locale,
            },
            modalActions,
            iln
          )
          .then(({ casenoteID, caseNoteID }) => {
            success();
            api
              .getCasenote(casenoteID || caseNoteID, modalActions, iln)
              .then((casenote) => addCasenote(casenote));
          })
          .catch(() => fail());
      }}
    />
  );
};

DropFilesToCase.propTypes = propTypes;

export default DropFilesToCase;
