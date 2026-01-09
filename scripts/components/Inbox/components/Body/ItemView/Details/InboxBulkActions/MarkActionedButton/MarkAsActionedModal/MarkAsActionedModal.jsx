import {
  Button,
  FlexBox,
  ModalContext,
  NotificationBox,
  Spinner,
  Step,
  Stepper,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import ConfirmationModal from "../../../../../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import TranslationContext from "../../../../../../../../../context/translation/TranslationContext.js";
import api from "@electedtech/api";
import propTypes from "./propTypes.js";
import { useReduxSlice } from "./MarkAsActionedModal.redux.js";

const MarkAsActionedModal = ({
  selectedItems,
  itemsAssignedToCase,
  itemsActioned,
}) => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const [step, setStep] = useState(0);
  const [itemsUpdated, setItemsUpdated] = useState();
  const [fetching, setFetching] = useState(false);

  const { removeItems } = useReduxSlice();

  return (
    <Stepper step={step}>
      <Step>
        <ConfirmationModal
          onConfirm={() => {
            setFetching(true);
            api
              .bulkMarkAsActioned(
                {
                  emails: itemsAssignedToCase.map(({ id }) => id),
                },
                modalActions,
                iln
              )
              .then(({ emailsUpdated }) => {
                setItemsUpdated(emailsUpdated);
                removeItems(itemsAssignedToCase);
                setStep(step + 1);
              })
              .finally(() => setFetching(false));
          }}
          disableConfirmationButton={fetching}
          confirmationValue={itemsAssignedToCase.length}
          buttonText={
            fetching ? (
              <FlexBox hAlign="center" vAlign="center">
                <Spinner />
              </FlexBox>
            ) : (
              iln.gettext("Confirm")
            )
          }
          message={
            <React.Fragment>
              <NotificationBox
                type="warn"
                alertMessage={
                  itemsAssignedToCase.length !== selectedItems.length
                    ? iln.ngettext(
                        "Only %1 of %2 selected is assigned to a case and can be marked as actioned, removing them from the inbox. This cannot be undone.",
                        "Only %1 of %2 selected are assigned to cases and can be marked as actioned, removing them from the inbox. This cannot be undone.",
                        itemsAssignedToCase.length,
                        selectedItems.length
                      )
                    : iln.gettext(
                        "%1 items will be marked as actioned and removed from the inbox, this cannot be undone.",
                        itemsAssignedToCase.length
                      )
                }
              />
              <p>
                {iln.gettext(
                  "Please confirm this action by typing the number of affected emails in the box below:"
                )}
              </p>
            </React.Fragment>
          }
        />
      </Step>
      <Step>
        <NotificationBox
          type={"info"}
          alertMessage={iln.ngettext(
            "%1 email has been marked as actioned.",
            "%1 emails have been marked as actioned.",
            itemsUpdated
          )}
        />
        <FlexBox hAlign={"center"}>
          <Button onClick={itemsActioned}>{iln.gettext("Done")}</Button>
        </FlexBox>
      </Step>
    </Stepper>
  );
};

MarkAsActionedModal.propTypes = propTypes;

export default MarkAsActionedModal;
