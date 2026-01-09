import CustomFieldsAsInputs from "../../common/CustomFields/CustomFieldsAsInputs/CustomFieldsAsInputs.jsx";
import React from "react";
import { customFields } from "../../../helpers/localStorageHelper";
import { customFieldsForCaseCreation } from "../../common/CustomFields/util/customFieldsForCaseCreation";
import propTypes from "./CaseCustomFieldsForDetailsBlock.propTypes";
import { useCustomFieldsForCaseDetails } from "../../ViewCase/CaseDetails/CustomFieldsCaseDetails/hooks/useCustomFieldsForCaseDetails";
const CaseCustomFieldsForDetailsBlockInputs = ({
  category,
  value = {},
  customClassNames,
  onChange,
}) => {
  const customFieldsCaseCreation = customFieldsForCaseCreation(customFields);

  const [customFieldsAsInputs] = useCustomFieldsForCaseDetails(
    customFieldsCaseCreation,
    value,
    category
  );

  return (
    <CustomFieldsAsInputs
      textAreaHeight={60}
      onChange={onChange}
      customFieldsAsInputs={customFieldsAsInputs}
      customClassNames={customClassNames}
    />
  );
};

CaseCustomFieldsForDetailsBlockInputs.propTypes = propTypes;
export default CaseCustomFieldsForDetailsBlockInputs;
