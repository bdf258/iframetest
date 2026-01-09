import {
  FlexBox,
  ModalContext,
  NotificationBox,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import ConfirmationModal from "../../../../../../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import TranslationContext from "../../../../../../../../../../context/translation/TranslationContext.js";
import api from "@electedtech/api";
import propTypes from "./propTypes.js";
import { useReduxSlice } from "./DeleteItems.redux.js";

const DeleteItems = ({ itemsToBeDeleted, selectedItems, itemsDeleted }) => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const [httpErrorMessage, setHttpErrorMessage] = useState();
  const [waitingForHttp, setWaitingForHttp] = useState(false);

  const { removeItems } = useReduxSlice();

  const deletingDrafts = itemsToBeDeleted.every(({ type }) => type === "draft");

  const handleDeletingItems = () => {
    if (itemsToBeDeleted.length === 0) return;

    setWaitingForHttp(true);

    api
      .bulkDeleteEmails(
        { emails: itemsToBeDeleted.map(({ id }) => id) },
        modalActions,
        iln
      )
      .then(() => {
        removeItems(itemsToBeDeleted);
        itemsDeleted();
      })
      .catch(() => {
        setHttpErrorMessage(
          iln.gettext("There was an error deleting the items.")
        );
        setWaitingForHttp(false);
      });
  };

  return (
    <ConfirmationModal
      validatorIsNumber={false}
      errorTextToDisplay={iln.gettext("Input the number of items to delete")}
      confirmationValue={itemsToBeDeleted.length}
      disableConfirmationButton={waitingForHttp || !!httpErrorMessage}
      buttonText={
        waitingForHttp ? (
          <FlexBox hAlign="center" vAlign="center">
            <Spinner />
          </FlexBox>
        ) : (
          iln.gettext("Confirm")
        )
      }
      message={
        <React.Fragment>
          {httpErrorMessage && (
            <NotificationBox type={"alert"} alertMessage={httpErrorMessage} />
          )}
          {
            <NotificationBox
              type="warn"
              alertMessage={
                deletingDrafts
                  ? iln.ngettext(
                      "Deleting %1 draft.",
                      "Deleting %1 drafts.",
                      itemsToBeDeleted.length
                    )
                  : iln.gettext(
                      "%1 of %2 selected items are currently unassigned and can be deleted.",
                      itemsToBeDeleted.length,
                      selectedItems.length
                    )
              }
            />
          }
          <p>
            {deletingDrafts
              ? iln.ngettext(
                  "Please confirm that you want to permanently delete %1 draft by typing the number of affected items below:",
                  "Please confirm that you want to permanently delete %1 drafts by typing the number of affected items below:",
                  itemsToBeDeleted.length
                )
              : iln.ngettext(
                  "Please confirm that you want to permanently delete %1 selected item by typing the number of affected items below:",
                  "Please confirm that you want to permanently delete %1 selected items by typing the number of affected items below:",
                  itemsToBeDeleted.length
                )}
          </p>
          <br />
        </React.Fragment>
      }
      onConfirm={handleDeletingItems}
    />
  );
};

DeleteItems.propTypes = propTypes;

export default DeleteItems;
