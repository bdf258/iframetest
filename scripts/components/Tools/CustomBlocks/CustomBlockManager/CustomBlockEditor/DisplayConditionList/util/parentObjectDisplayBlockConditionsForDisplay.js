import parentFieldOptions from "./parentFieldOptions";

const displayConditionHasMatchingParentObjectField = (
  caseFieldOption,
  parent_object,
  parentObjectNameAsKey
) =>
  parentFieldOptions[parent_object][caseFieldOption].customBlock
    ?.storedAgainst === parentObjectNameAsKey;

/**
 * Transforms display conditions into a format that is easier to handle on the
 * front-end when displaying the condition to the user as a UI.
 * { statusID: [1, 2, 3] } => { caseFieldOption: "statusTypes", displayConditions: [1, 2, 3] }
 */

export const ParentObjectDisplayBlockConditionsForDisplay = (
  displayConditions,
  parent_object
) => {
  const displayConditionsForDisplay = Object.keys(displayConditions).map(
    (parentObjectNameAsKey) => {
      return Object.keys(parentFieldOptions[parent_object]).reduce(
        (acc, parentObjectField) => {
          if (
            displayConditionHasMatchingParentObjectField(
              parentObjectField,
              parent_object,
              parentObjectNameAsKey
            )
          ) {
            return [
              ...acc,
              {
                parentObjectField,
                parentObjectFieldOptions:
                  displayConditions[parentObjectNameAsKey],
              },
            ];
          }

          return acc;
        },
        []
      );
    }
  );
  return displayConditionsForDisplay;
};
