import {
  FlexBox,
  FormHandler,
  FormSelectAutoComplete,
} from "@electedtech/electedtech-ui";

import PermissionChipInput from "../common/PermissionsChipInput/";
import React from "react";
import TagInput from "../common/CaseDetailInputs/TagInput.jsx";
import { allowPermissionSystem } from "../../consts/disabledFeatures.js";
import { caseTypes } from "../../helpers/localStorageHelper";
import { createUseStyles } from "react-jss";
import propTypes from "prop-types";

const useStyles = createUseStyles({
  inputContainer: {
    margin: { top: 0, right: 0, bottom: 8, left: 0 },
  },
  h3: { margin: { top: 0, bottom: 5 } },
});

function CaseDetailsForm({
  tags,
  setTags,
  setCaseType,
  caseType,
  restrictions,
  setRestrictions,
  triggerAutosaveOnUpdate,
}) {
  const getCasetypeArray = (caseTypes) => {
    if (caseType != 0) {
      let selectedType = caseTypes.find((t) => t.id == caseType);
      let remaining = caseTypes.filter((t) => t.id != caseType);
      return [selectedType, { id: 0, casetype: "" }, ...remaining];
    } else {
      return [{ id: 0, casetype: "" }, ...caseTypes];
    }
  };

  const classes = useStyles();

  return (
    <FlexBox column>
      <h3 className={classes.h3}>Quick Reply Details</h3>
      <FormHandler onSubmit={() => {}}>
        {caseTypes.length > 0 && (
          <FormSelectAutoComplete
            label="Case Type"
            type="text"
            name="caseType"
            value={caseType} // this does not pick up the value, using the getCasetypeArry function to re order array accordingly instead
            keepErrorSpacing={false}
            placeholder="Select Case Type"
            onChange={(e) => {
              triggerAutosaveOnUpdate();
              setCaseType(e.target.value);
            }}
            customClassNames={{
              container: classes.inputContainer,
            }}
          >
            {getCasetypeArray(caseTypes).map((ct) => (
              <option value={ct.id} key={ct.id + ct.casetype}>
                {ct.casetype}
              </option>
            ))}
          </FormSelectAutoComplete>
        )}
        <TagInput
          customClassNames={{
            container: classes.inputContainer,
          }}
          keepErrorSpacing={false}
          label="Tags"
          name="tags"
          value={tags}
          placeholder="Start typing to filter existing tags or enter a new one and press enter"
          onChange={(t) => {
            triggerAutosaveOnUpdate();
            setTags([...t.target.value.chips]);
          }}
        />
        {allowPermissionSystem && [
          <h3 key="heading">Permissions</h3>,
          <PermissionChipInput
            key="input"
            name="restrictions"
            keepErrorSpacing={false}
            value={restrictions}
            onChange={({ target: { value } }) => setRestrictions(value)}
            customClassNames={{
              container: classes.inputContainer,
            }}
          />,
        ]}
      </FormHandler>
    </FlexBox>
  );
}
CaseDetailsForm.propTypes = {
  caseType: propTypes.number,
  restrictions: propTypes.array,
  setCaseType: propTypes.func,
  setRestrictions: propTypes.func,
  setTags: propTypes.func,
  tags: propTypes.array,
  triggerAutosaveOnUpdate: propTypes.func,
};
export default CaseDetailsForm;
