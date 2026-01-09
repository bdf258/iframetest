import { Button, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import MarkAsActionedModal from "./MarkAsActionedModal/MarkAsActionedModal.jsx";
import PropTypes from "prop-types";
import TranslationContext from "../../../../../../../../context/translation/TranslationContext.js";
import { item } from "../../../../../../proptypes/item.js";

const modalID = "markAsActionedModal";

const MarkActionedModal = ({ selectedItems, itemsAssignedToCase }) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const isDisabled = itemsAssignedToCase.length === 0;

  return (
    <Button
      isDisabled={isDisabled}
      size="small"
      title={
        isDisabled
          ? iln.gettext("None of your selection is assigned to a case.")
          : undefined
      }
      onClick={() =>
        modalActions.add({
          id: modalID,
          title: iln.gettext("Bulk Mark As Actioned"),
          component: (
            <MarkAsActionedModal
              selectedItems={selectedItems}
              itemsAssignedToCase={itemsAssignedToCase}
              itemsActioned={() => modalActions.removeById(modalID)}
            />
          ),
          blurBackground: true,
          lockWindow: true,
          allowClose: true,
        })
      }
    >
      {iln.gettext("Mark As Actioned")}
    </Button>
  );
};

MarkActionedModal.propTypes = {
  itemsAssignedToCase: PropTypes.arrayOf(item),
  selectedItems: PropTypes.arrayOf(item),
};

export default MarkActionedModal;
