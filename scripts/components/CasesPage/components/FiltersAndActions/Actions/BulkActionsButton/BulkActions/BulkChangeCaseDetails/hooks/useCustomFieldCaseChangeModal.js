import {
  Button,
  FlexBox,
  ModalContext,
  NotificationBox,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import { customFields } from "../../../../../../../../../helpers/localStorageHelper";

const useCustomFieldCaseChangeModal = () => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const customFieldCaseChangeStatusModalId = "customFieldCaseChangeStatusModal";

  const openCustomFieldCaseChangeModal = ({
    inputName,
    inputLabel,
    currentValue,
    newValue,
    confirm,
  }) => {
    if (newValue === currentValue) return;
    if (customFields.length === 0) {
      confirm({
        name: inputName,
        value: newValue,
      });
      return;
    }

    modalActions.add({
      id: customFieldCaseChangeStatusModalId,
      customClassNames: {},
      title: iln.gettext("Case change warning"),
      component: (
        <React.Fragment>
          &nbsp; &nbsp;
          <NotificationBox
            type={"alert"}
            alertMessage={`Changing a cases ${inputLabel} may result in data loss on
            custom fields`}
          />
          <p>{`Are you sure you want to change the case ${inputLabel}?`}</p>
          <FlexBox hAlign={"space-between"}>
            <Button
              onClick={() =>
                modalActions.removeById(customFieldCaseChangeStatusModalId)
              }
            >
              {iln.gettext("Cancel")}
            </Button>
            <Button
              onClick={() => {
                confirm({
                  name: inputName,
                  value: newValue,
                });
                modalActions.removeById(customFieldCaseChangeStatusModalId);
              }}
            >
              {iln.gettext("Continue")}
            </Button>
          </FlexBox>
        </React.Fragment>
      ),
      blurBackground: true,
      lockWindow: true,
      allowClose: true,
    });
  };

  const closeCustomFieldCaseChangeModal = () =>
    modalActions.removeById(customFieldCaseChangeStatusModalId);

  return [openCustomFieldCaseChangeModal, closeCustomFieldCaseChangeModal];
};

export default useCustomFieldCaseChangeModal;
