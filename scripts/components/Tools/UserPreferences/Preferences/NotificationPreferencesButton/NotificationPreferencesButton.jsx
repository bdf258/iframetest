import {
  Button,
  InputContainer,
  InputLabel,
  ModalContext,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect } from "react";

import ManageNotificationPreferences from "./ManageNotificationPreferences/ManageNotificationPreferences.jsx";
import { TranslationContext } from "context/translate";
import { getQueryStringParamMap } from "../../../../../helpers/queryString.js";
import useStyles from "./styles.js";

const modalID = "manage_notification_preferences";

const openModal = ({ modalActions, iln }) =>
  modalActions.add({
    id: modalID,
    title: iln.gettext("Manage Notification Preferences"),
    component: <ManageNotificationPreferences modalID={modalID} />,
    blurBackground: true,
    lockWindow: true,
    allowClose: true,
    allowCloseOnBgClick: false,
  });

const NotificationPreferencesButton = () => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  useEffect(() => {
    getQueryStringParamMap().get("openEmailSignatures") !== undefined &&
      openModal({ modalActions, iln });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InputContainer customClassNames={classes.inputContainer}>
      <InputLabel customClassNames={classes.inputLabel} name="">
        {iln.gettext("Notification Preferences")}
      </InputLabel>
      <Button
        type="text"
        customClassNames={classes.button}
        onClick={() => openModal({ modalActions, iln })}
      >
        {iln.gettext("Manage Notification Preferences")}
      </Button>
    </InputContainer>
  );
};

export default NotificationPreferencesButton;
