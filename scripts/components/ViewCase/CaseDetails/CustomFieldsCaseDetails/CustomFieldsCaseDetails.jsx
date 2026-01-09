import CustomFieldsAsInputs from "../../../common/CustomFields/CustomFieldsAsInputs/CustomFieldsAsInputs.jsx";
import CustomFieldsCaseDetailsPropTypes from "./CustomFieldsCaseDetails.propTypes";
import React from "react";
import { customFields as customFieldsFromLocalStorage } from "../../../../helpers/localStorageHelper";
import propTypes from "./CustomFieldsCaseDetails.propTypes";
import { useCustomFieldsForCaseDetails } from "./hooks/useCustomFieldsForCaseDetails";
export const CustomFieldsCaseDetails = ({
  customClassNames,
  customFieldValues = [],
  caseCategory,
  onChange,
}) => {
  const [customFieldsCaseDetails] = useCustomFieldsForCaseDetails(
    customFieldsFromLocalStorage,
    customFieldValues,
    caseCategory
  );

  if (!customFieldValues || customFieldValues.length <= 0 || !caseCategory) {
    return null;
  }

  return (
    <CustomFieldsAsInputs
      customClassNames={customClassNames}
      onChange={onChange}
      customFieldsAsInputs={customFieldsCaseDetails}
    />
  );
};

CustomFieldsCaseDetails.propTypes = propTypes;

CustomFieldsCaseDetails.propTypes = CustomFieldsCaseDetailsPropTypes;
