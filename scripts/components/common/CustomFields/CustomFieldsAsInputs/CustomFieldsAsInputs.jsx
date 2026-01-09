import CustomFieldDate from "./CustomFieldDate/CustomFieldDate.jsx";
import CustomFieldInt from "./CustomFieldInt/CustomFieldInt.jsx";
import CustomFieldTextInput from "./CustomFieldTextInput/CustomFieldTextInput.jsx";
import CustomFieldTextarea from "./CustomFieldTextarea/CustomFieldTextarea.jsx";
import React from "react";
import classnames from "classnames";
import propTypes from "./CustomFieldsAsInputs.propTypes";

const CustomFieldsAsInputs = ({
  customClassNames,
  customFieldsAsInputs,
  onChange,
  textAreaHeight,
}) => {
  return (
    <React.Fragment>
      {customFieldsAsInputs.map((customField) => {
        const {
          value,
          input: { id, name, options, type },
        } = customField;

        return (
          <div
            key={id}
            className={classnames(
              customClassNames?.inputWrapper
                ? customClassNames.inputWrapper
                : null
            )}
          >
            {(() => {
              switch (type) {
                case "datetime":
                  return (
                    <CustomFieldDate
                      value={value}
                      onChange={onChange}
                      name={name}
                      id={id}
                      customClassNames={customClassNames}
                    />
                  );
                case "int": // Dropdown
                  return (
                    <CustomFieldInt
                      value={value}
                      onChange={onChange}
                      name={name}
                      id={id}
                      options={options}
                      customClassNames={customClassNames}
                    />
                  );
                case "text": // Textarea
                  return (
                    <CustomFieldTextarea
                      height={textAreaHeight}
                      id={id}
                      name={name}
                      onChange={onChange}
                      value={value}
                      customClassNames={customClassNames}
                    />
                  );
                case "varchar": // short text 255 characters
                  return (
                    <CustomFieldTextInput
                      id={id}
                      name={name}
                      onChange={onChange}
                      value={value}
                      customClassNames={customClassNames}
                    />
                  );
              }
            })()}
          </div>
        );
      })}
    </React.Fragment>
  );
};

CustomFieldsAsInputs.propTypes = propTypes;

export default CustomFieldsAsInputs;
