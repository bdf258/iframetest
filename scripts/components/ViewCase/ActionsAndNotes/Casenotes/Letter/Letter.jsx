import { Button, List } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import CasenoteCard from "../CasenoteCard/CasenoteCard.jsx";
import { DATE_FORMAT } from "../../../../../consts/Date";
import LetterIcon from "../../../../common/icons/LetterIcon.jsx";
import LetterTitle from "./LetterTitle/LetterTitle.jsx";
import { TranslationContext } from "context/translate";
import classnames from "classnames";
import format from "date-fns/format";
import { parseISO } from "date-fns";
import propTypes from "./propTypes";
import { useDeleteLetter } from "./hooks/useDeleteLetter";
import { useEditLetter } from "./hooks/useEditLetter";
import { useGenerateHeadedLetter } from "./hooks/useGenerateHeadedLetter";
import { usePrintLetter } from "./hooks/usePrintLetter";
import { useReduxSlice } from "./Letter.redux";
import { useSendViaEmail } from "./hooks/useSendViaEmail";
import { useStyles } from "./styles";

const Letter = ({ casenote, title, index }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { selectedNote } = useReduxSlice();

  const [handleEditLetter] = useEditLetter(casenote, index);
  const [handleDeleteLetter] = useDeleteLetter(casenote, index);
  const [handleSendViaEmail] = useSendViaEmail(casenote);
  const [handleGenerateHeadedLetter] = useGenerateHeadedLetter(
    casenote.detail.reference,
    casenote.detail.id
  );
  const [handlePrintLetter] = usePrintLetter(
    casenote.detail.reference,
    casenote.detail.id
  );

  return (
    <CasenoteCard
      id={casenote.id}
      title={iln.gettext(title)}
      icon={
        <button className={classes.iconButton} onClick={handlePrintLetter}>
          <LetterIcon />
        </button>
      }
      main={
        <div>
          <LetterTitle casenote={casenote} index={index} />
          <List indent={false} bulletPoints={false}>
            <ul>
              <li className={classes.listItem}>
                <strong>Created: </strong>
                {format(parseISO(casenote.detail.created), DATE_FORMAT.DATE)}
              </li>
              <li className={classes.listItem}>
                <strong>Last Updated: </strong>
                {format(parseISO(casenote.detail.updated), DATE_FORMAT.DATE)}
              </li>
            </ul>
          </List>
        </div>
      }
      right={
        <React.Fragment>
          <Button
            size="small"
            onClick={() => handleSendViaEmail(casenote.detail.id, casenote)}
          >
            {iln.gettext("Send Via Email")}
          </Button>
          <Button size="small" onClick={() => handleGenerateHeadedLetter()}>
            {iln.gettext("Headed Copy")}
          </Button>
          <Button
            size="small"
            customClassNames={classnames(
              classes.buttonSpacing,
              classes.actionButton
            )}
            onClick={handlePrintLetter}
          >
            {iln.gettext("Print")}
          </Button>
          {selectedNote !== casenote.id && (
            <React.Fragment>
              <Button
                className={classes.actionButton}
                size="small"
                onClick={() => handleEditLetter(casenote.detail.id)}
              >
                {iln.gettext("Edit")}
              </Button>
              <Button
                className={classes.actionButton}
                size="small"
                onClick={() => handleDeleteLetter(casenote, index)}
              >
                {iln.gettext("Delete")}
              </Button>
            </React.Fragment>
          )}
        </React.Fragment>
      }
    />
  );
};

Letter.propTypes = propTypes;

export default Letter;
