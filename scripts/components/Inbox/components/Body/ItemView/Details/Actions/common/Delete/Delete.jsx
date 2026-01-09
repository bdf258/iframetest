import { Button, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import DeleteModal from "./DeleteModal/DeleteModal.jsx";
import TranslationContext from "../../../../../../../../../context/translation/TranslationContext.js";
import proptypes from "./propTypes.js";
import { useIsSliderOpen } from "../../../../../ItemList/common/useIsSliderOpen.js";

const modalID = "deleteEmailModal";

const Delete = ({ item }) => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const isSliderOpen = useIsSliderOpen();

  return (
    <Button
      size="small"
      isDisabled={isSliderOpen}
      title={
        isSliderOpen
          ? iln.gettext("You cannot take an action while the slider is open")
          : undefined
      }
      onClick={() =>
        modalActions.add({
          id: modalID,
          title: iln.gettext("Delete"),
          component: <DeleteModal item={item} modalID={modalID} />,
        })
      }
    >
      {iln.gettext("Delete")}
    </Button>
  );
};

Delete.propTypes = proptypes;

export default Delete;
