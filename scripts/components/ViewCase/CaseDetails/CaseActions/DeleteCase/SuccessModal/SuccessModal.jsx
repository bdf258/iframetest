import OperationCompletedModal from "../../../../../common/Modal/OperationCompletedModal/OperationCompletedModal.jsx";
import React from "react";
import propTypes from "../common/propTypes";

const SuccessModal = (
  modalID,
  modalActions,
  caseReference,
  constituentID,
  iln
) => ({
  id: modalID,
  title: iln.gettext("Successfully Deleted Case %1", caseReference),
  allowClose: false,
  component: (
    <OperationCompletedModal
      handleDone={() => {
        modalActions.reset();
        window.location.replace(
          `viewconstituent.php?constituentID=${constituentID}`
        );
      }}
    />
  ),
});

SuccessModal.propTypes = propTypes;

export default SuccessModal;
