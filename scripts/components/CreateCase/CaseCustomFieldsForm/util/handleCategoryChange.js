import { customFieldBlocks } from "../../../../helpers/localStorageHelper";
import { customFieldsDefaultValues } from "../../../common/CustomFields/util/customFieldsDefaultValues";
import { customFieldsFilteredByCaseProperties } from "../../../common/CustomFields/util/customFieldsFilteredByCaseProperties";
import { customFieldsForCaseCreation } from "../../../common/CustomFields/util/customFieldsForCaseCreation";
import { customFieldsToRemoveFromCategoryChangeAsIds } from "../../../common/CustomFields/util/customFieldsToRemoveFromCategoryChangeAsIds";
import { removeCustomFieldsFromCurrentCustomFields } from "../../../common/CustomFields/util/removeCustomFieldsFromCurrentCustomFields";

export const handleCategoryChange = ({
  newCategory,
  caseDetails,
  setCaseDetails,
}) => {
  const currentCategory = caseDetails.category;
  const currentCustomFieldValue = caseDetails?.customFields || {};

  if (!newCategory) return;
  if (!caseDetails?.status) return;
  if (currentCategory === newCategory) return;

  const filteredCustomFieldsForCase = customFieldsFilteredByCaseProperties(
    customFieldBlocks,
    newCategory,
    caseDetails?.status
  );

  const customFieldsVisibleOnlyOnCaseCreation = customFieldsForCaseCreation(
    filteredCustomFieldsForCase
  );

  const customFieldsToAddAsValues = customFieldsDefaultValues(
    customFieldsVisibleOnlyOnCaseCreation
  );

  const customFieldsToBeRemoved = customFieldsToRemoveFromCategoryChangeAsIds(
    newCategory,
    currentCategory,
    caseDetails?.status
  );

  const customFieldsWithValuesRemoved =
    removeCustomFieldsFromCurrentCustomFields(
      currentCustomFieldValue,
      customFieldsToBeRemoved
    );

  setCaseDetails({
    ...caseDetails,
    category: newCategory,
    customFields: {
      ...customFieldsToAddAsValues,
      ...customFieldsWithValuesRemoved,
    },
  });
};
