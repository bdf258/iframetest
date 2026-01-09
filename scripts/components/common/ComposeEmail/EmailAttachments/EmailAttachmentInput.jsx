import { Button, FormChipInput, Popover } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import PropTypes from "prop-types";
import { TranslationContext } from "context/translate";
import { useStyles } from "./styles";

function EmailAttachmentInput({
  onChipClick,
  label,
  attachments,
  onChipRemoved,
  popoverContent,
  customClassNames,
}) {
  const iln = useContext(TranslationContext);
  const classes = useStyles();

  return (
    <React.Fragment>
      <FormChipInput
        onChipClick={onChipClick}
        customClassNames={{
          ...customClassNames,
          autoComplete: { input: classes.hideInput },
        }}
        label={label ? iln.gettext(label) : iln.gettext("Attachments")}
        name={"attachments"}
        value={{ value: "", chips: attachments }}
        onChange={() => {}}
        keepErrorSpacing={false}
        chipSource={[]}
        chipRemoved={onChipRemoved}
        innerComponent={
          <span className={classes.buttonBar}>
            <Popover content={popoverContent}>
              <Button
                customClassNames={classes.inputButton}
                type={"text"}
                onClick={() => {}}
              >
                {`+ ${iln.gettext("Add Attachment")}`}
              </Button>
            </Popover>
          </span>
        }
      />
    </React.Fragment>
  );
}

EmailAttachmentInput.propTypes = {
  attachments: PropTypes.array,
  customClassNames: PropTypes.object,
  label: PropTypes.string,
  onChipClick: PropTypes.func.isRequired,
  onChipRemoved: PropTypes.func.isRequired,
  popoverContent: PropTypes.node,
};

export default EmailAttachmentInput;
