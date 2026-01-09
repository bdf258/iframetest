import { Button, FlexBox, Spinner } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import TranslationContext from "../../../../../../../../../../../../context/translation/TranslationContext";
import propTypes from "./YesNoButtons.propTypes";
import useStyles from "./YesNoButtons.styles";

const YesNoButtons = ({ onNoClick, onYesClick }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const [yesLoading, setYesLoading] = useState(false);
  const [noLoading, setNoLoading] = useState(false);

  return (
    <FlexBox hAlign="flex-end" className={classes.buttons}>
      {onNoClick && (
        <Button
          size="small"
          isDisabled={yesLoading || noLoading}
          onClick={async () => {
            setNoLoading(true);
            await onNoClick();
            setNoLoading(false);
          }}
        >
          {noLoading ? <Spinner /> : iln.gettext("No")}
        </Button>
      )}
      <Button
        size="small"
        isDisabled={yesLoading || noLoading}
        onClick={async () => {
          setYesLoading(true);
          await onYesClick();
          setYesLoading(false);
        }}
      >
        {yesLoading ? <Spinner /> : iln.gettext("Yes")}
      </Button>
    </FlexBox>
  );
};

YesNoButtons.propTypes = propTypes;

export default YesNoButtons;
