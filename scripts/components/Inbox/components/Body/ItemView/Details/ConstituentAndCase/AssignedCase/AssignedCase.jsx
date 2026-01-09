import { Link } from "@electedtech/electedtech-ui";
import React from "react";
import prefixCaseID from "../../../../../../../../helpers/prefixCaseID.js";
import propTypes from "./propTypes";
import { useStyles } from "./styles.js";
import { useTheme } from "react-jss";

const AssignedCase = ({ caseID }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.assignCase}>
      <Link underline href={`/viewcase.php?caseID=${caseID}`}>
        {prefixCaseID(caseID)}
      </Link>
    </div>
  );
};

AssignedCase.propTypes = propTypes;

export default AssignedCase;
