import React, { useContext } from "react";
import {
  formatDate,
  formatDateTime,
  toLocalDate,
} from "../../../../helpers/timezoneHelpers";

import BulkEmail from "./BulkEmails/BulkEmail.jsx";
import Email from "./Email/Email.jsx";
import File from "./File/File.jsx";
import Letter from "./Letter/Letter.jsx";
import Note from "./Note/Note.jsx";
import ReviewDate from "./ReviewDate/ReviewDate.jsx";
import SMS from "./SMS/SMS.jsx";
import { Spinner } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { isInvalidDateTime } from "../../../../helpers/formValidators.js";
import { useReduxSlice } from "./Casenotes.redux";
import { useStyles } from "./styles";

const getCreatorsName = (users, id, iln) => {
  const user = users.find((user) => +user.id === +id);
  return user ? user.name : iln.gettext("Unknown");
};

const createTitle = (type, users, userID, timestamp, iln) => {
  return `${type} (${getCreatorsName(users, userID, iln)}, ${
    isInvalidDateTime(timestamp)
      ? "Invalid Date"
      : formatDateTime(toLocalDate(timestamp))
  })`;
};

/**
 * Review dates are not prefixed with a last edited timestamp in the title like other notes.
 * Instead, the review date is directly included in the case note title.
 */
const reviewDateTitle = ({ type, users, userID, reviewDate, iln }) => {
  return `${type} (${getCreatorsName(users, userID, iln)}, ${
    isInvalidDateTime(reviewDate)
      ? "Invalid Date"
      : formatDate(toLocalDate(reviewDate))
  })`;
};

const selectCasenote = ({
  constituent,
  caseworkers,
  casenote,
  updateCasenote,
  autoUpdateCasenote,
  removeCasenote,
  index,
  iln,
}) => {
  const createTitleType = (type) =>
    createTitle(
      type,
      caseworkers,
      casenote.caseworkerID,
      casenote.timestamp,
      iln
    );

  /**
   * Time stamps used for emails in the case notes feed:
   * external-new: creation date
   * sent: creation date
   * draft: last edited
   */
  const createTitleForEmail = (type) => {
    const emailType = casenote.detail.type;

    switch (emailType) {
      case "external-new":
      case "sent":
      case "sent-new":
        return createTitle(
          type,
          caseworkers,
          casenote.caseworkerID,
          casenote.detail.dateTime,
          iln
        );
      case "draft":
        return createTitle(
          type,
          caseworkers,
          casenote.caseworkerID,
          casenote.timestamp,
          iln
        );
      case "scheduled":
        return (!isInvalidDateTime(casenote.detail.schedule)  && (toLocalDate((casenote.detail.schedule)) < new Date())
          ? createTitle(
              "Email",
              caseworkers,
              casenote.caseworkerID,
              casenote.detail.schedule,
              iln
            )
          : createTitle(
              type,
              caseworkers,
              casenote.caseworkerID,
              casenote.detail.schedule,
              iln
            ));
  
      default:
        return "Invalid Email Type"; 
    }
  };
  

  const emailNote = (emailTitle) => {
    return (
      <Email
        casenote={casenote}
        index={index}
        title={emailTitle}
        key={casenote.id}
      />
    );
  };

  switch (casenote.type) {
    case "email": {
      switch (casenote.detail.type) {
        case "SMS-inbound":
        case "SMS-outbound": {
          return (
            <SMS
              index={index}
              key={casenote.id}
              casenote={casenote}
              title={createTitleType(iln.gettext("SMS"))}
            />
          );
        }

        case "draft":
          return emailNote(createTitleForEmail(iln.gettext("Draft Email")));
        case "scheduled":
          return emailNote(createTitleForEmail(iln.gettext("Scheduled Email")));
        default:
          return emailNote(createTitleForEmail(iln.gettext("Email")));
      }
    }

    case "bulkEmail":
      return (
        <BulkEmail
          casenote={casenote}
          index={index}
          title={createTitleType(iln.gettext("Bulk Email"))}
          key={casenote.id}
        />
      );

    case "letter":
      return (
        <Letter
          casenote={casenote}
          index={index}
          title={createTitleType(iln.gettext("Letter"))}
          key={casenote.id}
        />
      );
    case "note":
      return (
        <Note
          key={casenote.id}
          casenote={casenote}
          title={createTitleType(iln.gettext("Note"))}
          updateCasenote={updateCasenote}
          autoUpdateCasenote={autoUpdateCasenote}
          removeCasenote={removeCasenote}
        />
      );
    case "file":
      return (
        <File
          constituent={constituent}
          key={casenote.id}
          casenote={casenote}
          title={createTitleType(iln.gettext("File"))}
          removeCasenote={removeCasenote}
          updateCasenote={updateCasenote}
        />
      );
    case "reviewDate":
      return (
        <ReviewDate
          key={casenote.id}
          index={index}
          casenote={casenote}
          caseworkers={caseworkers}
          title={reviewDateTitle({
            type: iln.gettext("Review Date"),
            users: caseworkers,
            userID: casenote.caseworkerID,
            reviewDate: casenote?.detail?.reviewDate,
            iln,
          })}
          updateCasenote={updateCasenote}
          removeCasenote={removeCasenote}
        />
      );
  }
};
const Casenotes = () => {
  const classes = useStyles();

  const iln = useContext(TranslationContext);

  const {
    caseworkers,
    casenotes,
    removeCasenote,
    updateCasenote,
    casenotesFetching,
    constituent,
    temporaryNotes,
    autoUpdateCasenoteByNoteId,
  } = useReduxSlice();

  const uniqueNotes = {};

  /**
   * #emailDiv CSS Id
   * removes global styles (form theming) targeted at various table elements.
   * Email related case notes would take on caseworker theme related styles, misleading for the user as the email that arrives in the recipient inbox would not retain the styles.
   */

  return (
    <div id="emailDiv">
      {caseworkers && casenotes && casenotes.length > 0 ? (
        <div>
          {casenotes
            .filter((note) => {
              // removes duplicate notes from feed
              if (!uniqueNotes[note.id]) {
                uniqueNotes[note.id] = true;
                return true;
              }
              return false;
            })
            .filter((note) => !temporaryNotes.includes(note.id))
            .map((casenote, index) =>
              selectCasenote({
                constituent,
                caseworkers,
                casenote,
                updateCasenote: (casenote) =>
                  updateCasenote({ index, casenote }),
                removeCasenote: () => removeCasenote(index),
                autoUpdateCasenote: (casenote) =>
                  autoUpdateCasenoteByNoteId({
                    noteId: casenote.id,
                    casenote: casenote,
                  }),
                index,
                iln,
              })
            )}
          {casenotesFetching ? (
            <div className={classes.casenotesFetching}>
              <Spinner scale={2} />
            </div>
          ) : undefined}
        </div>
      ) : (
        <p className={classes.center}>
          <b>{iln.gettext("No casenotes to display")}</b>
        </p>
      )}
    </div>
  );
};

export default Casenotes;
