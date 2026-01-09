import React, { useContext } from "react";

import { FlexBox } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import propTypes from "./propTypes";
import { useSavedDraftStatus } from "./hooks/useSavedDraftStatus";
import { useStyles } from "./SaveNotification.styles";
import { useTheme } from "react-jss";

const SaveNotification = ({ draftSavedTimeStamp }) => {
  const theme = useTheme();

  const classes = useStyles({ theme });
  const [draftSavedStatus] = useSavedDraftStatus(draftSavedTimeStamp);
  const iln = useContext(TranslationContext);

  return (
    <FlexBox hAlign={"center"}>
      <p className={classes.saveDraftNotification}>
        {draftSavedStatus && iln.gettext(draftSavedStatus)}
      </p>
    </FlexBox>
  );
};

SaveNotification.propTypes = propTypes;
export default SaveNotification;
