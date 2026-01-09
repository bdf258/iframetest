import {
  Button,
  FlexBox,
  ModalContext,
  NotificationBox,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import MarkAsActionedModal from "../../../MarkActionedButton/MarkAsActionedModal/MarkAsActionedModal.jsx";
import PropTypes from "prop-types";
import TranslationContext from "../../../../../../../../../../context/translation/TranslationContext.js";
import { item } from "../../../../../../../../proptypes/item.js";
import { useStyles } from "./DeleteConfirmation.styles";
import { useTheme } from "react-jss";

const DeleteConfirmation = ({
  itemsAssignedToCase,
  itemsToBeDeleted,
  selectedItems,
  modalID,
}) => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [markItemsAsActioned, setMarkItemsAsActioned] = useState(false);

  if (markItemsAsActioned)
    return (
      <MarkAsActionedModal
        itemsAssignedToCase={itemsAssignedToCase}
        selectedItems={selectedItems}
        itemsActioned={() => modalActions.removeById(modalID)}
      />
    );

  return (
    <div className={classes.deleteConfirmationContainer}>
      <NotificationBox
        type="warn"
        alertMessage={iln.ngettext(
          "%1 item has been permanently deleted.",
          "%1 items have been permanently deleted.",
          itemsToBeDeleted.length
        )}
      />
      {selectedItems.length !== itemsToBeDeleted.length ? (
        <React.Fragment>
          <p>
            {iln.ngettext(
              "There is %1 selected item remaining as it is assigned to a case. Do you want to mark it as actioned and remove it from the inbox?",
              "There are %1 selected items remaining as they are assigned to a case. Do you want to mark them as actioned and remove them from the inbox?",
              itemsAssignedToCase.length
            )}
          </p>
          <FlexBox hAlign={"space-between"}>
            <Button onClick={() => modalActions.removeById(modalID)}>
              {iln.gettext("No")}
            </Button>
            <Button onClick={() => setMarkItemsAsActioned(true)}>
              {iln.gettext("Yes")}
            </Button>
          </FlexBox>
        </React.Fragment>
      ) : (
        <Button onClick={() => modalActions.removeById(modalID)}>
          {iln.gettext("Done")}
        </Button>
      )}
    </div>
  );
};

DeleteConfirmation.propTypes = {
  itemsAssignedToCase: PropTypes.arrayOf(item),
  itemsToBeDeleted: PropTypes.arrayOf(item),
  modalID: PropTypes.string.isRequired,
  selectedItems: PropTypes.arrayOf(item),
};

export default DeleteConfirmation;
