import parentFieldOptions from "../../../DisplayConditionList/util/parentFieldOptions";

/*
  Checks if the user can add more display conditions to a custom block.
  The amount of display conditions that a user can add are determined by either:
  The property: limitNumberOfOptionsThatCanBeSelectedTo, in which it can be set to a certain number
  The length of the options that the parent object field (CaseType, StatusType etc...) has available.
 */
const extraDisplayOptionsAvailable = (
  parent_object,
  parentObjectField,
  parentObjectFieldOptions
) => {
  if (
    Object(parentFieldOptions[parent_object][parentObjectField]).hasOwnProperty(
      "limitNumberOfOptionsThatCanBeSelectedTo"
    )
  ) {
    return (
      parentObjectFieldOptions.length !==
      parentFieldOptions[parent_object][parentObjectField]
        .limitNumberOfOptionsThatCanBeSelectedTo
    );
  } else {
    return (
      parentFieldOptions[parent_object][parentObjectField].options.length !==
      parentObjectFieldOptions.length
    );
  }
};

export default extraDisplayOptionsAvailable;
