import {
  Button,
  FormTextInput,
  ModalContext,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import CasenoteCard from "../CasenoteCard/CasenoteCard.jsx";
import SMSAPI from "../../../../../api/src/sms";
import SMSIcon from "../../../../common/icons/SMSIcon.jsx";
import SanitiseHtml from "../../../../common/SanitiseHtml/SanitiseHtml.jsx";
import { TranslationContext } from "context/translate";
import { canSendSms } from "../../CasenoteCreators/util/canSendSms";
import { formatMobileNumberForDisplay } from "../../util/formatMobileNumbers";
import propTypes from "./propTypes";
import { useReduxSlice } from "./SMS.redux";
import useSmsReply from "./hooks/useSmsReply";
import { useStyles } from "./styles";

const SMS = ({ casenote, title }) => {
  const { modalActions } = useContext(ModalContext);

  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const { id, from, to, plainBody, type, actioned } = casenote.detail;

  const canReply = type === "SMS-inbound" && canSendSms();
  const hasRecipient = type === "SMS-outbound";
  const canMarkAsActioned = type === "SMS-inbound";
  const { updateCasenoteByNoteId } = useReduxSlice();
  const [handleSmsReply] = useSmsReply(casenote);

  return (
    <CasenoteCard
      id={casenote.id}
      title={iln.gettext(title)}
      icon={<SMSIcon />}
      header={
        <React.Fragment>
          <FormTextInput
            name="From"
            label={iln.gettext("From")}
            value={formatMobileNumberForDisplay(
              from?.email ? from.email : from.toString()
            )}
            onChange={() => {}}
            keepErrorSpacing={false}
            readOnly
            customClassNames={{
              container: classes.textContainer,
              input: classes.textInput,
            }}
          />
          {hasRecipient && (
            <FormTextInput
              name="From"
              label={iln.gettext("To")}
              value={formatMobileNumberForDisplay(
                to[0]?.email ? to[0].email : to[0]
              )}
              onChange={() => {}}
              keepErrorSpacing={false}
              readOnly
              customClassNames={{
                container: classes.textContainer,
                input: classes.textInput,
              }}
            />
          )}
        </React.Fragment>
      }
      main={
        <React.Fragment>
          <SanitiseHtml>{plainBody}</SanitiseHtml>
        </React.Fragment>
      }
      right={
        <React.Fragment>
          {canReply && (
            <Button size="small" onClick={() => handleSmsReply()}>
              {iln.gettext("Reply")}
            </Button>
          )}
          {canMarkAsActioned && (
            <Button
              size={"small"}
              onClick={() =>
                SMSAPI.updateSmsActioned(
                  { id, actioned: !actioned },
                  modalActions
                ).then(({ actioned }) => {
                  updateCasenoteByNoteId(casenote.id, {
                    ...casenote,
                    detail: { ...casenote.detail, actioned },
                  });
                })
              }
            >
              {actioned
                ? iln.gettext("Mark as unactioned")
                : iln.gettext("Mark as Actioned")}
            </Button>
          )}
        </React.Fragment>
      }
    />
  );
};

SMS.propTypes = propTypes;

export default SMS;
