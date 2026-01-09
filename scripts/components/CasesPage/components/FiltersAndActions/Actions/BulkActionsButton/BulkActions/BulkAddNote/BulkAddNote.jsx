import {
  Button,
  FlexBox,
  FormTextareaInput,
  Spinner,
  Step,
  Stepper,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import ConfirmationModal from "../../../../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import OperationCompletedModal from "../../../../../../../common/Modal/OperationCompletedModal/OperationCompletedModal.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import formatNumberForDisplay from "../helpers/formNumberForDisplay.js";
import propTypes from "./BulkAddNote.propTypes.js";
import useStyles from "./BulkAddNote.styles.js";
import { useTheme } from "react-jss";

const BulkAddNote = ({ state, onBackClick, refreshResults, closeModal }) => {
  const [note, setNote] = useState("");
  const [casesAffected, setCasesAffected] = useState();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const classes = useStyles(theme);
  const iln = useContext(TranslationContext);

  if (loading)
    return (
      <FlexBox hAlign={"center"}>
        <Spinner scale={2} />
      </FlexBox>
    );

  return (
    <Stepper step={step}>
      <Step>
        <FormTextareaInput
          onChange={({ target: { value } }) => setNote(value)}
          name={"note"}
          numberOfRows={50}
          numberOfColumns={75}
          value={note}
        />
        <FlexBox hAlign={"space-between"}>
          <Button onClick={onBackClick}>{iln.gettext("Back")}</Button>
          <Button isDisabled={note.trim() === ""} onClick={() => setStep(1)}>
            {iln.gettext("Add note")}
          </Button>
        </FlexBox>
      </Step>

      <Step>
        <ConfirmationModal
          message={
            <React.Fragment>
              <p className={classes.center}>
                {iln.ngettext(
                  "This will add your note to %1 case.",
                  "This will add your note to %1 cases.",
                  formatNumberForDisplay(state.results.totalResults)
                )}
              </p>
              <p className={classes.center}>
                {iln.gettext(
                  "To continue, enter the number of cases that will be affected in the box below."
                )}
              </p>
            </React.Fragment>
          }
          buttonText="Confirm"
          confirmationValue={state.results.totalResults?.toString()}
          modifyInputValues={(value) => value.replaceAll(",", "")}
          onConfirm={() => {
            setLoading(true);
            api
              .bulkAddNote({ caseSearch: state.filters, note })
              .then(({ notesCreated }) => {
                setCasesAffected(notesCreated);
                setLoading(false);
                setStep(2);
                refreshResults();
              });
          }}
        />
      </Step>

      <Step>
        <OperationCompletedModal handleDone={closeModal}>
          <p className={classes.center}>
            {iln.ngettext(
              "Note successfully added to %1 case.",
              "Note successfully added to %1 cases.",
              formatNumberForDisplay(casesAffected)
            )}
          </p>
        </OperationCompletedModal>
      </Step>
    </Stepper>
  );
};

BulkAddNote.propTypes = propTypes;

export default BulkAddNote;
