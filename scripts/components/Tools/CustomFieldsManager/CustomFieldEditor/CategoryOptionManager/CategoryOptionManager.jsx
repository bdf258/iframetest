import { FlexBox, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import CategoryOption from "./CategoryOption/CategoryOption.jsx";
import IconButton from "../../../../common/IconButton/IconButton.jsx";
import RemoveOptionConfirmationModal from "./RemoveOptionConfirmationModal/RemoveOptionConfirmationModal.jsx";
import { TranslationContext } from "context/translate";
import { customFields } from "../../../../../helpers/localStorageHelper.js";
import propTypes from "./CategoryOptionManager.propTypes.js";
import useStyles from "../CustomFieldEditor.styles.js";

const CategoryOptionManager = ({
  selectedField,
  handleAddOption,
  handleUpdateField,
}) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const classes = useStyles();
  const EDITING_NEW_FIELD = selectedField.id === 0;

  const removeOption = (optionId, fieldDetails) => ({
    ...fieldDetails,
    options: fieldDetails.options.filter((option) => option.id !== optionId),
  });

  const getRemovedOption = (optionId, fieldDetails) =>
    fieldDetails.options.filter((option) => option.id === optionId);

  const getSelectedFieldFromLocalStorage = (fieldDetails) =>
    customFields.filter(
      (field) => Number(field.id) === Number(fieldDetails.id)
    );

  const optionToRemoveExistsInLocalStorage = (
    optionId,
    fieldDetails,
    removedOption,
    selectedFieldFromLocalStorage
  ) => {
    let optionsFromLocalStorage = selectedFieldFromLocalStorage[0].options.map(
      (element) => Number(element.id)
    );
    return !!optionsFromLocalStorage.includes(Number(optionId));
  };

  const existingOptionsThatNeedToBeRemapped = (
    optionId,
    fieldDetails,
    removedOption
  ) => {
    const selectedFieldFromLocalStorage =
      getSelectedFieldFromLocalStorage(fieldDetails);

    if (selectedFieldFromLocalStorage.length > 0) {
      if (
        optionToRemoveExistsInLocalStorage(
          optionId,
          fieldDetails,
          removedOption,
          selectedFieldFromLocalStorage
        )
      ) {
        return [...fieldDetails.removedOptions, removedOption];
      }
    }
    return fieldDetails.removedOptions;
  };

  const handleRemoveOption = (optionId, fieldDetails) => {
    const fieldDetailsWithOptionRemoved = removeOption(optionId, fieldDetails);

    const [removedOption] = getRemovedOption(optionId, fieldDetails);
    const removedOptions = existingOptionsThatNeedToBeRemapped(
      optionId,
      fieldDetails,
      removedOption
    );

    handleUpdateField({
      ...fieldDetailsWithOptionRemoved,
      removedOptions,
    });

    modalActions.removeById("categoryConfirmRemoveModalId");
  };

  const handleOptionNameChange = (e, optionIndex) => {
    selectedField.options[optionIndex].text = e.target.value;
    handleUpdateField({
      ...selectedField,
    });
  };

  const confirmRemoveOption = (optionId, selectedField) => {
    if (EDITING_NEW_FIELD) {
      handleRemoveOption(optionId, selectedField);
      return;
    }

    modalActions.add({
      id: "categoryConfirmRemoveModalId",
      title: iln.gettext("Delete option"),
      component: (
        <RemoveOptionConfirmationModal
          handleRemoveOption={() => handleRemoveOption(optionId, selectedField)}
          handleCancel={() =>
            modalActions.removeById("categoryConfirmRemoveModalId")
          }
        />
      ),
      blurBackground: true,
      lockWindow: true,
      allowClose: false,
    });
  };

  return (
    <FlexBox className={classes.optionsHolder}>
      <div className={classes.fakeLabel}>{iln.gettext("Items")}</div>
      <FlexBox wrap={true}>
        {selectedField.options.map((option, index) => {
          return (
            <FlexBox
              column
              className={classes.individualOptionHolder}
              key={option.id}
            >
              <FlexBox hAlign={"flex-start"}>
                <CategoryOption
                  option={option}
                  handleUpdateField={handleUpdateField}
                  selectedField={selectedField}
                  handleRemoveOption={confirmRemoveOption}
                  handleOptionNameChange={handleOptionNameChange}
                  index={index}
                />
              </FlexBox>
            </FlexBox>
          );
        })}

        <div className={classes.addOptionButtonContainer}>
          <FlexBox hAlign="center">
            <IconButton
              colour={"grey"}
              width={30}
              height={30}
              icon={"plus"}
              customClassNames={classes.addOptionButton}
              onClick={() => {
                handleAddOption(selectedField);
              }}
            />
          </FlexBox>
        </div>
      </FlexBox>
    </FlexBox>
  );
};

CategoryOptionManager.propTypes = propTypes;

export default CategoryOptionManager;
