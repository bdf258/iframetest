import React, { useContext } from "react";
import {
  inboxTypeDrafts,
  inboxTypeInbox,
  inboxTypeSent,
} from "../../../../Header/Filters/ViewingTypeSelect/consts/inboxTypeOptions.js";

import AssignCaseworkerButton from "./AssignCaseworkerButton/AssignCaseworkerButton.jsx";
import CaseCreationButton from "./BulkCaseCreationButton/BulkCaseCreationButton.jsx";
import DeleteItemsButton from "./DeleteItemsButton/DeleteItemsButton.jsx";
import MarkActionedButton from "./MarkActionedButton/MarkActionedButton.jsx";
import { TranslationContext } from "context/translate";
import { useReduxSlice } from "./InboxBulkActions.redux.js";
import { useStyles } from "./InboxBulkActions.styles.js";
import { useTheme } from "react-jss";

const InboxBulkActions = () => {
  const iln = useContext(TranslationContext);

  const {
    selectedItems,
    itemsAssignedToCase,
    itemsWithoutCase,
    deletableItems,
    inboxType,
  } = useReduxSlice();

  const theme = useTheme();
  const classes = useStyles({ theme });

  if (selectedItems?.length < 2 || inboxType === inboxTypeSent) return null;

  return (
    <div className={classes.bulkActions}>
      <h3>{iln.gettext("Bulk Actions")}</h3>
      <p>
        {iln.gettext(
          "You have selected %1 items",
          selectedItems.length,
          itemsAssignedToCase.length
        )}
        {", "}
        {itemsAssignedToCase.length === 0
          ? iln.gettext("none are assigned to a case.")
          : selectedItems.length === itemsAssignedToCase.length
          ? iln.gettext("all are assigned to a case")
          : iln.ngettext(
              "%1 is on a case",
              "%1 are on a case",
              itemsAssignedToCase.length
            )}
      </p>

      {inboxType === inboxTypeInbox && [
        <CaseCreationButton
          key="caseCreation"
          itemsWithoutCase={itemsWithoutCase}
        />,
        <MarkActionedButton
          key="markActioned"
          selectedItems={selectedItems}
          itemsAssignedToCase={itemsAssignedToCase}
        />,
      ]}
      {(inboxType === inboxTypeInbox || inboxType === inboxTypeDrafts) && (
        <AssignCaseworkerButton
          key="assignCaseworker"
          selectedItems={selectedItems}
        />
      )}

      <DeleteItemsButton
        selectedItems={selectedItems}
        itemsToBeDeleted={deletableItems}
        itemsAssignedToCase={itemsAssignedToCase}
      />
    </div>
  );
};

export default InboxBulkActions;
