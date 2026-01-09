import {
  Button,
  FlexBox,
  ModalContext,
  Step,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import ComponentLoading from "../../../../../../../ComponentLoading.jsx";
import ConfirmationModal from "../../../../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import OperationCompletedModal from "../../../../../../../common/Modal/OperationCompletedModal/OperationCompletedModal.jsx";
import TagInput from "../../../../../../../common/CaseDetailInputs/TagInput.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import formatNumberForDisplay from "../helpers/formNumberForDisplay.js";
import propTypes from "./BulkAddTags.propTypes.js";
import useStyles from "./BulkAddTags.styles.js";
import { useTheme } from "react-jss";

const joinTagLabels = (tags, { iln }) => {
  return tags.length > 1 ? (
    <React.Fragment>
      <strong>{tags.slice(0, -1).join(", ")}</strong> {iln.gettext("and")}{" "}
      <strong>{tags.slice(-1)[0]} </strong>{" "}
    </React.Fragment>
  ) : (
    <strong>{tags[0]} </strong>
  );
};

const BulkAddTags = ({ state, onBackClick, refreshResults, closeModal }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [tags, setTags] = useState([]);
  const [affectedCases, setAffectedCases] = useState([]);
  const [error, setError] = useState();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  if (loading)
    return (
      <div className={classes.innerModalContainer}>
        <ComponentLoading />
      </div>
    );

  return (
    <div className={classes.innerModalContainer}>
      <Stepper step={step}>
        <Step>
          <p>
            {iln.gettext(
              "Enter the tags you wish to add to your selected cases below"
            )}
          </p>
          <TagInput
            name="tagsToAdd"
            label="Tags to Add"
            value={{ chips: tags }}
            onChange={({
              target: {
                value: { chips },
              },
            }) => {
              setTags(chips);
              if (chips.length === 0)
                setError(iln.gettext("At least 1 tag is required to continue"));
              else setError();
            }}
            keepErrorSpacing={true}
            error={error}
          />
          <FlexBox hAlign="space-between">
            <Button onClick={onBackClick}>{iln.gettext("Back")}</Button>
            <Button isDisabled={tags.length === 0} onClick={() => setStep(1)}>
              {iln.gettext("Add tags")}
            </Button>
          </FlexBox>
        </Step>

        <Step>
          <ConfirmationModal
            validateNumber
            errorTextToDisplay={iln.gettext(
              "Input doesn't match the number of cases"
            )}
            message={
              <React.Fragment>
                <p className={classes.center}>
                  {iln.ngettext(
                    "This will add tag",
                    "This will add tags",
                    tags.length
                  )}{" "}
                  {joinTagLabels(
                    tags.map(({ tag }) => tag),
                    { iln }
                  )}
                  {iln.ngettext(
                    "to %1 case. No duplicates will be created.",
                    "to %1 cases, No duplicates will be created.",
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
            confirmText={iln.gettext("Confirm")}
            confirmationValue={state.results.totalResults.toString()}
            modifyInputValues={(value) => value.replaceAll(",", "")}
            onConfirm={() => {
              setLoading(true);
              api
                .bulkAddTags(
                  {
                    tags: tags.map(({ id }) => id),
                    caseSearch: state.filters,
                  },
                  modalActions,
                  iln
                )
                .then((affectedCases) => {
                  setAffectedCases(affectedCases);
                  setLoading(false);
                  refreshResults();
                  setStep(2);
                });
            }}
          />
        </Step>
        <Step>
          <OperationCompletedModal handleDone={closeModal}>
            <p className={classes.center}>Tags successfully added.</p>
            <Table>
              <TableHead>
                <TableHeader>{iln.gettext("Tag")}</TableHeader>
                <TableHeader>{iln.gettext("Cases Effected")}</TableHeader>
              </TableHead>
              <TableBody>
                {affectedCases.map(({ tagID, tagsAdded }) => (
                  <TableRow key={tagID}>
                    <TableCell textAlign="center" verticalAlign="middle">
                      {tags.find(({ id }) => id === tagID)?.tag}
                    </TableCell>
                    <TableCell textAlign="center" verticalAlign="middle">
                      {tagsAdded}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </OperationCompletedModal>
        </Step>
      </Stepper>
    </div>
  );
};

BulkAddTags.propTypes = propTypes;

export default BulkAddTags;
