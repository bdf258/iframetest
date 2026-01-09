import React, { useContext } from "react";

import { DATE_FORMAT } from "../../../../../../../../consts/Date.js";
import { Placeholder } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { format } from "date-fns";
import { getCaseTypeByID } from "../../../../../../helpers/getCaseTypeById.js";
import getCaseworkerById from "../../../../../../../../helpers/getCaseworkerById.js";
import propTypes from "./CaseDetailsOneLineSummary.propTypes.js";
import { useReduxSlice } from "./CaseDetailsOneLineSummary.redux.js";
import { useStyles } from "./CaseDetailsOneLineSummary.styles.js";

const formatDate = (dateString, { prefix, suffix }) => {
  try {
    return `${prefix} 
      ${format(
        new Date(`${dateString.split(" ").join("T")}Z`),
        DATE_FORMAT.DATE
      )}${suffix}`;
  } catch (e) {
    return "";
  }
};

const CaseDetailOneLineSummary = ({ caseID }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { caseDetails, caseworkers } = useReduxSlice(caseID);

  if (!caseDetails || !caseworkers)
    return <Placeholder width={275} height={15} />;

  const { caseType: caseTypeID, created, assignedTo } = caseDetails;
  const caseType = getCaseTypeByID(caseTypeID);
  const caseworkerName =
    getCaseworkerById(assignedTo, caseworkers)?.name || iln.gettext("Unknown");
  const opened = formatDate(created, {
    suffix: ",",
    prefix: iln.gettext("opened"),
  });

  return (
    <div className={classes.caseDetailOneLineSummary}>
      {`${caseType} - ${opened} ${iln.gettext(
        "assigned to %1",
        caseworkerName
      )}`}{" "}
    </div>
  );
};

CaseDetailOneLineSummary.propTypes = propTypes;

export default CaseDetailOneLineSummary;
