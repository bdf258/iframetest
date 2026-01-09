import {
  Button,
  ModalContext,
  SliderContext,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import ActionSummary from "../../../common/ActionSummary/ActionSummary.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./ActionSummaryButton.propTypes.js";
import useLoadAllCasenotes from "../../hooks/useLoadAllCasenotes.js";
import { useReduxSlice } from "./ActionSummaryButton.redux.js";
import { useStyles } from "./ActionSummaryButton.styles.js";
import { useTheme } from "react-jss";

const actionSummaryModalID = "action_summary";

const ActionSummaryButton = ({ showCasenotes }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);
  const { sliderActions } = useContext(SliderContext);

  const { updateCasenoteByID, casenotes, hasMore, addCasenote } =
    useReduxSlice();

  useLoadAllCasenotes({ hasMore, casenotes });

  return (
    <Button
      customClassNames={classes.actionSummaryButton}
      size={"small"}
      onClick={() => {
        modalActions.add({
          id: actionSummaryModalID,
          title: iln.gettext("Action Summary"),
          component: (
            <ActionSummary
              showCasenotes={showCasenotes}
              sliderActions={sliderActions}
              casenotes={casenotes}
              hasMore={hasMore}
              onAddCasenote={addCasenote}
              onUpdateCasenote={updateCasenoteByID}
            />
          ),
          customClassNames: {
            card: classes.modalCard,
          },
          blurBackground: true,
          lockWindow: false,
          allowClose: true,
          allowCloseOnBgClick: true,
        });
      }}
    >
      {iln.gettext("Action Summary")}
    </Button>
  );
};

ActionSummaryButton.propTypes = propTypes;

export default ActionSummaryButton;
