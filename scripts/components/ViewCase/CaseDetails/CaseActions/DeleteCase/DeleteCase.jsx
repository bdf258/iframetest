import React, { useContext } from "react";

import { Button } from "@electedtech/electedtech-ui";
import DeleteCaseModal from "./DeleteCaseModal/DeleteCaseModal.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import prefixCaseID from "../../../../../helpers/prefixCaseID";
import propTypes from "./propTypes";

const DeleteCase = ({ caseID, constituentID }) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const modalID = "delete_case";

  return (
    <Button
      size="small"
      onClick={() =>
        modalActions.add({
          id: modalID,
          title: iln.gettext("Delete Case %1?", prefixCaseID(caseID)),
          component: (
            <DeleteCaseModal
              modalID={modalID}
              caseID={caseID}
              constituentID={constituentID}
            />
          ),
        })
      }
    >
      {iln.gettext("Delete This Case")}
    </Button>
  );
};

DeleteCase.propTypes = propTypes;

export default DeleteCase;
export { DeleteCaseModal };
