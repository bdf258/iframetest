import React, { useContext, useEffect, useState } from "react";

import ComponentLoading from "../../../../../ComponentLoading.jsx";
import ConfirmationModal from "../../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import FailureModal from "../FailureModal/FailureModal.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import SuccessModal from "../SuccessModal/SuccessModal.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import prefixCaseID from "../../../../../../helpers/prefixCaseID";
import propTypes from "../common/propTypes";
import { useReduxSlice } from "./DeleteCaseModal.redux.js";
import { useStyles } from "../styles";
import { useTheme } from "react-jss";
import { userPreferences } from "../../../../../../helpers/localStorageHelper.js";

const getMessage = ({ iln, caseReference, casenotesTotalResults }) => {
  const hasCasenotes = casenotesTotalResults > 0;

  return (
    <div>
      <br />
      {iln.gettext("You're about to")} <strong>{iln.gettext("delete")}</strong>{" "}
      {iln.gettext("case")} <strong>{caseReference}</strong>{" "}
      {hasCasenotes && [
        iln.gettext("along with "),
        <strong key="">
          {iln.gettext("%1 casenotes", casenotesTotalResults)}
        </strong>,
        ": ",
      ]}
      <br />
      {!hasCasenotes
        ? iln.gettext(
            `Type "${caseReference}" below to verify that you want to delete the case.`
          )
        : iln.gettext(
            "Use the text field below to confirm the amount of casenotes that will be deleted with this case."
          )}
      <br />
      <br />
    </div>
  );
};

const DeleteCaseModal = ({ modalID, caseID, constituentID }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const [fetching, setFetching] = useState(true);

  const {
    setCasenotesTotalResults,
    casenotesTotalResults,
    setCasenotes,
    setCasenotesPage,
  } = useReduxSlice();

  const caseReference = prefixCaseID(caseID);
  const orderBy = userPreferences.viewCaseOrder;

  useEffect(() => {
    // get the first page again to get latest totalResults from backend
    api
      .getAllCasenotes(caseID, { page: 1, orderBy: orderBy }, modalActions, iln)
      .then(({ results, totalResults }) => {
        setCasenotesTotalResults(totalResults);
        setCasenotesPage(1);
        setCasenotes(results);
      })
      .finally(() => {
        setFetching(false);
      });
  }, []);

  return (
    <div className={classes.modal}>
      {fetching ? (
        <ComponentLoading />
      ) : (
        <ConfirmationModal
          buttonText={iln.gettext("Delete")}
          confirmationValue={
            casenotesTotalResults > 0 ? casenotesTotalResults : caseReference
          }
          modifyInputValues={(x) => x.toLowerCase()}
          onConfirm={() => {
            api
              .deleteCase(caseID)
              .then(() =>
                modalActions.updateById(
                  SuccessModal(
                    modalID,
                    modalActions,
                    caseReference,
                    constituentID,
                    iln
                  )
                )
              )
              .catch(() =>
                modalActions.updateById(
                  FailureModal(modalID, modalActions, caseReference, iln)
                )
              );
          }}
          message={getMessage({ iln, caseReference, casenotesTotalResults })}
        />
      )}
    </div>
  );
};

DeleteCaseModal.propTypes = propTypes;

export default DeleteCaseModal;
