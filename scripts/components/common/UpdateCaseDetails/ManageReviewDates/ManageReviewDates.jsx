import {
  Button,
  FlexBox,
  ModalContext,
  Popover,
  SliderContext,
  Switcher,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";
import { format, parseISO } from "date-fns";

import ActionSummary from "../../ActionSummary/ActionSummary.jsx";
import AddReviewDate from "../../../ViewCase/common/AddReviewDate/AddReviewDate.jsx";
import { DATE_FORMAT } from "../../../../consts/Date.js";
import ReviewNoteBox from "./ReviewNoteBox/ReviewNoteBox.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import createUpdatedReviewDateDetails from "../../../ViewCase/helpers/createUpdatedReviewDateDetails.js";
import getCaseworkerById from "../../../../helpers/getCaseworkerById.js";
import propTypes from "./ManageReviewDates.propTypes.js";
import useFadeOut from "../hooks/useFadeOut.js";
import useGetReviewDateColourClass from "../../../ViewCase/hooks/useGetReviewDateColour.js";
import useStyles from "./ManageReviewDates.styles.js";

const getIncompleteReviewDates = (casenotes) =>
  casenotes.filter(
    (casenote) => casenote.type === "reviewDate" && !casenote.detail.completed
  ) || undefined;

const ManageReviewDates = ({
  casenotes,
  caseworkers,
  caseID,
  addCasenote,
  updateCasenoteByID,
}) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext) || {};
  const { sliderActions } = useContext(SliderContext) || {};
  const iln = useContext(TranslationContext);

  const { fadeClass, toggleFade } = useFadeOut();
  const [view, setView] = useState("overview");
  const [noOfReviewDates, setNoOfReviewDates] = useState(
    casenotes.filter(
      (casenote) => casenote.type === "reviewDate" && !casenote.detail.completed
    ).length
  );

  const reviewDates = getIncompleteReviewDates(casenotes);
  const earliestReview = [...reviewDates][0];

  const { getReviewDateColourClass } = useGetReviewDateColourClass();

  return (
    <section>
      <h3 className={classes.heading}>{iln.gettext("Review Dates")}</h3>
      <Switcher selected={view}>
        {{
          overview: (
            <React.Fragment>
              {earliestReview ? (
                <div className={fadeClass}>
                  <button
                    className={classes.reviewCountButton}
                    onClick={() =>
                      modalActions.add({
                        title: iln.gettext("Actions Summary"),
                        component: (
                          <ActionSummary
                            showCasenotes={{ reviewDate: true }}
                            sliderActions={sliderActions}
                            casenotes={casenotes}
                            hasMore={false}
                            onAddCasenote={addCasenote}
                            onUpdateCasenote={updateCasenoteByID}
                          />
                        ),
                      })
                    }
                  >
                    {iln.ngettext("There is", "There are", noOfReviewDates)}{" "}
                    <Popover
                      customClassNames={{
                        popover: classes.popover,
                      }}
                      content={
                        <ul className={classes.reviewDateList}>
                          {reviewDates.map(
                            ({ id, detail: { reviewDate, assignedTo } }) => (
                              <li key={id}>
                                <strong
                                  className={getReviewDateColourClass(
                                    reviewDate
                                  )}
                                >
                                  {format(
                                    parseISO(reviewDate),
                                    DATE_FORMAT.DATE
                                  )}
                                </strong>{" "}
                                -{" "}
                                {getCaseworkerById(assignedTo)
                                  ?.caseworkerName || iln.gettext("Unknown")}
                              </li>
                            )
                          )}
                        </ul>
                      }
                    >
                      <span className={classes.popoverText}>
                        {iln.ngettext(
                          "%1 review date",
                          "%1 review dates",
                          noOfReviewDates
                        )}
                      </span>
                    </Popover>{" "}
                    {iln.gettext("on the case.")}
                  </button>
                  <p className={classes.nextReivewText}>
                    {iln.gettext("The next review date is assigned to")}{" "}
                    <strong>
                      {getCaseworkerById(earliestReview.detail.assignedTo)
                        ?.caseworkerName || iln.gettext("Unknown")}
                    </strong>{" "}
                    {iln.gettext("and is due on")}{" "}
                    <strong
                      className={getReviewDateColourClass(
                        earliestReview.detail.reviewDate
                      )}
                    >
                      {format(
                        parseISO(earliestReview.detail.reviewDate),
                        DATE_FORMAT.DATE
                      )}
                    </strong>
                    {"."}
                  </p>

                  <ReviewNoteBox
                    reviewDate={earliestReview}
                    updateCasenoteByID={updateCasenoteByID}
                  />
                </div>
              ) : (
                <p>{iln.gettext("No upcoming review dates")}</p>
              )}
              <FlexBox hAlign="space-between" className={classes.actionRow}>
                <Button size="small" onClick={() => setView("createReview")}>
                  {iln.gettext("Create Review Date")}
                </Button>
                {earliestReview ? (
                  <Button
                    size="small"
                    onClick={() => {
                      api.completeReviewDate(
                        earliestReview.detail.id,
                        modalActions,
                        iln
                      );
                      toggleFade(() => {
                        setNoOfReviewDates(noOfReviewDates - 1);
                        updateCasenoteByID({
                          noteId: earliestReview.detail.id,
                          casenote: {
                            ...earliestReview,
                            detail: {
                              ...earliestReview.detail,
                              ...createUpdatedReviewDateDetails(true),
                            },
                          },
                        });
                      });
                    }}
                  >
                    {iln.gettext("Mark as Completed")}
                  </Button>
                ) : (
                  <div />
                )}
              </FlexBox>
            </React.Fragment>
          ),
          createReview: (
            <AddReviewDate
              onCreation={() => {
                setView("overview");
                setNoOfReviewDates(noOfReviewDates + 1);
              }}
              onBackClick={() => setView("overview")}
              caseworkers={caseworkers}
              caseID={caseID}
              addCasenote={addCasenote}
              updateCasenote={updateCasenoteByID}
              buttonSize="small"
            />
          ),
        }}
      </Switcher>
    </section>
  );
};

ManageReviewDates.propTypes = propTypes;

export default ManageReviewDates;
