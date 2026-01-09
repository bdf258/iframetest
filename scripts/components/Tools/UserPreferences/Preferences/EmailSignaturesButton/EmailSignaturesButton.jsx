import {
  Button,
  InputContainer,
  InputLabel,
  ModalContext,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect } from "react";

import ManageEmailSignatures from "./ManageEmailSignatures/ManageEmailSignatures.jsx";
import { TranslationContext } from "context/translate";
import { getQueryStringParamMap } from "../../../../../helpers/queryString.js";
import useStyles from "./styles.js";

const modalID = "manage_email_signatures";

const openModal = ({ modalActions, iln }) =>
  modalActions.add({
    id: modalID,
    title: iln.gettext("Manage Email Signatures"),
    component: <ManageEmailSignatures modalID={modalID} />,
    blurBackground: true,
    lockWindow: true,
    allowClose: true,
    allowCloseOnBgClick: false,
  });

const EmailSignaturesButton = () => {
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
        {iln.gettext("Email Signatures")}
      </InputLabel>
      <Button
        type="text"
        customClassNames={classes.button}
        onClick={() => openModal({ modalActions, iln })}
      >
        {iln.gettext("Manage Email Signatures")}
      </Button>
    </InputContainer>
  );
};

export default EmailSignaturesButton;
