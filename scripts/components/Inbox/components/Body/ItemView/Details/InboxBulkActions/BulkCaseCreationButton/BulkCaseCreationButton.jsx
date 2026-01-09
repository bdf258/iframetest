import { Button, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";
import {
  inboxTypeDrafts,
  inboxTypeSent,
} from "../../../../../Header/Filters/ViewingTypeSelect/consts/inboxTypeOptions.js";

import BulkCaseCreationModal from "./BulkCaseCreationModal/BulkCaseCreationModal.jsx";
import TranslationContext from "../../../../../../../../context/translation/TranslationContext.js";
import propTypes from "./propTypes.js";
import { useReduxSlice } from "./BulkCaseCreationButton.redux.js";

const modalID = "bulkCaseCreation";

const BulkCaseCreationButton = ({ itemsWithoutCase }) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const { viewingType } = useReduxSlice();

  const isDisabled =
    itemsWithoutCase.length === 0 ||
    [inboxTypeDrafts, inboxTypeSent].includes(viewingType);

  return (
    <Button
      isDisabled={isDisabled}
      size="small"
      title={
        isDisabled
          ? iln.gettext("All of your selection is already assigned to a case.")
          : undefined
      }
      onClick={() =>
        modalActions.add({
          id: modalID,
          title: iln.gettext("Bulk Create Cases"),
          component: <BulkCaseCreationModal modalID={modalID} />,
          blurBackground: true,
          lockWindow: true,
          allowClose: true,
        })
      }
    >
      {iln.gettext("Bulk Create Case")}
    </Button>
  );
};

BulkCaseCreationButton.propTypes = propTypes;

export default BulkCaseCreationButton;
