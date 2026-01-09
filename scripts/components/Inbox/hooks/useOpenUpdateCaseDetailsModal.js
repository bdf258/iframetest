import { ModalContext } from "@electedtech/electedtech-ui";
import React from "react";
import { TranslationContext } from "context/translate";
import UpdateCaseDetailsFromInbox from "../components/common/UpdateCaseDetailsFromInbox";
import prefixCaseID from "../../../helpers/prefixCaseID";
import { useContext } from "react";

const useOpenUpdateCaseDetailsModal = () => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  return (item) => {
    if (!item || isNaN(item?.id) || isNaN(item?.caseID)) return;

    const modalID = `updateCaseStatusFromInboxModalID${item?.caseID}`;

    modalActions.add({
      id: modalID,
      title: iln.gettext("Update Case %1", prefixCaseID(item?.caseID)),
      component: (
        <UpdateCaseDetailsFromInbox
          inboxItem={item}
          closeModal={() => modalActions.removeById(modalID)}
        />
      ),
    });
  };
};

export default useOpenUpdateCaseDetailsModal;
