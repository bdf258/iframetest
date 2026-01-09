import React, { useContext, useEffect } from "react";
import {
  dispatchAddCasenote,
  dispatchSetCaseDetails,
  dispatchSetShowUpdateCaseStatusModal,
  dispatchUpdateCasenoteByNoteId,
  selectCaseDetails,
  selectCasenotes,
  selectCaseworkers,
} from "../slice/viewCaseSlice.js";
import { useDispatch, useSelector } from "react-redux";

import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import UpdateCaseDetails from "../../common/UpdateCaseDetails/UpdateCaseDetails.jsx";

const modalID = "update_case_status";

const UpdateCaseDetailsReduxWrapper = () => {
  const { modalActions } = useContext(ModalContext);
  const dispatch = useDispatch();

  const caseworkers = useSelector(selectCaseworkers);
  const caseDetails = useSelector(selectCaseDetails);
  const casenotes = useSelector(selectCasenotes);
  const setCaseDetails = (payload) => dispatch(dispatchSetCaseDetails(payload));

  const addCasenote = (payload) => dispatch(dispatchAddCasenote(payload));
  const updateCasenoteByID = (payload) =>
    dispatch(dispatchUpdateCasenoteByNoteId(payload));
  const setShowCaseStatusModal = (payload) =>
    dispatch(dispatchSetShowUpdateCaseStatusModal(payload));

  return (
    <UpdateCaseDetails
      caseworkers={caseworkers}
      caseDetails={caseDetails}
      casenotes={casenotes}
      setCaseDetails={setCaseDetails}
      addCasenote={addCasenote}
      updateCasenoteByID={updateCasenoteByID}
      onModalClose={() => setShowCaseStatusModal(false)}
      closeModal={() => modalActions.removeById(modalID)}
    />
  );
};

export const useUpdateCaseDetailsModal = (showUpdateCaseStatusModal) => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  useEffect(() => {
    if (showUpdateCaseStatusModal) {
      modalActions.add({
        id: modalID,
        title: iln.gettext("Update Case Status"),
        component: <UpdateCaseDetailsReduxWrapper />,
      });
    }
  }, [showUpdateCaseStatusModal]);
};
