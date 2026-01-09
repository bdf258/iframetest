import { FlexBox, FormTextInput } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import parentFieldOptions from "../../util/parentFieldOptions";
import propTypes from "./ViewParentFieldOptions.propTypes";
import { useStyles } from "./ViewParentFieldOptions.styles";

const ViewParentFieldOptions = ({
  parent_object,
  parentObjectField,
  parentObjectFieldOptions,
}) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles();

  return (
    <FlexBox>
      <div className={classes.fakeLabel}>
        {iln.gettext(
          `${parentFieldOptions[parent_object][parentObjectField].text} options`
        )}
      </div>
      {parentObjectField && (
        <FlexBox column>
          {parentObjectFieldOptions.map((displayCondition) => (
            <React.Fragment key={displayCondition}>
              <FlexBox>
                <FormTextInput
                  customClassNames={{
                    label: classes.labelVariableLabelLength,
                    container: classes.parentObjectOptionInputContainer,
                  }}
                  keepErrorSpacing={false}
                  readOnly
                  name={"parentFieldType"}
                  value={
                    parentFieldOptions[parent_object][
                      parentObjectField
                    ].options.find(
                      (fieldOption) => fieldOption.id === displayCondition
                    )[
                      parentFieldOptions[parent_object][parentObjectField]
                        .localStorage.displayText
                    ]
                  }
                />
              </FlexBox>
            </React.Fragment>
          ))}
        </FlexBox>
      )}
    </FlexBox>
  );
};

ViewParentFieldOptions.propTypes = propTypes;

export default ViewParentFieldOptions;
