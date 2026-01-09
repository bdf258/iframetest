import {
  Button,
  InputContainer,
  InputLabel,
  ModalContext,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import ManageSendFromAddresses from "./ManageSendFromAddresses/ManageSendFromAddresses.jsx";
import { TranslationContext } from "context/translate";
import useStyles from "./styles.js";

const modalID = "manage_send_from_addresses";

const SendFromAddressesButton = () => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  return (
    <InputContainer customClassNames={classes.inputContainer}>
      <InputLabel customClassNames={classes.inputLabel} name="">
        {iln.gettext("Email From")}
      </InputLabel>
      <Button
        type="text"
        customClassNames={classes.button}
        onClick={() =>
          modalActions.add({
            id: modalID,
            title: iln.gettext("Manage Send From Addresses"),
            component: <ManageSendFromAddresses modalID={modalID} />,
            blurBackground: true,
            lockWindow: true,
            allowClose: true,
          })
        }
      >
        {iln.gettext("Manage Send From Addresses")}
      </Button>
    </InputContainer>
  );
};

export default SendFromAddressesButton;
