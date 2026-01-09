import OperationCompletedModal from "../../../../../common/Modal/OperationCompletedModal/OperationCompletedModal.jsx";
import React from "react";
import propTypes from "../common/propTypes";

const FailureModal = (modalID, modalActions, caseReference, iln) => ({
  id: modalID,
  title: iln.gettext("Failed to Delete Case %1", caseReference),
  allowClose: false,
  component: (
    <OperationCompletedModal
      handleDone={() => {
        modalActions.reset();
      }}
    />
  ),
});

FailureModal.propTypes = propTypes;

export default FailureModal;
