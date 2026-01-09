import {
  Button,
  Placeholder,
  SliderContext,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import AddReviewDate from "../../../common/AddReviewDate/AddReviewDate.jsx";
import AttachFile from "../AttachFile/AttachFile.jsx";
import { TranslationContext } from "context/translate";
import ViewCaseWriteLetterWrapper from "../WriteLetter/ViewCaseWriteLetterWrapper.jsx";
import WriteEmail from "../WriteEmail/ViewCaseWriteEmailWrapper.jsx";
import WriteNote from "../WriteNote/WriteNote.jsx";
import WriteSms from "../WriteSms/WriteSms.jsx";
import { canSendSms } from "../util/canSendSms";
import { useReduxSlice } from "./CreatorsContainer.redux.js";
import { useStyles } from "./CreatorsContainer.styles.js";

const CreatorsContainer = () => {
  const classes = useStyles();
  const { sliderActions } = useContext(SliderContext);
  const iln = useContext(TranslationContext);

  const {
    caseID,
    addCasenote,
    constituent,
    removeSelectedNote,
    updateCasenoteByNoteId,
    autoUpdateCasenoteByNoteId,
  } = useReduxSlice();

  if (!constituent) {
    return (
      <Placeholder width={310} height={30} className={classes.placeholder} />
    );
  }

  return (
    <React.Fragment>
      <Button
        size="small"
        onClick={() => {
          sliderActions.open({
            title: iln.gettext("Write an SMS"),
            component: <WriteSms />,
            onClose: () => removeSelectedNote(),
          });
        }}
        isDisabled={!canSendSms()}
      >
        {iln.gettext("Write SMS")}
      </Button>
      <Button
        size="small"
        onClick={() => {
          sliderActions.open({
            title: iln.gettext("Write an Email"),
            component: <WriteEmail />,
            onClose: () => removeSelectedNote(),
          });
        }}
      >
        {iln.gettext("Write an email")}
      </Button>
      <Button
        size="small"
        onClick={() => {
          sliderActions.open({
            title: iln.gettext("Write a Letter"),
            component: <ViewCaseWriteLetterWrapper />,
            onClose: () => removeSelectedNote(),
          });
        }}
      >
        {iln.gettext("Write a letter")}
      </Button>
      <Button
        size="small"
        onClick={() =>
          sliderActions.open({
            title: iln.gettext("Add a Note"),
            component: (
              <WriteNote
                key="new-note"
                caseID={caseID}
                addCasenoteToState={addCasenote}
                updateCasenote={(casenote) =>
                  updateCasenoteByNoteId({
                    noteId: casenote.id,
                    casenote: casenote,
                  })
                }
                autoUpdateCasenote={(casenote) =>
                  autoUpdateCasenoteByNoteId({
                    noteId: casenote.id,
                    casenote: casenote,
                  })
                }

                //get case id , then idex and then update
              />
            ),
            onClose: () => removeSelectedNote(),
          })
        }
      >
        {iln.gettext("Add a note")}
      </Button>
      <Button
        size="small"
        onClick={() =>
          sliderActions.open({
            title: iln.gettext("Attach a File"),
            component: <AttachFile />,
            onClose: () => removeSelectedNote(),
          })
        }
      >
        {iln.gettext("Attach a file")}
      </Button>
      <Button
        size="small"
        onClick={() =>
          sliderActions.open({
            title: iln.gettext("Add a Review Date"),
            component: (
              <AddReviewDate
                key="create"
                caseID={caseID}
                addCasenote={addCasenote}
              />
            ),
            onClose: () => removeSelectedNote(),
          })
        }
      >
        {iln.gettext("Add a review date")}
      </Button>
    </React.Fragment>
  );
};

export default CreatorsContainer;
