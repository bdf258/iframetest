import { FlexBox, Spinner } from "@electedtech/electedtech-ui";
import React from "react";
import propTypes from "./propTypes";
import { useStyles } from "./styles";
import { useTheme } from "react-jss";

const EmailSendInProgress = ({ loading } = false) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <React.Fragment>
      {loading && (
        <div className={classes.loadingContainer}>
          <FlexBox hAlign={"center"} vAlign={"center"} column>
            <p className={classes.text}>Sending email</p>
            <Spinner scale={2} />
          </FlexBox>
        </div>
      )}
    </React.Fragment>
  );
};

EmailSendInProgress.propTypes = propTypes;

export default EmailSendInProgress;
