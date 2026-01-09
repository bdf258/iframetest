/*global CKEDITOR */

import {
  Button,
  ButtonBar,
  FlexBox,
  ModalContext,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import LetterPreview from "../../../ViewCase/common/LetterPreview/LetterPreview.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./propTypes";
import { useStyles } from "./styles";

const handlePrintLetter = async (
  letterRef,
  letterId,
  classes,
  modalActions,
  handleSaveLetter,
  parseLetter,
  signed
) => {
  const { parsedBody, parsedFooter } = parseLetter();
  await handleSaveLetter(parsedBody, parsedFooter);
  modalActions.add({
    id: "view_letter_pdf_modal",
    title: letterRef,
    blurBackground: true,
    component: (
      <LetterPreview
        letterID={letterId}
        title={letterRef}
        showPrint
        showSave
        signed={signed}
      />
    ),
    customClassNames: {
      card: classes.modalCard,
    },
  });
};

const LetterActionsHeader = ({
  letterRef,
  letterId,
  parseLetter,
  handleSendViaEmail,
  handleSaveLetter,
}) => {
  const classes = useStyles();

  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  return (
    <FlexBox hAlign={"flex-end"}>
      <ButtonBar customClassNames={classes.actionsButtonBar}>
        <Button
          size="small"
          onClick={() =>
            handlePrintLetter(
              letterRef,
              letterId,
              classes,
              modalActions,
              handleSaveLetter,
              parseLetter,
              false
            )
          }
        >
          {iln.gettext("Print")}
        </Button>
        <Button
          size="small"
          onClick={() => {
            let instanceName = Object.keys(CKEDITOR.instances)[0];
            CKEDITOR.instances[instanceName].execCommand("printEnvelope");
          }}
        >
          {iln.gettext("Print Envelope")}
        </Button>
        <Button
          size="small"
          onClick={() =>
            handlePrintLetter(
              letterRef,
              letterId,
              classes,
              modalActions,
              handleSaveLetter,
              parseLetter,
              true
            )
          }
        >
          {iln.gettext("Print Headed")}
        </Button>
        <Button size="small" onClick={() => handleSendViaEmail()}>
          {iln.gettext("Send Via Email")}
        </Button>
      </ButtonBar>
    </FlexBox>
  );
};

LetterActionsHeader.propTypes = propTypes;

export default LetterActionsHeader;
