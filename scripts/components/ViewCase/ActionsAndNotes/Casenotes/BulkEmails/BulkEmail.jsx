import React, { useContext } from "react";

import CasenoteCard from "../CasenoteCard/CasenoteCard.jsx";
import EmailAttachments from "../../../../common/EmailAttachments.jsx";
import { FormTextInput } from "@electedtech/electedtech-ui";
import ReceivedEmailIcon from "../../../../common/icons/ReceivedEmailIcon.jsx";
import ResetGlobalStylesOnEmail from "../../../../common/ResetGlobalStylesOnEmail/ResetGlobalStylesOnEmail.jsx";
import SanitiseHtml from "../../../../common/SanitiseHtml/SanitiseHtml.jsx";
import { TranslationContext } from "context/translate";
import newlineToBreak from "../../../../common/Email/util/newlineToBreak";
import propTypes from "./propTypes";
import { removeInvalidEmailAddress } from "../../../helpers/removeInvalidEmailAddresses";
import { useStyles } from "./styles";
import { useTheme } from "react-jss";

const createTextInput = (label, classes, value) => (
  <FormTextInput
    name={label}
    label={label}
    value={value}
    onChange={() => {}}
    readOnly
    keepErrorSpacing={false}
    customClassNames={{
      container: classes.inputContainer,
    }}
  />
);

const getInputFromEmailAddresses = (addresses) => {
  return addresses
    ? addresses
        .map((address) =>
          address.name ? `${address.name}<${address.email}>` : address.email
        )
        .join(", ")
    : "";
};

const BulkEmail = ({ casenote, title }) => {
  const theme = useTheme();
  const classes = useStyles({
    theme,
    usePlainBody: casenote.detail.purifiedBody === "",
  });
  const iln = useContext(TranslationContext);

  const { detail } = casenote;

  const to = removeInvalidEmailAddress([{ email: casenote.note.to }]);

  return (
    <CasenoteCard
      id={casenote.id}
      title={iln.gettext(title)}
      icon={<ReceivedEmailIcon />}
      right={""}
      header={
        <div>
          {createTextInput(iln.gettext("From"), classes, casenote.note.from)}
          {createTextInput(
            iln.gettext("To"),
            classes,
            getInputFromEmailAddresses(to)
          )}
          {createTextInput(
            iln.gettext("Subject"),
            classes,
            casenote.note.subject
          )}
          {detail.attachments && detail.attachments.length > 0 && (
            <div className={classes.emailAttachmentContainer}>
              <EmailAttachments attachments={detail.attachments} />
            </div>
          )}
        </div>
      }
      main={
        <ResetGlobalStylesOnEmail>
          <SanitiseHtml
            parent={<div className={classes.emailContentContainer} />}
          >
            {detail.purifiedBody || newlineToBreak(detail?.plainBody)}
          </SanitiseHtml>
        </ResetGlobalStylesOnEmail>
      }
      footer={""}
    />
  );
};

BulkEmail.propTypes = propTypes;

export default BulkEmail;
