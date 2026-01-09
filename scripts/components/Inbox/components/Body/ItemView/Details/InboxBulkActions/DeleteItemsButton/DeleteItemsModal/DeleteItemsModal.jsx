import React, { useState } from "react";

import DeleteConfirmation from "./DeleteConfirmation/DeleteConfirmation.jsx";
import DeleteItems from "./DeleteItems/DeleteItems.jsx";
import PropTypes from "prop-types";
import { item } from "../../../../../../../proptypes/item.js";

const modalID = "inboxBullDeleteModal";

// Modal doesnt update when parent re-renders.
// Created below component to allow step state to update modal content.
const DeleteItemsModal = ({
  selectedItems,
  itemsToBeDeleted,
  itemsAssignedToCase,
}) => {
  const [step, setStep] = useState("delete");

  if (step === "delete")
    return (
      <DeleteItems
        itemsDeleted={() => setStep("markAsActioned")}
        selectedItems={selectedItems}
        itemsToBeDeleted={itemsToBeDeleted}
      />
    );
  if (step === "markAsActioned")
    return (
      <DeleteConfirmation
        itemsAssignedToCase={itemsAssignedToCase}
        itemsToBeDeleted={itemsToBeDeleted}
        selectedItems={selectedItems}
        modalID={modalID}
      />
    );
};

DeleteItemsModal.propTypes = {
  itemsAssignedToCase: PropTypes.arrayOf(item),
  itemsToBeDeleted: PropTypes.arrayOf(item),
  selectedItems: PropTypes.arrayOf(item),
};

export default DeleteItemsModal;
