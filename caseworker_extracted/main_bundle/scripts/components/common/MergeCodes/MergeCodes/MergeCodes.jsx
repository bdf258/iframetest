import { Button, FlexBox, List } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";
import { createUseStyles, useTheme } from "react-jss";

import PropTypes from "prop-types";
import { TranslationContext } from "context/translate";
import { getMergeCodes } from "../util/mergeCodeListForDisplay";

const useStyles = createUseStyles({
  mergeCodeContainer: {
    marginTop: 7,
    minWidth: 510,
    width: 510,
    borderLeft: "lightgrey 1px solid",
    paddingLeft: 16,
    marginLeft: 16,
  },
  mergeCode: {
    display: "block",
    margin: { bottom: 5 },
  },
  mergeCodeButton: {
    textAlign: "left",
  },
  disabled: {
    color: "lightgrey",
    border: "lightgrey",
    cursor: "default",
  },
});

const MergeCodes = ({
  displayBarcode = false,
  mergeCodes,
  selectedMergeCode,
  displayMergeCodes = false,
  toggleMergeCodeDisplay,
  type,
}) => {
  const theme = useTheme();
  const iln = useContext(TranslationContext);
  const classes = useStyles({ theme });

  mergeCodes = mergeCodes
    ? mergeCodes
    : getMergeCodes({ type, displayBarcode, iln });

  return (
    <React.Fragment>
      {displayMergeCodes && (
        <div className={classes.mergeCodeContainer}>
          <FlexBox hAlign={"right"}>
            <Button
              size={"small"}
              customClassNames={classes.mergeButton}
              onClick={() => toggleMergeCodeDisplay(!displayMergeCodes)}
            >
              {iln.gettext("Hide Merge Codes")}
            </Button>
          </FlexBox>
          <List indent={false} bulletPoints={false}>
            <ul>
              {mergeCodes &&
                mergeCodes.map((mc, idx) => (
                  <li key={idx} className={classes.mergeCode}>
                    <Button
                      customClassNames={classes.mergeCodeButton}
                      isDisabled={mc?.disabled}
                      type="text"
                      onClick={() => selectedMergeCode(mc.mergeCode)}
                    >
                      {mc.mergeCode} - {mc.description}
                    </Button>
                    <br />
                  </li>
                ))}
            </ul>
          </List>
        </div>
      )}
    </React.Fragment>
  );
};

MergeCodes.propTypes = {
  displayBarcode: PropTypes.bool,
  displayMergeCodes: PropTypes.bool,
  mergeCodes: PropTypes.arrayOf(
    PropTypes.shape({
      mergeCode: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ),
  selectedMergeCode: PropTypes.func.isRequired,
  toggleMergeCodeDisplay: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["email", "letter"]),
};

export default MergeCodes;
