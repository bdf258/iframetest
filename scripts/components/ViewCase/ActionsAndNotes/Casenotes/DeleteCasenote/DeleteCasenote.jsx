import { ModalContext, Spinner, Switcher } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import ConfirmationModal from "../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import OperationCompletedModal from "../../../../common/Modal/OperationCompletedModal/OperationCompletedModal.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import propTypes from "./propTypes";
import { useStyles } from "./styles";
import { useTheme } from "react-jss";

const BackupConfirmationMessage = () => {
  const iln = useContext(TranslationContext);

  return (
    <p>
      {iln.gettext("To confirm you'd like to delete this casenote please type")}{" "}
      {'"'}
      <b>{iln.gettext("confirm")}</b>
      {'"'} {iln.gettext("in the box below:")}
    </p>
  );
};

const DeleteCasenote = ({
  casenote,
  index,
  removeCasenote,
  successMessage = "Successfully Deleted",
  confirmMessage,
  confirmationValue,
  modifyInputValues,
  modalID,
  failureMessage,
  actionBeforeDelete = null,
  callDeleteCasenoteApi = true,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [loading, setLoading] = useState(false);
  const [deleteStep, setDeleteStep] = useState("confirm");
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const emptyConfirmationValue = !confirmationValue || confirmationValue === "";

  return (
    <div className={classes.modal}>
      <Switcher selected={deleteStep}>
        {{
          confirm: (
            <ConfirmationModal
              message={
                emptyConfirmationValue ? (
                  <BackupConfirmationMessage />
                ) : (
                  confirmMessage
                )
              }
              buttonText={loading ? <Spinner /> : iln.gettext("Confirm")}
              confirmationValue={
                emptyConfirmationValue
                  ? iln.gettext("confirm")
                  : confirmationValue
              }
              modifyInputValues={modifyInputValues}
              onConfirm={async () => {
                setLoading(true);
                if (actionBeforeDelete) {
                  await actionBeforeDelete();
                }
                if (!callDeleteCasenoteApi) {
                  setLoading(false);
                  removeCasenote(index);
                  setDeleteStep("complete");
                  return;
                }
                api
                  .deleteCasenote(casenote.id)
                  .then(() => {
                    setLoading(false);
                    removeCasenote(index);
                    setDeleteStep("complete");
                  })
                  .catch(() => {
                    setLoading(false);
                    setDeleteStep("error");
                  });
              }}
            />
          ),
          complete: (
            <OperationCompletedModal
              message={successMessage}
              handleDone={() => modalActions.removeById(modalID)}
            />
          ),
          error: (
            <OperationCompletedModal
              message={failureMessage}
              handleDone={() => modalActions.removeById(modalID)}
              buttonText={"Understood"}
            />
          ),
        }}
      </Switcher>
    </div>
  );
};

DeleteCasenote.propTypes = propTypes;

export default DeleteCasenote;
