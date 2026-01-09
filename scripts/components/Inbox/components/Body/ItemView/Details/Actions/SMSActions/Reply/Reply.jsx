import { Button, SliderContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import SmsEditor from "../../../../../../../../ViewCase/ActionsAndNotes/CasenoteCreators/WriteSms/SmsEditor/SmsEditor.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { installationSmsNumber } from "../../../../../../../../ViewCase/ActionsAndNotes/CasenoteCreators/util/installationSmsNumber";
import propTypes from "./Reply.propTypes.js";
import useOpenUpdateCaseDetailsModal from "../../../../../../../hooks/useOpenUpdateCaseDetailsModal.js";

const smsFromNumber = installationSmsNumber();

const Reply = ({ sms }) => {
  const { sliderActions } = useContext(SliderContext);
  const iln = useContext(TranslationContext);

  const openUpdateCaseDetails = useOpenUpdateCaseDetailsModal();

  const from =
    sms?.from?.email ||
    (["number", "string"].includes(typeof sms?.from) ? sms?.from : "");

  return (
    <Button
      size="small"
      onClick={() =>
        sliderActions.open({
          title: iln.gettext("Send a SMS"),
          component: (
            <SmsEditor
              recipientMobile={from}
              handleSendSms={({ message, recipientMobile }) =>
                api
                  .sendSms({
                    caseID: sms.caseID,
                    from: smsFromNumber.toString(),
                    to: recipientMobile,
                    body: message,
                  })
                  .then(() => {
                    sliderActions.close();
                    openUpdateCaseDetails(sms);
                  })
              }
            />
          ),
        })
      }
    >
      {iln.gettext("Reply")}
    </Button>
  );
};

Reply.propTypes = propTypes;

export default Reply;
