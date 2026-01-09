import { ModalContext, Switcher } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import ActionList from "./ActionList/ActionList.jsx";
import BulkAddNote from "./BulkAddNote/BulkAddNote.jsx";
import BulkAddReviewDate from "./BulkAddReviewDate/BulkAddReviewDate.jsx";
import BulkAddTags from "./BulkAddTags/BulkAddTags.jsx";
import BulkAttachFile from "./BulkAttachFile/BulkAttachFile.jsx";
import BulkChangeCaseDetails from "./BulkChangeCaseDetails/BulkChangeCaseDetails.jsx";
import BulkClearReviewDates from "./BulkClearReviewDates/BulkClearReviewDates.jsx";
import BulkDeleteCases from "./BulkDeleteCases/BulkDeleteCases.jsx";
import BulkMailMergeLetter from "./BulkMailMergeLetter/BulkMailMergeLetter.jsx";
import BulkSendEmail from "./BulkSendEmail/BulkSendEmail.jsx";
import api from "@electedtech/api";
import propTypes from "./BulkActions.propTypes.js";

const initialSelected = "list";

const BulkActions = ({ state, dispatch, modalID }) => {
  const { modalActions } = useContext(ModalContext);

  const [selected, setSelected] = useState(initialSelected);

  const resetSelected = () => setSelected(initialSelected);
  const closeModal = () => modalActions.removeById(modalID);
  const updateModalTitle = (title) =>
    modalActions.updateById({ id: modalID, title: title });
  const refreshResults = () =>
    api
      .searchCases(state.filters, modalActions)
      .then((results) => dispatch({ type: "SET_RESULTS", payload: results }));

  return (
    <Switcher selected={selected}>
      {{
        list: (
          <ActionList
            setSelected={setSelected}
            updateModalTitle={updateModalTitle}
          />
        ),
        bulkAddNote: (
          <BulkAddNote
            state={state}
            onBackClick={resetSelected}
            refreshResults={refreshResults}
            closeModal={closeModal}
          />
        ),
        bulkAttachFile: (
          <BulkAttachFile
            state={state}
            onBackClick={resetSelected}
            refreshResults={refreshResults}
            closeModal={closeModal}
          />
        ),
        bulkSendEmail: (
          <BulkSendEmail
            state={state}
            onBackClick={resetSelected}
            refreshResults={refreshResults}
            closeModal={closeModal}
          />
        ),
        bulkMergeLetter: (
          <BulkMailMergeLetter state={state} onBackClick={resetSelected} />
        ),
        bulkAddTags: (
          <BulkAddTags
            state={state}
            onBackClick={resetSelected}
            refreshResults={refreshResults}
            closeModal={closeModal}
          />
        ),
        bulkAddReviewDate: (
          <BulkAddReviewDate
            state={state}
            onBackClick={resetSelected}
            refreshResults={refreshResults}
            closeModal={closeModal}
          />
        ),
        bulkClearReviewDates: (
          <BulkClearReviewDates
            state={state}
            onBackClick={resetSelected}
            refreshResults={refreshResults}
            closeModal={closeModal}
          />
        ),
        bulkChangeCaseDetails: (
          <BulkChangeCaseDetails
            state={state}
            onBackClick={resetSelected}
            refreshResults={refreshResults}
            closeModal={closeModal}
          />
        ),
        bulkDeleteCases: (
          <BulkDeleteCases
            state={state}
            onBackClick={resetSelected}
            refreshResults={refreshResults}
            closeModal={closeModal}
          />
        ),
      }}
    </Switcher>
  );
};

BulkActions.propTypes = propTypes;

export default BulkActions;
