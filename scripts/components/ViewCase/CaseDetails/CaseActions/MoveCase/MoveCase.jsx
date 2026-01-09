import { Button, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import MoveCaseModal from "./MoveCaseModal/MoveCaseModal.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./propTypes";

const modalID = "move_case";

const MoveCase = ({ caseID, constituentID, setCaseConstituent }) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  return (
    <Button
      size="small"
      onClick={() =>
        modalActions.add({
          id: modalID,
          title: iln.gettext("Move Case"),
          component: (
            <MoveCaseModal
              modalID={modalID}
              caseID={caseID}
              constituentID={constituentID}
              setCaseConstituent={setCaseConstituent}
            />
          ),
        })
      }
    >
      {iln.gettext("Move Case")}
    </Button>
  );
};

MoveCase.propTypes = propTypes;

export default MoveCase;
export { MoveCaseModal };
