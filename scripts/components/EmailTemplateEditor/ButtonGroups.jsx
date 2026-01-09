import { Button, ButtonBar, FlexBox } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";
import { createUseStyles, useTheme } from "react-jss";

import { TranslationContext } from "context/translate";
import propTypes from "prop-types";

const useStyles = createUseStyles({
  buttonGroups: {
    margin: { bottom: 8 },
  },
});

const backToTemplates = () => {
  window.location.replace("manageemailtemplates.php");
};

const ButtonGroups = ({
  saveTemplate,
  setSendTest,
  getPDF,
  onToggleDisplayMergeCodes,
  advancedEditor,
}) => {
  const theme = useTheme();
  const iln = useContext(TranslationContext);
  const classes = useStyles({ theme });

  return (
    <FlexBox hAlign="space-between" className={classes.buttonGroups}>
      <ButtonBar>
        {!advancedEditor && (
          <Button size="small" onClick={() => onToggleDisplayMergeCodes()}>
            {iln.gettext("Show Merge Codes")}
          </Button>
        )}
        <Button size="small" onClick={() => setSendTest(() => true)}>
          {iln.gettext("Send Test")}
        </Button>
        {advancedEditor && (
          <Button size="small" onClick={() => getPDF()}>
            Download PDF
          </Button>
        )}
      </ButtonBar>
      <ButtonBar>
        <Button size="small" onClick={backToTemplates}>
          {iln.gettext("Back to Templates")}
        </Button>
        <Button size="small" onClick={saveTemplate}>
          {iln.gettext("Save and Close")}
        </Button>
      </ButtonBar>
    </FlexBox>
  );
};

ButtonGroups.propTypes = {
  advancedEditor: propTypes.bool.isRequired,
  getPDF: propTypes.func,
  onToggleDisplayMergeCodes: propTypes.func.isRequired,
  saveTemplate: propTypes.func,
  setSendTest: propTypes.func,
};

export default ButtonGroups;
