import { FlexBox, FormTextInput } from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import DisplayIfInput from "../DisplayIfInput/DisplayIfInput.jsx";
import IconButton from "../../../../../common/IconButton/IconButton.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./CategoryOption.propTypes.js";
import useStyles from "../../CustomFieldEditor.styles.js";

const CategoryOption = ({
  option,
  selectedField,
  handleRemoveOption,
  handleOptionNameChange,
  handleUpdateField,
  index,
}) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles();
  const maxCharacterLength = 20;

  const [debouncedValue, setDebouncedValue] = useState({
    target: {
      value: option.text || "",
    },
  });

  useEffect(() => {
    if (option.text === debouncedValue.target.value) return;
    const timer = setTimeout(
      () => handleOptionNameChange(debouncedValue, index),
      300
    );

    return () => {
      clearTimeout(timer);
    };
  }, [debouncedValue]);

  return (
    <FlexBox column className={classes.individualOptionHolder}>
      <FlexBox hAlign={"flex-start"}>
        <FormTextInput
          customClassNames={{
            label: classes.label,
            container: `${classes.optionIDContainer} ${classes.optionManagerContainer}`,
            input: classes.optionIDInput,
          }}
          value={option.id.toString()}
          keepErrorSpacing={false}
          readOnly
          name={`optionID ${option.id}`}
        />
        <FlexBox column>
          <FormTextInput
            customClassNames={{
              label: classes.label,
              container: classes.optionManagerContainer,
              input: classes.optionManagerInput,
            }}
            value={debouncedValue.target.value}
            error={
              debouncedValue.target.value.length > maxCharacterLength
                ? iln.gettext(
                    `Item name can't be more than ${maxCharacterLength} characters long`
                  )
                : ""
            }
            keepErrorSpacing={false}
            name={"optionName"}
            onChange={(e) => {
              setDebouncedValue(e);
            }}
          />
        </FlexBox>
        {selectedField.filteredBy !== 0 && (
          <DisplayIfInput
            option={option}
            optionIndex={index}
            selectedField={selectedField}
            handleUpdateField={handleUpdateField}
          />
        )}
        <IconButton
          height={32}
          width={32}
          icon={"bin"}
          colour={"grey"}
          onClick={() => handleRemoveOption(option.id, selectedField)}
        />
      </FlexBox>
    </FlexBox>
  );
};

CategoryOption.propTypes = propTypes;
export default CategoryOption;
