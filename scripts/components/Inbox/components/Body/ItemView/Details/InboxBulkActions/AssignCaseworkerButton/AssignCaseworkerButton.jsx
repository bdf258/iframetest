import { Button, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import AssignCaseworkerModal from "./AssignCaseworkerModal/AssignCaseworkerModal.jsx";
import PropTypes from "prop-types";
import TranslationContext from "../../../../../../../../context/translation/TranslationContext.js";
import { item } from "../../../../../../proptypes/item.js";

const modalID = "markAsActionedModal";

const AssignCaseworkerButton = ({ selectedItems }) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  return (
    <Button
      size="small"
      onClick={() =>
        modalActions.add({
          id: modalID,
          title: iln.gettext("Bulk Assign Items to Caseworker"),
          component: (
            <AssignCaseworkerModal
              selectedItems={selectedItems}
              itemsActioned={() => modalActions.removeById(modalID)}
            />
          ),
          blurBackground: true,
          lockWindow: true,
          allowClose: true,
        })
      }
    >
      {iln.gettext("Assign To Caseworker")}
    </Button>
  );
};

AssignCaseworkerButton.propTypes = {
  selectedItems: PropTypes.arrayOf(item),
};

export default AssignCaseworkerButton;
