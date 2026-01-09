import {
  FormCheckbox,
  ModalContext,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import AddReviewDate from "../../ViewCase/common/AddReviewDate/AddReviewDate.jsx";
import ComponentLoading from "../../ComponentLoading.jsx";
import { DATE_FORMAT } from "../../../consts/Date.js";
import DraftEmailIcon from "../icons/DraftEmailIcon.jsx";
import FileIcon from "../icons/FileIcon.jsx";
import LetterIcon from "../icons/LetterIcon.jsx";
import NoteIcon from "../icons/NoteIcon.jsx";
import ReviewCompleteIcon from "../icons/ReviewDateCompleteIcon.jsx";
import ReviewIcon from "../icons/ReviewDateIcon.jsx";
import SMSIcon from "../icons/SMSIcon.jsx";
import { TranslationContext } from "context/translate";
import classnames from "classnames";
import format from "date-fns/format";
import { parseISO } from "date-fns";
import propTypes from "./propTypes.js";
import scrollToCasenote from "../../ViewCase/helpers/scrollToCasenote.js";
import { useStyles } from "./styles.js";
import { useTheme } from "react-jss";

const actionSummaryModalID = "action_summary";

const createTypeCell = (casenote, classes, iln) => {
  switch (casenote.type) {
    case "email":
      return [
        <DraftEmailIcon key="icon" className={classes.icon} />,
        <div key="text">{iln.gettext("Email")}</div>,
      ];
    case "bulkEmail":
      return [
        <DraftEmailIcon key="icon" className={classes.icon} />,
        <div key="text">{iln.gettext("Bulk Email")}</div>,
      ];
    case "sms":
      return [
        <SMSIcon key="icon" className={classes.icon} />,
        <div key="text">{iln.gettext("SMS")}</div>,
      ];
    case "file":
      return [
        <FileIcon key="icon" className={classes.icon} />,
        <div key="text">{iln.gettext("File")}</div>,
      ];
    case "letter":
      return [
        <LetterIcon key="icon" className={classes.icon} />,
        <div key="text">{iln.gettext("Letter")}</div>,
      ];
    case "note":
      return [
        <NoteIcon key="icon" className={classes.icon} />,
        <div key="text">{iln.gettext("Note")}</div>,
      ];
    case "reviewDate":
      return [
        casenote.detail.completed ? (
          <ReviewCompleteIcon key="icon" className={classes.icon} />
        ) : (
          <ReviewIcon key="icon" className={classes.icon} />
        ),
        <div key="text">{iln.gettext("Review")}</div>,
      ];
  }
};

const getEmailAddresses = (addresses) =>
  (Array.isArray(addresses) ? addresses : [addresses])
    .reduce((acc, { email }) => [...acc, email], [])
    .join(", ");

const getCasenoteSummary = (casenote, iln, classes) => {
  const maxChars = 75;
  const cutOffText = (text = "") =>
    text.length > maxChars ? text.substring(0, maxChars) + "..." : text;

  switch (casenote.type) {
    case "bulkEmail":
      return (
        <div className={classes.flexTable}>
          <div>
            <div>{iln.gettext("From:")}</div>
            <div>{iln.gettext("To:")}</div>
            <div>{iln.gettext("Subject:")}</div>
          </div>
          <div>
            <div>{getEmailAddresses({ email: casenote.note.from })}</div>
            <div>{getEmailAddresses({ email: casenote.note.to })}</div>
            <div>{cutOffText(casenote.note.subject)}</div>
          </div>
        </div>
      );
    case "email":
      return (
        <div className={classes.flexTable}>
          <div>
            <div>{iln.gettext("From:")}</div>
            <div>{iln.gettext("To:")}</div>
            <div>{iln.gettext("Subject:")}</div>
          </div>
          <div>
            <div>{getEmailAddresses(casenote.detail.from)}</div>
            <div>{getEmailAddresses(casenote.detail.to)}</div>
            <div>{cutOffText(casenote.detail.subject)}</div>
          </div>
        </div>
      );
    case "sms":
      return cutOffText(casenote.detail.subject);
    case "file":
      return cutOffText(casenote.detail.reference);
    case "letter":
      return cutOffText(casenote.detail.reference);
    case "note":
      return cutOffText(casenote.note);
    case "reviewDate":
      return cutOffText(casenote.detail.note);
  }
};

const createActionRow = ({
  casenote,
  idx,
  classes,
  modalActions,
  sliderActions,
  iln,
  onAddCasenote,
  onUpdateCasenote,
}) => {
  const date =
    casenote.type === "reviewDate"
      ? casenote.detail.reviewDate
      : casenote.timestamp || casenote.created;
  return (
    <TableRow
      key={idx}
      className={classes.row}
      onClick={() => {
        if (casenote.type === "reviewDate" && !casenote.detail.completed) {
          modalActions.removeById(actionSummaryModalID);
          sliderActions.open({
            title: iln.gettext("Edit Review"),
            component: (
              <AddReviewDate
                key={`update${casenote.id}`}
                caseID={casenote.detail.caseID}
                existingReview={casenote}
                addCasenote={onAddCasenote}
                updateCasenoteByID={onUpdateCasenote}
              />
            ),
          });
          setTimeout(() => scrollToCasenote(casenote.id), 400);
        } else {
          modalActions.removeById(actionSummaryModalID);
          scrollToCasenote(casenote.id);
        }
      }}
    >
      <TableCell className={classnames(classes.cell, classes.typeCell)}>
        <div className={classes.iconWrapper}>
          {createTypeCell(casenote, classes, iln)}
        </div>
      </TableCell>
      <TableCell className={classnames(classes.cell, classes.dateCell)}>
        {format(
          parseISO(date),
          `${DATE_FORMAT.DATE} ${
            casenote.type === "reviewDate" ? "" : DATE_FORMAT.TIME
          }`
        )}
      </TableCell>
      <TableCell className={classnames(classes.cell)}>
        {getCasenoteSummary(casenote, iln, classes)}
      </TableCell>
    </TableRow>
  );
};

const initialShow = {
  bulkEmail: true,
  email: true,
  letter: true,
  file: true,
  note: true,
  reviewDate: true,
};

const ActionSummary = ({
  showCasenotes = initialShow,
  sliderActions,
  casenotes,
  hasMore,
  onAddCasenote,
  onUpdateCasenote,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const [show, setShow] = useState(showCasenotes);

  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  if (hasMore) return <ComponentLoading />;

  return (
    <div className={classes.modal}>
      <div className={classes.checkboxes}>
        <div className={classes.showText}>Show:</div>
        <FormCheckbox
          name="bulkEmail"
          label={iln.gettext("Bulk Emails")}
          onChange={() => setShow({ ...show, bulkEmail: !show.bulkEmail })}
          value={show.bulkEmail}
          keepErrorSpacing={false}
          customClassNames={{
            container: classes.checkboxContainer,
            label: classes.checkboxLabel,
          }}
        />
        <FormCheckbox
          name="email"
          label={iln.gettext("Emails")}
          onChange={() => setShow({ ...show, email: !show.email })}
          value={show.email}
          keepErrorSpacing={false}
          customClassNames={{
            container: classes.checkboxContainer,
            label: classes.checkboxLabel,
          }}
        />
        <FormCheckbox
          name="letter"
          label={iln.gettext("Letters")}
          onChange={() => setShow({ ...show, letter: !show.letter })}
          value={show.letter}
          keepErrorSpacing={false}
          customClassNames={{
            container: classes.checkboxContainer,
            label: classes.checkboxLabel,
          }}
        />
        <FormCheckbox
          name="note"
          label={iln.gettext("Notes")}
          onChange={() => setShow({ ...show, note: !show.note })}
          value={show.note}
          keepErrorSpacing={false}
          customClassNames={{
            container: classes.checkboxContainer,
            label: classes.checkboxLabel,
          }}
        />
        <FormCheckbox
          name="file"
          label={iln.gettext("Files")}
          onChange={() => setShow({ ...show, file: !show.file })}
          value={show.file}
          keepErrorSpacing={false}
          customClassNames={{
            container: classes.checkboxContainer,
            label: classes.checkboxLabel,
          }}
        />
        <FormCheckbox
          name="reviewDate"
          label={iln.gettext("Review Dates")}
          onChange={() => setShow({ ...show, reviewDate: !show.reviewDate })}
          value={show.reviewDate}
          keepErrorSpacing={false}
          customClassNames={{
            container: classes.checkboxContainer,
            label: classes.checkboxLabel,
          }}
        />
      </div>
      <div className={classes.actionSummaryTableContainer}>
        <Table className={classes.actionSummaryTable}>
          <TableHead>
            <TableHeader>{iln.gettext("Type")}</TableHeader>
            <TableHeader>{iln.gettext("Date")}</TableHeader>
            <TableHeader>{iln.gettext("Detail")}</TableHeader>
          </TableHead>
          <TableBody>
            {casenotes.reduce(
              (acc, casenote, idx) =>
                show[casenote.type]
                  ? [
                      ...acc,
                      createActionRow({
                        casenote,
                        idx,
                        classes,
                        modalActions,
                        sliderActions,
                        iln,
                        onAddCasenote,
                        onUpdateCasenote,
                      }),
                    ]
                  : acc,
              []
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

ActionSummary.propTypes = propTypes;

export default ActionSummary;
