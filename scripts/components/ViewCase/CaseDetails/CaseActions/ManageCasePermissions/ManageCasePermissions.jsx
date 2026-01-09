import { Button, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import ManageCasePermissionsModal from "./ManageCasePermissionsModal/ManageCasePermissionsModal.jsx";
import { TranslationContext } from "context/translate";
import useUpdateCaseDetails from "../../hooks/useUpdateCaseDetails.js";

const modalID = "manage_case_permissions";

const ManageCasePermissions = () => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const updateCaseDetails = useUpdateCaseDetails();
  const update = (restrictions) => {
    updateCaseDetails({
      target: { name: "restrictions", value: restrictions },
    });
    modalActions.removeById(modalID);
  };

  return (
    <Button
      size="small"
      onClick={() =>
        modalActions.add({
          id: modalID,
          title: iln.gettext("Manage Case Permissions"),
          component: <ManageCasePermissionsModal update={update} />,
        })
      }
    >
      {iln.gettext("Manage Case Permissions")}
    </Button>
  );
};

export default ManageCasePermissions;
export { ManageCasePermissionsModal };
