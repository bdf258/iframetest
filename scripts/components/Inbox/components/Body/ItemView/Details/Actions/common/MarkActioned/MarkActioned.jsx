import { Button, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import MarkActionedModal from "./MarkActionedModal/MarkActionedModal.jsx";
import TranslationContext from "../../../../../../../../../context/translation/TranslationContext.js";
import proptypes from "./propTypes.js";
import { useIsSliderOpen } from "../../../../../ItemList/common/useIsSliderOpen.js";

const modalID = "markEmailActionedModal";

const MarkActioned = ({ item }) => {
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
          title: iln.gettext("Mark As Actioned"),
          component: <MarkActionedModal inboxItem={item} modalID={modalID} />,
        })
      }
    >
      ✔ {iln.gettext("Mark As Actioned")}
    </Button>
  );
};

MarkActioned.propTypes = proptypes;

export default MarkActioned;
