import { FlexBox, Spinner } from "@electedtech/electedtech-ui";
import React from "react";
import propTypes from "./propTypes";
import { useStyles } from "./styles";
import { useTheme } from "react-jss";

const QuickReplyEditorOverlay = ({ display, text } = false) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <React.Fragment>
      {display && (
        <div className={classes.loadingContainer}>
          <FlexBox hAlign={"center"} vAlign={"center"} column>
            <p className={classes.text}>{text}</p>
            <Spinner scale={2} />
          </FlexBox>
        </div>
      )}
    </React.Fragment>
  );
};

QuickReplyEditorOverlay.propTypes = propTypes;

export default QuickReplyEditorOverlay;
