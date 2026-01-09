import React, { useContext } from "react";
import {
  inboxEmailUploadFileTypes,
  inboxEmailUploadFileTypesAsString,
  inboxMaxEmailUploadSize,
} from "../../../../../../consts/fileUpload.js";
import FileDropTarget from "../../../../../common/FileDropTarget/index.js";
import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { installationPreferences } from "../../../../../../helpers/localStorageHelper.js";
import propTypes from "./DropFilesToInbox.propTypes.js";
import { useReduxSlice } from "./DropFilesToInbox.redux.js";
import { useStyles } from "./DropFilesToInbox.styles.js";

const { locale } = installationPreferences || {};

const DropFilesToInbox = ({ onCloseClick }) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const { caseworkerID } = useReduxSlice();

  return (
    <div className={classes.dropFilesToInbox}>
      <FileDropTarget
        dropHereText={iln.gettext(
          "Drop emails (%1) here to upload",
          inboxEmailUploadFileTypesAsString
        )}
        maxFileSize={inboxMaxEmailUploadSize}
        acceptedFileTypes={inboxEmailUploadFileTypes}
        className={classes.fileDropTarget}
        onCloseClick={onCloseClick}
        handleValidFile={({ file, success, fail }) =>
          api
            .uploadDroppedFile(
              {
                file,
                mailboxID: caseworkerID,
                subdomain: window.location.host.split(".")[0],
                locale,
                caseID: 0,
              },
              modalActions,
              iln
            )
            .then((email) => {
              if (email.emailID) {
                // Add proper error handling for triggerAutomation call
                api
                  .triggerAutomation(
                    {
                      type: "emailAssigned",
                      emailID: email.emailID,
                      caseworkerID: caseworkerID,
                    },
                    modalActions,
                    iln
                  )
                  .catch((error) => {
                    // Log the error for debugging purposes
                    console.error(
                      "Failed to trigger automation for email:",
                      email.emailID,
                      error
                    );
                    // Note: We don't call fail() here because the file upload was successful
                    // The automation failure shouldn't prevent the user from seeing the upload success
                  });
                success();
              }
            })
            .catch(() => fail())
        }
      />
      <button onClick={onCloseClick} className={classes.closeButton}>
        &#215;
      </button>
    </div>
  );
};

DropFilesToInbox.propTypes = propTypes;

export default DropFilesToInbox;
