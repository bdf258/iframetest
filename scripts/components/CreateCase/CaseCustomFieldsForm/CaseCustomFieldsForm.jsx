import {
  customFieldBlocks,
  customFields,
} from "../../../helpers/localStorageHelper";
import CustomFieldsAsInputs from "../../common/CustomFields/CustomFieldsAsInputs/CustomFieldsAsInputs.jsx";
import React from "react";
import { customBlocksAsInputsForCaseCreation } from "../../Tools/CustomBlocks/util/customBlocksAsInputsForCaseCreation";
import { customBlocksWithInputs } from "../../Tools/CustomBlocks/util/filterCustomBlocks";
import propTypes from "./CaseCustomFieldsForm.propTypes";
import { useCustomBlocksForDisplayAsInputs } from "../../common/CustomFields/hooks/useCustomBlocksForDisplayAsInputs";

const CaseCustomFieldsForm = ({
  category,
  status,
  onChange,
  value = {},
  customClassNames,
}) => {
  const [customBlocksAsInputs] = useCustomBlocksForDisplayAsInputs(
    customFields,
    customFieldBlocks,
    value,
    category,
    status
  );

  const customBlocksWithInputsForCaseCreation =
    customBlocksAsInputsForCaseCreation(customBlocksAsInputs);

  const customBlocks = customBlocksWithInputs(
    customBlocksWithInputsForCaseCreation
  );

  return (
    <React.Fragment>
      {customBlocks.map((customBlock) => {
        const { id, name, inputs } = customBlock;
        return (
          <div key={id}>
            <h3>{name}</h3>
            <CustomFieldsAsInputs
              textAreaHeight={60}
              onChange={(customBlocks) => onChange(customBlocks)}
              customFieldsAsInputs={inputs}
              customClassNames={customClassNames}
            />
          </div>
        );
      })}
    </React.Fragment>
  );
};

CaseCustomFieldsForm.propTypes = propTypes;

export default CaseCustomFieldsForm;
