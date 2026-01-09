import { customFieldBlocks, customFields } from "../helpers/localStorageHelper";

import { format } from "date-fns";
import { useCustomBlocksForDisplayAsInputs } from "../components/common/CustomFields/hooks/useCustomBlocksForDisplayAsInputs";
import { useCustomFieldsForCaseDetails } from "../components/ViewCase/CaseDetails/CustomFieldsCaseDetails/hooks/useCustomFieldsForCaseDetails";

/**
 * Returns the value of the given custom field for display.
 * Custom fields with options hold a number as their value, to display to the user the value is returned as the label of the option.
 */
const customFieldValueForDisplay = ({ inputType, value, options = [] }) => {
  if (!inputType) return "";
  if (inputType === "int" && options.length === 0) return "";
  switch (inputType) {
    case "int": {
      return options.find((option) => option.id === value)?.text || "";
    }
    case "datetime": {
      if (!value) return "";
      return format(new Date(value), "dd/MM/yyyy");
    }
    case "text":
    case "varchar": {
      return value;
    }
    default: {
      return value;
    }
  }
};

const customFieldInputAsMergeCode = (customFieldAsInput) => {
  const {
    id,
    value,
    input: { type, options, name },
  } = customFieldAsInput;

  return {
    id,
    mergeCode: `[[CustomField${id}]]`,
    description: name,
    value: customFieldValueForDisplay({
      inputType: type,
      value,
      options,
    }),
  };
};

/**
 * Returns list of custom fields and custom blocks as merge codes.
 * That is the merge code text, value, id and disabled status.
 */
const customFieldsAsMergeCodes = ({
  customFieldsCaseDetails = [],
  customBlocksAsInputs = [],
}) => {
  const customBlocksAsCustomFieldInputs = customBlocksAsInputs.reduce(
    (acc, block) => {
      const inputs = block.inputs.map((customFieldAsInput) =>
        customFieldInputAsMergeCode(customFieldAsInput)
      );
      return [...acc, ...inputs];
    },
    []
  );
  const customFieldsAsCustomFieldInputs = customFieldsCaseDetails.map(
    (customField) => customFieldInputAsMergeCode(customField)
  );

  return [
    ...customBlocksAsCustomFieldInputs,
    ...customFieldsAsCustomFieldInputs,
  ]
    .map((customFieldMergeCode) => ({
      ...customFieldMergeCode,
      disabled: !customFieldMergeCode.value,
    }))
    .sort((a, b) => a.id - b.id);
};

/**
 * Returns a list of custom field merge codes with associated value.
 * If no caseCategory or caseState is provided all custom fields are returned.
 */
const useGetCustomFieldMergeCodeList = ({
  customFieldValues = [],
  caseCategory,
  caseStatus,
}) => {
  const [customFieldsCaseDetails] = useCustomFieldsForCaseDetails(
    customFields,
    customFieldValues,
    caseCategory
  );

  const [customBlocksAsInputs] = useCustomBlocksForDisplayAsInputs(
    customFields,
    customFieldBlocks,
    customFieldValues,
    caseCategory,
    caseStatus
  );

  const customFieldMergeCodes = customFieldsAsMergeCodes({
    customFieldsCaseDetails,
    customBlocksAsInputs,
  });

  return [customFieldMergeCodes];
};

export default useGetCustomFieldMergeCodeList;
