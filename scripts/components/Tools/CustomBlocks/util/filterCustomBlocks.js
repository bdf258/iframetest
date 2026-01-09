import {
  customFields,
  statusTypes,
} from "../../../../helpers/localStorageHelper";
import { customFieldsDefaultValues } from "../../../common/CustomFields/util/customFieldsDefaultValues";

export const customBlocksForCases = (customBlocks) => {
  if (!customBlocks) return [];
  if (customBlocks.length <= 0) return [];
  return customBlocks.filter(
    (customBlock) => customBlock.parent_object === "cases"
  );
};

export const customBlocksExcludeDetailsBlock = (customBlocks) => {
  if (!customBlocks) return [];
  if (customBlocks.length <= 0) return [];
  return customBlocks.filter(
    (customBlock) => customBlock?.name?.toLowerCase() !== "details"
  );
};

export const customBlocksWithOptions = (customBlocks) => {
  return customBlocks.filter((customBlock) => customBlock.options.length > 0);
};

export const customBlocksForCategory = (customBlocks, currentCategory) => {
  return customBlocks.filter((customBlock) => {
    if (!Object(customBlock).hasOwnProperty("display_conditions")) return false;
    if (!Object(customBlock.display_conditions).hasOwnProperty("categoryID"))
      return false;

    return (
      parseInt(customBlock.display_conditions.categoryID) === currentCategory
    );
  });
};

export const customBlocksFilteredByDisplayConditions = ({
  customBlocks,
  caseCategory,
  caseStatus,
  customFieldValues = {},
} = {}) => {
  if (!customBlocks) return [];
  if (customBlocks.length <= 0) return [];
  if (!caseCategory || !caseStatus) return customBlocks;

  return customBlocks.filter((customBlock) => {
    const defaultDisplayConditions = ["categoryID", "statusID"];
    const { display_conditions } = customBlock;
    const hasDisplayConditions = Object.keys(display_conditions).length > 0;
    const displayConditionKeys = Object.keys(display_conditions);
    const customFieldDisplayConditionsKeys = displayConditionKeys.filter(
      (displayCondition) => !defaultDisplayConditions.includes(displayCondition)
    );
    const hasCustomFieldDisplayConditions =
      customFieldDisplayConditionsKeys.length > 0;

    /**
     * Custom blocks with no display conditions are always visible.
     */
    if (!hasDisplayConditions) return customBlock;

    /**
     * If a custom block has display conditions the below works out if it should be included
     * CategoryID: The case category that the custom block should be visible in.
     * Case status: The status of the case that the custom block should be visible in.
     * Custom field values: Displays custom block when a custom field on a case has the associated custom field value set.
     */

    if (hasDisplayConditions) {
      if (displayConditionKeys.includes("categoryID")) {
        return display_conditions.categoryID.includes(caseCategory);
      }

      if (displayConditionKeys.includes("statusID")) {
        /**
         * Case status can either be an int or a specific string, like "closed".
         * Case status "closed": This relates to all statuses that are of type closed.
         */
        if (display_conditions.statusID === "closed") {
          // checks if the current case status has closed flag.
          const caseStatusType = statusTypes.find(
            (statusType) => statusType.id === caseStatus
          );
          return caseStatusType.closed;
        } else {
          // handles all other status types of type int
          return parseInt(display_conditions.statusID) === caseStatus;
        }
      }

      /**
       * Handles display of custom blocks with display conditions related to a custom field.
       */
      if (hasCustomFieldDisplayConditions) {
        return customFieldDisplayConditionsKeys.reduce(
          (acc, customFieldDisplayCondition) => {
            const associateDisplayConditionValue =
              customFieldValues[customFieldDisplayCondition];

            const customBlockDisplayConditionValues =
              customBlock.display_conditions[customFieldDisplayCondition];

            return customBlockDisplayConditionValues.includes(
              associateDisplayConditionValue
            );
          },
          true
        );
      }
    }

    return false;
  });
};

/**
 * Returns a list of custom fields derived from the customBlocks passed in
 * sets the values of all the fields to their respective default value
 */
export const customBlocksAsFieldsToBeRemoved = (customBlocksToBeRemoved) => {
  return customBlocksToBeRemoved.reduce((acc, customBlock) => {
    const customFieldsForCustomBlock = customFields.filter((customField) => {
      return customField.block_id === customBlock.id;
    });

    return {
      ...acc,
      ...customFieldsDefaultValues(customFieldsForCustomBlock),
    };
  }, {});
};

/**
 * Removes custom fields that have an inherited display condition from their parent custom block.
 * This data structure to be passed in is derived from the function below: customBlockAsCustomFieldsWithCustomBlockDisplayCondition()
 */
export const customFieldsToBeRemovedWithDisplayConditions = (
  customFields,
  caseCategory,
  caseStatus
) => {
  if (!customFields) return [];
  if (customFields.length <= 0) return [];

  return customFields.filter((customFields) => {
    const { display_conditions } = customFields;
    const hasDisplayConditions = Object.keys(display_conditions).length > 0;
    const displayConditionKeys = Object.keys(display_conditions);

    if (hasDisplayConditions) {
      if (displayConditionKeys.includes("categoryID")) {
        return parseInt(display_conditions.categoryID) !== caseCategory;
      }
      if (displayConditionKeys.includes("statusID")) {
        if (display_conditions.statusID === "closed") {
          // checks if the current case status has closed flag.
          const caseStatusType = statusTypes.find(
            (statusType) => statusType.id === caseStatus
          );

          return caseStatusType.closed;
        }
        return parseInt(display_conditions.statusID) === caseStatus;
      }
    }

    return true;
  });
};

/**
 * Returns all custom fields attached to a custom block.
 * Also returns the parent custom block's display condition on each custom field.
 */
export const customBlockAsCustomFieldsWithCustomBlockDisplayCondition = (
  customBlocks
) => {
  return customBlocks.reduce((acc, customBlock) => {
    const customFieldsForCustomBlock = customFields
      .map((customField) => ({
        ...customField,
        display_conditions: customBlock.display_conditions,
      }))
      .filter((customField) => {
        return customField.block_id === customBlock.id;
      });

    return [...acc, ...customFieldsForCustomBlock];
  }, []);
};

export const customBlockAsCustomFields = (customBlocks) => {
  return customBlocks.reduce((acc, customBlock) => {
    const customFieldsForCustomBlock = customFields.filter((customField) => {
      return customField.block_id === customBlock.id;
    });

    return [...acc, ...customFieldsForCustomBlock];
  }, []);
};

export const customBlocksWithInputs = (customBlocks) =>
  customBlocks.filter((customBlock) => customBlock.inputs.length > 0);
