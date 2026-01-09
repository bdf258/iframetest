import {
  Button,
  ModalContext,
  SliderContext,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import AddReviewDate from "../../../common/AddReviewDate/AddReviewDate.jsx";
import CasenoteCard from "../CasenoteCard/CasenoteCard.jsx";
import CaseworkerSelect from "../../../../common/CaseDetailInputs/CaseworkerSelect/CaseworkerSelect.jsx";
import CompleteIcon from "../../../../common/icons/ReviewDateCompleteIcon.jsx";
import { DATE_FORMAT } from "../../../../../consts/Date";
import DeleteCasenote from "../DeleteCasenote/DeleteCasenote.jsx";
import DummyTextInput from "../../../../common/DummyTextInput/DummyTextInput.jsx";
import Icon from "../../../../common/icons/ReviewDateIcon.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import createUpdatedReviewDateDetails from "../../../helpers/createUpdatedReviewDateDetails";
import { format } from "date-fns";
import { isInvalidDateTime } from "../../../../../helpers/formValidators.js";
import propTypes from "./propTypes";
import useGetReviewDateColourClass from "../../../hooks/useGetReviewDateColour.js";
import { useReduxSlice } from "./ReviewDate.redux";
import { useStyles } from "./styles";

const getAssignedName = (users, id, iln) => {
  const user = users.find((user) => parseInt(user.id) === parseInt(id));
  return user ? user.name : iln.gettext("Unknown");
};

const ReviewDate = ({
  casenote,
  title,
  removeCasenote,
  caseworkers,
  index,
}) => {
  const classes = useStyles();

  const { modalActions } = useContext(ModalContext);
  const { sliderActions } = useContext(SliderContext);
  const iln = useContext(TranslationContext);

  const {
    setReviewDateDetails,
    setSelectedNote,
    selectedNote,
    addCasenote,
    updateCasenoteByID,
  } = useReduxSlice();

  const { getReviewDateColour } = useGetReviewDateColourClass();

  const deleteModalID = `delete_note_${casenote.id}`;

  const confirmMessage = (
    <React.Fragment>
      <p>
        {iln.gettext(
          "Are you sure you want to delete this Review Date with reference which"
        )}
      </p>
      <p>
        {iln.gettext(
          "Please enter this extract below to confirm you wish to delete this note:"
        )}
      </p>
    </React.Fragment>
  );

  const formatDate = (date) => {
    if (isInvalidDateTime(date)) return "Invalid Date";
    const offset = -new Date().getTimezoneOffset();

    if (!date) return "Unknown";

    const dateAsIso = new Date(date).toISOString();

    return format(
      new Date(dateAsIso).setTime(
        new Date(dateAsIso).getTime(),
        offset * 60 * 1000
      ),
      DATE_FORMAT.DATE
    );
  };

  const assignedToName = getAssignedName(
    caseworkers,
    casenote?.detail?.assignedTo,
    iln
  );
  const completedByName = getAssignedName(
    caseworkers,
    casenote?.detail?.completedBy,
    iln
  );

  return (
    <CasenoteCard
      id={casenote.id}
      title={iln.gettext(title)}
      icon={
        casenote?.detail?.completed ? (
          <CompleteIcon />
        ) : (
          <Icon
            fill={getReviewDateColour(formatDate(casenote?.detail?.reviewDate))}
          />
        )
      }
      main={
        <div>
          <div className={classes.reviewMain}>
            {casenote?.detail?.completed ? (
              <div className={classes.reviewDetails}>
                <DummyTextInput
                  label={iln.gettext("Completed")}
                  value={`${formatDate(
                    casenote?.detail?.completedOn
                  )} ${iln.gettext("by")} ${completedByName}`}
                  customClassNames={{
                    container: classes.inputContainer,
                  }}
                />

                <DummyTextInput
                  label={iln.gettext("Deadline")}
                  value={formatDate(casenote?.detail?.reviewDate)}
                  customClassNames={{
                    container: classes.inputContainer,
                  }}
                />
                <DummyTextInput
                  label={iln.gettext("Assigned")}
                  value={assignedToName}
                  customClassNames={{
                    container: classes.inputContainer,
                  }}
                />
              </div>
            ) : (
              <div className={classes.reviewDetails}>
                <React.Fragment>
                  <DummyTextInput
                    label={iln.gettext("Review On")}
                    value={formatDate(casenote?.detail?.reviewDate)}
                    customClassNames={{
                      container: classes.inputContainer,
                    }}
                  />
                  <CaseworkerSelect
                    name="assignedTo"
                    label={iln.gettext("Assigned")}
                    caseworkers={caseworkers}
                    value={casenote?.detail?.assignedTo}
                    onChange={({ target: { value } }) => {
                      api
                        .updateReviewDate(
                          casenote?.detail?.id,
                          {
                            assignedTo: value,
                          },
                          modalActions
                        )
                        .then(() =>
                          setReviewDateDetails({ index, assignedTo: value })
                        );
                    }}
                    keepErrorSpacing={false}
                    customClassNames={{
                      container: classes.inputContainer,
                    }}
                  />
                </React.Fragment>
              </div>
            )}

            {casenote?.detail?.note && (
              <div className={classes.reviewNote}>{casenote?.detail?.note}</div>
            )}
          </div>
        </div>
      }
      right={
        <React.Fragment>
          {selectedNote !== casenote.id && (
            <React.Fragment>
              {!casenote?.detail?.completed && (
                <Button
                  className={classes.actionButton}
                  size="small"
                  onClick={() => {
                    setSelectedNote(casenote.id);
                    sliderActions.open({
                      title: iln.gettext("Edit Review"),
                      component: (
                        <AddReviewDate
                          key={`update${casenote.id}`}
                          existingReview={casenote}
                          addCasenote={addCasenote}
                          updateCasenoteByID={updateCasenoteByID}
                        />
                      ),
                      onClose: () => setSelectedNote(null),
                    });
                  }}
                >
                  {iln.gettext("Edit")}
                </Button>
              )}
              <Button
                size="small"
                onClick={() => {
                  if (casenote?.detail?.completed) {
                    setReviewDateDetails({
                      index,
                      ...createUpdatedReviewDateDetails(false),
                    });
                    api
                      .incompleteReviewDate(
                        casenote?.detail?.id,
                        modalActions,
                        iln
                      )
                      .catch(() => {
                        setReviewDateDetails({
                          index,
                          ...createUpdatedReviewDateDetails(true),
                        });
                      });
                  } else {
                    setReviewDateDetails({
                      index,
                      ...createUpdatedReviewDateDetails(true),
                    });
                    api
                      .completeReviewDate(
                        casenote?.detail?.id,
                        modalActions,
                        iln
                      )
                      .catch(() =>
                        setReviewDateDetails({
                          index,
                          ...createUpdatedReviewDateDetails(false),
                        })
                      );
                  }
                }}
              >
                {casenote?.detail?.completed
                  ? iln.gettext("Mark Incomplete")
                  : iln.gettext("Mark Completed")}
              </Button>
              {!casenote?.detail?.completed && (
                <Button
                  className={classes.actionButton}
                  size="small"
                  onClick={() =>
                    modalActions.add({
                      id: deleteModalID,
                      title: iln.gettext("Delete Review Date"),
                      component: (
                        <DeleteCasenote
                          removeCasenote={removeCasenote}
                          casenote={casenote}
                          successMessage={iln.gettext(
                            "Review Date Successfully Deleted"
                          )}
                          confirmMessage={confirmMessage}
                          failureMessage={iln.gettext(
                            "There was an error while trying to delete the Review Date"
                          )}
                          confirmationValue=""
                          modalID={deleteModalID}
                        />
                      ),
                    })
                  }
                >
                  {iln.gettext("Delete")}
                </Button>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      }
    />
  );
};

ReviewDate.propTypes = propTypes;

export default ReviewDate;
