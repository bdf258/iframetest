import {
  Button,
  FlexBox,
  FormSelect,
  FormSelectAutoComplete,
  FormTextInput,
  ModalContext,
  NotificationBox,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import AddNewCustomBlockButton from "./AddNewCustomBlockButton/AddNewCustomBlockButton.jsx";
import CategoriesInput from "./CategoriesInput/CategoriesInput.jsx";
import CategoryOptionManager from "./CategoryOptionManager/CategoryOptionManager.jsx";
import CustomFieldNameInput from "./CustomFieldNameInput/CustomFieldNameInput.jsx";
// import CustomFieldFilter from "./CustomFieldFilter/CustomFieldFilter.jsx";
import DisplayInBlockInput from "./DisplayInBlockInput/DisplayInBlockInput.jsx";
// import OrderInput from "./OrderInput/OrderInput.jsx";
import SaveFields from "../SaveField/SaveField.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./CustomFieldEditor.propTypes.js";
import useStyles from "./CustomFieldEditor.styles.js";
import useValidCustomField from "../hooks/useValidCustomField.js";

const capitalise = (s) => s && s[0].toUpperCase() + s.slice(1);

const getType = (type) => {
  let returnType = type;
  switch (type) {
    case "int":
      returnType = "Drop Down";
      break;
    case "checkbox":
      returnType = "Checkboxes";
      break;
    case "varchar":
      returnType = "Text";
      break;
    case "text":
      returnType = "Text Area";
      break;
    case "date":
      returnType = "Date";
      break;
  }
  return returnType;
};

const hasCategories = (selectedField) =>
  selectedField.categories.length !== 0 && selectedField.object === "cases";

const CustomFieldEditor = ({
  selectedField,
  handleUpdateField,
  handleSaveField,
  navigateBack,
  dispatch,
}) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const classes = useStyles();

  const EDITING_NEW_FIELD = selectedField.id === 0;
  const EDITING_EXISTING_FIELD = selectedField.id !== 0;
  const SELECTED_FIELD_IS_DROP_DOWN = selectedField.type === "int";

  const [additionalCustomBlocks, setAdditionalCustomBlocks] = useState([]);
  const [uniqueName, setUniqueName] = useState(false);

  const {
    validCustomField: {
      customFieldFormSubmitErrorText,
      canSave,
      validName,
      validCategory,
    },
    hasBeenTouched,
  } = useValidCustomField(selectedField);

  const saveField = (selectedField) => {
    if (!hasCategories(selectedField)) {
      modalActions.add({
        id: "saveFieldModalId",
        title: iln.gettext(
          "Your custom field must have at least one category (visible in) or it will be inaccessible"
        ),
        component: (
          <React.Fragment>
            <FlexBox hAlign="center">
              <Button
                onClick={() => modalActions.removeById("saveFieldModalId")}
              >
                {iln.gettext("OK")}
              </Button>
            </FlexBox>
          </React.Fragment>
        ),
        allowClose: true,
        blurBackground: true,
        customClassNames: { container: classes.modal },
      });
    } else {
      modalActions.add({
        id: "saveFieldModalId",
        title: iln.gettext("Save Field"),
        component: (
          <SaveFields
            navigateBack={navigateBack}
            selectedField={selectedField}
            handleUpdateField={handleUpdateField}
            handleSaveField={handleSaveField}
          />
        ),
        allowClose: true,
        blurBackground: true,
        customClassNames: { card: classes.modal },
      });
    }
  };
  const handleFormChange = (e) => {
    handleUpdateField({
      ...selectedField,
      [e.target.name]: e.target.value,
    });
  };

  const addOption = (fieldDetails) => {
    const maxId = [
      ...fieldDetails.options,
      ...selectedField.removedOptions,
    ].reduce((acc, option) => (option.id > acc ? option.id : acc), -1);

    const updatedOptions = fieldDetails.options.concat([
      {
        id: maxId + 1,
        filterID: 0,
        group: "",
        text: "",
      },
    ]);

    handleUpdateField({
      ...fieldDetails,
      ["options"]: updatedOptions,
    });
  };

  // Will be added in a future release
  // const handleClearCustomFieldFilter = () => {
  //   modalActions.add({
  //     id: "clearFieldModalId",
  //     title: iln.gettext("Clear Filtered by"),
  //     component: (
  //       <React.Fragment>
  //         <p>
  //           {iln.gettext(
  //             "Are you sure you want to clear the filtered by field. This will result in all the saved options being removed."
  //           )}
  //         </p>
  //         <FlexBox hAlign="space-between">
  //           <Button
  //             onClick={() => modalActions.removeById("clearFieldModalId")}
  //           >
  //             {iln.gettext("Cancel")}
  //           </Button>
  //           <Button onClick={() => clearFilteredBy()}>
  //             {iln.gettext("OK")}
  //           </Button>
  //         </FlexBox>
  //       </React.Fragment>
  //     ),
  //     allowClose: true,
  //     blurBackground: true,
  //     customClassNames: { container: classes.modal },
  //   });
  // };

  // const clearFilteredBy = () => {
  //   handleUpdateField({
  //     ...selectedField,
  //     filteredBy: 0,
  //     options: [],
  //   });
  //   modalActions.removeById("clearFieldModalId");
  // };

  const handleTypeChange = (e) => {
    if (selectedField.type === "int" || selectedField.type === "checkbox") {
      if (selectedField?.options.length > 0) {
        handleUpdateField({
          ...selectedField,
          type: e.target.value,
          options: [
            {
              id: 0,
              filterID: 0,
              group: "",
              text: "",
              blankOption: true,
            },
          ],
        });
        return;
      }
    }
    handleFormChange(e);
  };

  return (
    <React.Fragment>
      <CustomFieldNameInput
        customClassNames={{
          label: classes.label,
          container: classes.inputContainer,
        }}
        value={selectedField.name}
        onUniqueName={(unique) => setUniqueName(unique)}
        onChange={(e) => {
          hasBeenTouched(e.target.name);
          handleFormChange(e);
        }}
        error={validName.touched ? validName.errorText : null}
      />
      {EDITING_NEW_FIELD && (
        <React.Fragment>
          <FormSelectAutoComplete
            customClassNames={{
              label: classes.label,
              container: classes.inputContainer,
            }}
            label={iln.gettext("Parent Object")}
            name="object"
            value={selectedField.object}
            onChange={(e) => {
              handleFormChange(e);
              dispatch({
                type: "RESET_DISPLAY_IN_BLOCK",
              });
            }}
            keepErrorSpacing={false}
          >
            <options value="cases">Cases</options>
            {/*Will be added in a future release*/}
            {/*<options value="constituents">Constituents</options>*/}
            {/*<options value="users">Users</options>*/}
          </FormSelectAutoComplete>
          <FormSelectAutoComplete
            customClassNames={{
              label: classes.label,
              container: classes.inputContainer,
            }}
            label={iln.gettext("Type")}
            name="type"
            value={selectedField.type}
            onChange={(e) => {
              handleTypeChange(e);
            }}
            keepErrorSpacing={false}
          >
            <options value="int">{iln.gettext("Drop Down")}</options>
            {/*<options value="checkbox">Checkboxes</options>*/}
            <options value="varchar">{iln.gettext("Text")}</options>
            <options value="text">{iln.gettext("Text Area")}</options>
            <options value="datetime">{iln.gettext("Date")}</options>
          </FormSelectAutoComplete>
        </React.Fragment>
      )}
      {EDITING_EXISTING_FIELD && (
        <React.Fragment>
          <FormTextInput
            disabled
            customClassNames={{
              label: classes.label,
              container: classes.inputContainer,
              input: classes.inputDisabled,
            }}
            label={iln.gettext("Parent Object")}
            readOnly
            value={capitalise(selectedField.object)}
            name="parentObject"
            keepErrorSpacing={false}
          />
          <FormTextInput
            disabled
            customClassNames={{
              label: classes.label,
              container: classes.inputContainer,
              input: classes.inputDisabled,
            }}
            label={iln.gettext("Type")}
            readOnly
            value={getType(selectedField.type)}
            name="typeText"
            keepErrorSpacing={false}
          />
        </React.Fragment>
      )}
      <FlexBox>
        <DisplayInBlockInput
          selectedField={selectedField}
          handleFormChange={handleFormChange}
          additionalDisplayBlocks={additionalCustomBlocks}
        />
        <AddNewCustomBlockButton
          handleSaveNewCustomBlock={(additionalCustomBlock) => {
            setAdditionalCustomBlocks([additionalCustomBlock]);
          }}
        />
      </FlexBox>

      {selectedField.object === "cases" && (
        <CategoriesInput
          handleFormChange={(e) => {
            hasBeenTouched(e.target.name);
            handleFormChange(e);
          }}
          field={selectedField}
          validCategory={validCategory}
        />
      )}
      {/*<OrderInput*/}
      {/*  selectedField={selectedField}*/}
      {/*  handleFormChange={(e) => {*/}
      {/*    hasBeenTouched(e.target.name);*/}
      {/*    handleFormChange(e);*/}
      {/*  }}*/}
      {/*  validOrder={validOrder}*/}
      {/*/>*/}
      <FormSelect
        customClassNames={{
          label: classes.label,
          container: classes.inputContainer,
        }}
        name="hideonCreate"
        label={iln.gettext("Show When Creating")}
        value={selectedField.hideonCreate}
        onChange={(e) => {
          e.target.value;
          handleFormChange(e);
        }}
        keepErrorSpacing={false}
      >
        <option value={0}>{iln.gettext("No")}</option>
        <option value={1}>{iln.gettext("Yes")}</option>
      </FormSelect>
      {/*Will be added in a future release*/}
      {/*{SELECTED_FIELD_IS_DROP_DOWN && (*/}
      {/*  <React.Fragment>*/}
      {selectedField.type === "int" && (
        <FormSelect
          customClassNames={{
            label: classes.label,
            container: classes.inputContainer,
          }}
          name="filterable"
          label={iln.gettext("Display on Cases Page")}
          value={selectedField.filterable ? "yes" : "no"}
          onChange={(e) => {
            e.target.value = e.target.value === "yes";
            handleFormChange(e);
          }}
          keepErrorSpacing={false}
        >
          <option value={"no"}>No</option>
          <option value={"yes"}>Yes</option>
        </FormSelect>
      )}
      {/*    <CustomFieldFilter*/}
      {/*      handleClear={handleClearCustomFieldFilter}*/}
      {/*      fieldBeingEdited={selectedField}*/}
      {/*      handleChange={handleFormChange}*/}
      {/*    />*/}
      {/*    <FormSelect*/}
      {/*      customClassNames={{*/}
      {/*        label: classes.label,*/}
      {/*        container: classes.inputContainer,*/}
      {/*      }}*/}
      {/*      name="mappedToGroup"*/}
      {/*      label={iln.gettext("Map to Teams")}*/}
      {/*      value={selectedField.mappedToGroup}*/}
      {/*      onChange={(e) => {*/}
      {/*        handleFormChange(e);*/}
      {/*      }}*/}
      {/*      keepErrorSpacing={false}*/}
      {/*    >*/}
      {/*      <option value={false}>No</option>*/}
      {/*      <option value={true}>*/}
      {/*        {iln.gettext(*/}
      {/*          "Yes - NB Any option changes will result in team names being updated or created"*/}
      {/*        )}*/}
      {/*      </option>*/}
      {/*    </FormSelect>*/}
      {/*  </React.Fragment>*/}
      {/*)}*/}
      {(SELECTED_FIELD_IS_DROP_DOWN || selectedField.type === "checkbox") && (
        <CategoryOptionManager
          selectedField={selectedField}
          handleAddOption={addOption}
          handleUpdateField={handleUpdateField}
        />
      )}
      {customFieldFormSubmitErrorText() && (
        <NotificationBox
          customClassNames={{ container: classes.customFieldErrorNotification }}
          type={"info"}
          alertMessage={customFieldFormSubmitErrorText()}
        />
      )}
      <FlexBox hAlign="space-between">
        <Button onClick={navigateBack}>{iln.gettext("Back")}</Button>
        <Button
          isDisabled={!canSave && !uniqueName}
          onClick={() => saveField(selectedField)}
        >
          {iln.gettext("Save")}
        </Button>
      </FlexBox>
    </React.Fragment>
  );
};

CustomFieldEditor.propTypes = propTypes;
export default CustomFieldEditor;
