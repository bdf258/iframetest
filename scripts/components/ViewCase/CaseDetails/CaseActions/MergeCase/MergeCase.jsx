import { Button, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import MergeCaseModal from "./MergeCaseModal/MergeCaseModal.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./propTypes";

const MergeCase = ({ caseID, cases, ...props }) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const modalID = "merge_case";

  return (
    <Button
      {...props}
      size="small"
      onClick={() =>
        modalActions.add({
          id: modalID,
          title: "Merge Case",
          component: (
            <MergeCaseModal modalID={modalID} caseID={caseID} cases={cases} />
          ),
        })
      }
    >
      {iln.gettext("Merge Case")}
    </Button>
  );
};

MergeCase.propTypes = propTypes;

export default MergeCase;
