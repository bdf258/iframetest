import {
  Button,
  FlexBox,
  FormTextInput,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import CasenoteCard from "../CasenoteCard/CasenoteCard.jsx";
import CaseworkerSelect from "../../../../common/CaseDetailInputs/CaseworkerSelect/CaseworkerSelect.jsx";
import EmailAttachments from "../../../../common/EmailAttachments.jsx";
import ReceivedEmailIcon from "../../../../common/icons/ReceivedEmailIcon.jsx";
import ResetGlobalStylesOnEmail from "../../../../common/ResetGlobalStylesOnEmail/ResetGlobalStylesOnEmail.jsx";
import SanitiseHtml from "../../../../common/SanitiseHtml/SanitiseHtml.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { getUserIdentity } from "../../../../../helpers/localStorageHelper.js";
import newlineToBreak from "../../../../common/Email/util/newlineToBreak";
import propTypes from "./propTypes";
import { removeInvalidEmailAddress } from "../../../helpers/removeInvalidEmailAddresses";
import swapNameForEmailIfEmailInvalid from "./util/swapNameForEmailIfEmailInvalid.js";
import { toLocalDate } from "../../../../../helpers/timezoneHelpers.js";
import { useCancelScheduled } from "./hooks/useCancelScheduled";
import { useDeleteNote } from "./hooks/useDeleteNote";
import { useHandleEditDraft } from "./hooks/useHandleEditDraft";
import useHandleEmailForward from "./hooks/useHandleEmailForward";
import { useHandleEmailReply } from "./hooks/useHandleEmailReply";
import { useHandleReplyAll } from "./hooks/useHandleReplyAll";
import { useLoadThread } from "./hooks/useLoadThread";
import { usePrint } from "./hooks/usePrint.js";
import { useReduxSlice } from "./Email.redux";
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

const isWithinminutesMinutes = (localDate, minutes) =>
  new Date(localDate) - new Date() <= minutes * 60 * 1000;

const sentEmail = (emailType) => {
  if (emailType === "sent") return true;
  if (emailType === "sent-new") return true;
  return false;
};

const Email = ({ casenote, title, index }) => {
  casenote = swapNameForEmailIfEmailInvalid(casenote);
  const theme = useTheme();
  const classes = useStyles({
    theme,
    usePlainBody: casenote.detail.purifiedBody === "",
  });
  const iln = useContext(TranslationContext);

  const { detail } = casenote;

  const { updateCasenote, caseworkers, selectedCaseNote } = useReduxSlice();

  const [handleEditDraft] = useHandleEditDraft(detail.id, casenote, index);
  const [handleDeleteNote] = useDeleteNote(casenote, index);
  const [handleReply] = useHandleEmailReply(casenote);
  const [handleReplyAll] = useHandleReplyAll(casenote);
  const [handleForward] = useHandleEmailForward(casenote);
  const [handleCancelScheduled] = useCancelScheduled(casenote, index);
  const [handlePrint] = usePrint(casenote);
  const [handleLoadThread, thread, loadingThread] = useLoadThread(
    casenote,
    index
  );

  const to = removeInvalidEmailAddress(detail.to);
  const cc = removeInvalidEmailAddress(detail.cc);
  const bcc = removeInvalidEmailAddress(detail.bcc);

  const isUserAdmin = getUserIdentity().isAdmin;

  return (
    <CasenoteCard
      id={casenote.id}
      title={title && iln.gettext(title)}
      icon={<ReceivedEmailIcon />}
      header={
        <div>
          {createTextInput(
            iln.gettext("From"),
            classes,
            detail?.from?.name
              ? `${detail?.from?.name} <${detail?.from?.email}>`
              : detail?.from?.email
          )}
          {createTextInput(
            iln.gettext("To"),
            classes,
            getInputFromEmailAddresses(to)
          )}
          {cc.length >= 1 &&
            createTextInput(
              iln.gettext("Cc"),
              classes,
              getInputFromEmailAddresses(cc)
            )}
          {bcc.length >= 1 &&
            createTextInput(
              iln.gettext("Bcc"),
              classes,
              getInputFromEmailAddresses(bcc)
            )}
          {createTextInput(iln.gettext("Subject"), classes, detail.subject)}
          {caseworkers && detail.type === "draft" && (
            <CaseworkerSelect
              name="assignedTo"
              label={iln.gettext("Assigned To")}
              caseworkers={caseworkers}
              value={detail.assignedTo}
              includeUnassignedOption
              onChange={(e) =>
                api
                  .updateEmailAssignedTo(detail.id, e.target.value)
                  .then(({ assignedTo }) => {
                    updateCasenote(index, {
                      ...casenote,
                      detail: { ...detail, assignedTo },
                    });
                  })
              }
              customClassNames={{
                container: classes.inputContainer,
              }}
            />
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
      right={
        <React.Fragment>
          {detail.type === "draft" ? (
            selectedCaseNote !== casenote.id && (
              <React.Fragment>
                <Button size="small" onClick={handleEditDraft}>
                  {iln.gettext("Edit")}
                </Button>
                <Button size="small" onClick={handleDeleteNote}>
                  {iln.gettext("Delete")}
                </Button>
              </React.Fragment>
            )
          ) : detail.type === "scheduled" ? (
            <React.Fragment>
              <Button
                onClick={handleCancelScheduled}
                disabled={isWithinminutesMinutes(
                  toLocalDate(casenote.timestamp),
                  30
                )}
              >
                {iln.gettext("Cancel Scheduled Send")}
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button
                className={classes.actionButton}
                size="small"
                onClick={handleReply}
              >
                {iln.gettext("Reply")}
              </Button>
              <Button
                className={classes.actionButton}
                size="small"
                onClick={handleReplyAll}
              >
                {iln.gettext("Reply All")}
              </Button>
              <Button
                className={classes.actionButton}
                size="small"
                onClick={handlePrint}
              >
                {iln.gettext("Print")}
              </Button>
              <Button
                className={classes.actionButton}
                size="small"
                onClick={handleForward}
              >
                {iln.gettext("Forward")}
              </Button>
              {!sentEmail(detail.type) && (
                <Button
                  size="small"
                  onClick={() =>
                    api
                      .updateEmailActioned(detail.id, !detail.actioned)
                      .then(() =>
                        updateCasenote(index, {
                          ...casenote,
                          detail: {
                            ...detail,
                            actioned: !detail.actioned,
                          },
                        })
                      )
                  }
                >
                  {detail.actioned
                    ? iln.gettext("Mark as unactioned")
                    : iln.gettext("Mark as actioned")}
                </Button>
              )}
              {sentEmail(detail.type) && isUserAdmin && (
                <Button size="small" onClick={handleDeleteNote}>
                  {iln.gettext("Delete")}
                </Button>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      }
      footer={
        casenote.detail.threaded &&
        !thread && (
          <FlexBox hAlign={"center"}>
            {loadingThread ? (
              <Spinner scale={0.8} />
            ) : (
              <Button type={"text"} onClick={() => handleLoadThread()}>
                View more
              </Button>
            )}
          </FlexBox>
        )
      }
    />
  );
};

Email.propTypes = propTypes;

export default Email;
