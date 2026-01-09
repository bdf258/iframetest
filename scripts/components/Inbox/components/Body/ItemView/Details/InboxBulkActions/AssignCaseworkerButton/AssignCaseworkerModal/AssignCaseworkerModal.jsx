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

import CaseworkerSelectForInboxBulkAction from "./CaseworkerSelectForInboxBulkAction/CaseworkerSelectForInboxBulkAction.jsx";
import ConfirmationModal from "../../../../../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import TranslationContext from "../../../../../../../../../context/translation/TranslationContext.js";
import { anyoneInboxID } from "../../../../../../Header/Filters/UserSelect/UserSelect.jsx";
import api from "@electedtech/api";
import propTypes from "./propTypes.js";
import { useReduxSlice } from "./AssignCaseworkerModal.redux.js";

const AssignCaseworkerModal = ({ selectedItems, itemsActioned }) => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const { caseworkers, filterInboxCaseworkerID, removeInboxItems } =
    useReduxSlice();

  const [step, setStep] = useState(0);
  const [caseworkerID, setCaseworkerID] = useState();
  const [result, setResult] = useState();
  const [fetching, setFetching] = useState(false);

  const caseworkerName =
    caseworkers.find(({ id }) => id?.toString() === caseworkerID?.toString())
      ?.name || iln.gettext("Unknown");

  return (
    <Stepper step={step}>
      <Step>
        <CaseworkerSelectForInboxBulkAction
          value={caseworkerID}
          onChange={({ target: { value } }) => setCaseworkerID(value)}
          onConfirm={() => setStep(step + 1)}
          caseworkers={caseworkers}
        />
      </Step>
      <Step>
        <ConfirmationModal
          onConfirm={() => {
            setFetching(true);
            api
              .bulkAssignInboxItemsToCaseworker(
                {
                  itemIDs: selectedItems.map(({ id }) => id),
                  caseworkerID,
                },
                modalActions,
                iln
              )
              .then((response) => {
                setResult(response);
                setStep(step + 1);

                if (
                  filterInboxCaseworkerID !== anyoneInboxID &&
                  parseInt(caseworkerID) !== parseInt(filterInboxCaseworkerID)
                )
                  removeInboxItems(selectedItems);
              })
              .finally(() => setFetching(false));
          }}
          disableConfirmationButton={fetching}
          confirmationValue={selectedItems.length}
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
              <br />
              <NotificationBox
                type="warn"
                alertMessage={iln.ngettext(
                  'This action will assign %1 item to "%2" and cannot be undone',
                  'This action will assign %1 items to "%2" and cannot be undone',
                  selectedItems.length,
                  caseworkerName
                )}
              />
              <p>
                {iln.ngettext(
                  "Please confirm this action by typing the number of affected items in the box below"
                )}
                :
              </p>
            </React.Fragment>
          }
        />
      </Step>
      <Step>
        {result?.itemsNotFound > 0 && (
          <NotificationBox
            type="info"
            alertMessage={iln.ngettext(
              "%1 item of %2 were not found and could not be updated",
              "%1 items of %2 were not found and could not be updated",
              selectedItems.length,
              result.itemsNotFound
            )}
          />
        )}
        <p>
          {iln.ngettext(
            "%1 email has been assigned to %2",
            "%1 emails have been assigned to %2",
            result?.itemsUpdated,
            caseworkerName
          )}
        </p>
        <FlexBox hAlign={"center"}>
          <Button onClick={itemsActioned}>{iln.gettext("Done")}</Button>
        </FlexBox>
      </Step>
    </Stepper>
  );
};

AssignCaseworkerModal.propTypes = propTypes;

export default AssignCaseworkerModal;
