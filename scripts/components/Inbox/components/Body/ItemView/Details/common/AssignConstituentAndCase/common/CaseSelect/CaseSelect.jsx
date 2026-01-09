import { FormSelect } from "@electedtech/electedtech-ui";
import React from "react";
import { getCaseTypeByID } from "../../../../../../../../helpers/getCaseTypeById.js";
import prefixCaseID from "../../../../../../../../../../helpers/prefixCaseID.js";
import proptypes from "./CaseSelect.propTypes.js";
import { useStyles } from "./CaseSelect.styles.js";

const CaseSelect = ({
  cases,
  value,
  onChange,
  currentCaseID = "",
  ...props
}) => {
  const classes = useStyles();

  return (
    <div className={classes.caseSelectContainer}>
      <FormSelect
        name="selectedCase"
        keepErrorSpacing={false}
        value={value}
        onChange={onChange}
        customClassNames={{ container: classes.selectContainer }}
        {...props}
      >
        {[
          <option key="undefined" value={undefined}>
            &nbsp;
          </option>,
          ...cases.reduce(
            (acc, { id, caseType, tagged }) =>
              id === currentCaseID
                ? acc
                : [
                    ...acc,
                    <option key={id} value={id}>
                      {`${prefixCaseID(id)}: ${getCaseTypeByID(caseType)} ${
                        tagged?.trim()?.length > 0
                          ? `- ${tagged.split(",").join(", ")}`
                          : ""
                      }`}
                    </option>,
                  ],
            []
          ),
        ]}
      </FormSelect>
    </div>
  );
};

CaseSelect.propTypes = proptypes;

export default CaseSelect;
