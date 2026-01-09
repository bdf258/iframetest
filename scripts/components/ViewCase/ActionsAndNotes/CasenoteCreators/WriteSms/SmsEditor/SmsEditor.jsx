import {
  Button,
  FlexBox,
  FormTextInput,
  FormTextareaInput,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect } from "react";
import {
  removeCallingCode,
  removeInvalidCharactersForMobileNumber,
} from "../../../util/formatMobileNumbers";

import { TranslationContext } from "context/translate";
import classnames from "classnames";
import propTypes from "./SmsEditor.propTypes";
import useSmsEditorState from "./hooks/useSmsEditorState";
import { useStyles } from "./SmsEditor.style";
import useValidMessage from "./hooks/useValidMessage";
import useValidRecipientMobile from "./hooks/useValidRecipientMobile";

const SmsEditor = ({
  recipientMobile: initialRecipientMobile = "",
  message: initialMessage = "",
  handleSendSms,
}) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles();
  const [{ recipientMobile, message }, { setMessage, setRecipientMobile }] =
    useSmsEditorState({ initialRecipientMobile, initialMessage });
  const characterLimit = 160;
  const { recipientMobileError } = useValidRecipientMobile(recipientMobile);
  const { messageError } = useValidMessage(message);

  useEffect(() => {
    setRecipientMobile(removeCallingCode(initialRecipientMobile));
  }, [initialRecipientMobile]);

  return (
    <React.Fragment>
      <FormTextInput
        customClassNames={{ label: classes.labelWidth }}
        name={"mobileNumber"}
        label={iln.gettext("Mobile Number")}
        value={recipientMobile.value}
        onChange={(e) => {
          setRecipientMobile(
            removeInvalidCharactersForMobileNumber(e.target.value)
          );
        }}
        error={recipientMobile.touched ? recipientMobileError : ""}
      />
      <FormTextareaInput
        customClassNames={{ label: classes.labelWidth }}
        name={"message"}
        label={iln.gettext("Message")}
        value={message.value}
        onChange={(e) => setMessage(e.target.value)}
        error={message.touched ? messageError : ""}
      />
      <FlexBox hAlign={"right"}>
        <div
          className={classnames(
            classes.smsCharacterLengthCounter,
            message.touched
              ? messageError
                ? classes.smsCharacterLengthCounterError
                : null
              : null
          )}
        >
          {`${Math.ceil(message?.value?.length / characterLimit)} /
            ${message?.value?.length}
          `}
        </div>
      </FlexBox>
      <FlexBox hAlign={"flex-end"}>
        <Button
          isDisabled={!!recipientMobileError || message?.value.length < 1}
          onClick={() =>
            handleSendSms({
              message: message.value,
              recipientMobile: recipientMobile.value,
            })
          }
        >
          {iln.gettext("Send")}
        </Button>
      </FlexBox>
    </React.Fragment>
  );
};

SmsEditor.propTypes = propTypes;
export default SmsEditor;
