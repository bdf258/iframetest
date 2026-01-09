import { Button, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import DeleteItemsModal from "./DeleteItemsModal/DeleteItemsModal.jsx";
import PropTypes from "prop-types";
import TranslationContext from "../../../../../../../../context/translation/TranslationContext.js";
import { item } from "../../../../../../proptypes/item.js";
import { useStyles } from "../InboxBulkActions.styles.js";
import { useTheme } from "react-jss";

const modalID = "inboxBullDeleteModal";

const DeleteItemsButton = ({
  itemsToBeDeleted,
  selectedItems,
  itemsAssignedToCase,
}) => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);
  const theme = useTheme();
  const classes = useStyles({ theme });

  const isDisabled = itemsToBeDeleted.length === 0;

  return (
    <Button
      isDisabled={isDisabled}
      size="small"
      title={
        isDisabled
          ? iln.gettext(
              "All of your selection is assigned to a case and cannot be deleted."
            )
          : undefined
      }
      onClick={() =>
        modalActions.add({
          customClassNames: { card: classes.modalCard },
          id: modalID,
          title: iln.gettext("Delete"),
          component: (
            <DeleteItemsModal
              selectedItems={selectedItems}
              itemsToBeDeleted={itemsToBeDeleted}
              itemsAssignedToCase={itemsAssignedToCase}
            />
          ),
          blurBackground: true,
          lockWindow: true,
          allowClose: true,
        })
      }
    >
      {iln.gettext("Bulk Delete")}
    </Button>
  );
};

DeleteItemsButton.propTypes = {
  itemsAssignedToCase: PropTypes.arrayOf(item),
  itemsToBeDeleted: PropTypes.arrayOf(item),
  selectedItems: PropTypes.arrayOf(item),
};

export default DeleteItemsButton;
