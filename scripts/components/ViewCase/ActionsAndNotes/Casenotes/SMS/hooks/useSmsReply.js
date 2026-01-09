import React from "react";
import { SliderContext } from "@electedtech/electedtech-ui";
import SmsEditor from "../../../CasenoteCreators/WriteSms/SmsEditor/SmsEditor.jsx";
import { TranslationContext } from "context/translate";
import { installationSmsNumber } from "../../../CasenoteCreators/util/installationSmsNumber";
import { useContext } from "react";
import useSendSms from "../../../../hooks/useSendSms";

const useSmsReply = (casenote) => {
  const {
    detail: { from },
    caseID,
  } = casenote;

  const fromNumber = installationSmsNumber();

  const { sliderActions } = useContext(SliderContext);
  const iln = useContext(TranslationContext);
  const [sendSms] = useSendSms();

  const openSliderWithSmsEditor = () => {
    sliderActions.open({
      title: iln.gettext("Send SMS"),
      component: (
        <SmsEditor
          recipientMobile={from?.toString()}
          handleSendSms={({ message, recipientMobile }) =>
            sendSms({
              caseID,
              from: fromNumber.toString(),
              to: recipientMobile,
              body: message,
            })
          }
        />
      ),
    });
  };
  const handleSmsReply = () => {
    openSliderWithSmsEditor();
  };

  return [handleSmsReply];
};

export default useSmsReply;
