import { FlexBox, Indent, Placeholder } from "@electedtech/electedtech-ui";
import React, { useContext, useRef } from "react";

import ActionSummaryButton from "./ActionSummaryButton/ActionSummaryButton.jsx";
import CasenoteCreators from "./CasenoteCreators/CasenoteCreators.jsx";
import Casenotes from "./Casenotes/Casenotes.jsx";
import CasenotesPlaceholder from "./Placeholder.jsx";
import { TranslationContext } from "context/translate";
import { useReduxSlice } from "./ActionsAndNotes.redux";
import useStyles from "./styles";
import { useTheme } from "react-jss";

const ActionsAndNotes = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const iln = useContext(TranslationContext);

  const { caseworkers, caseDetails, casenotes, constituent, casePermissions } =
    useReduxSlice();

  const contentContainerRef = useRef();

  if (!casenotes || !caseworkers || !caseDetails)
    return <CasenotesPlaceholder />;

  return (
    <React.Fragment>
      <div
        ref={contentContainerRef}
        className={classes.cardHeaderActionSummary}
      >
        <FlexBox hAlign="space-between" vAlign="center">
          <div>
            <h2>{iln.gettext("Actions and Notes")}</h2>
            <Indent>
              <ActionSummaryButton />
            </Indent>
          </div>
          {!constituent ? (
            <Placeholder
              width={500}
              height={27}
              className={classes.placeholder}
            />
          ) : casePermissions?.edit ? (
            <CasenoteCreators />
          ) : (
            <></>
          )}
        </FlexBox>
      </div>
      <Indent>
        <Indent>
          <Casenotes />
        </Indent>
      </Indent>
    </React.Fragment>
  );
};

export default ActionsAndNotes;
