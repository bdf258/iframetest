import { customFieldBlocks } from "../../../../helpers/localStorageHelper";
import { customFieldToBeRemovedByCategoryChange } from "../../../common/CustomFields/util/customFieldToBeRemovedByCategoryChange.js";
import { customFieldsDefaultValues } from "../../../common/CustomFields/util/customFieldsDefaultValues";
import { customFieldsFilteredByCaseProperties } from "../../../common/CustomFields/util/customFieldsFilteredByCaseProperties";
import { removeCustomFieldsFromCurrentCustomFields } from "../../../common/CustomFields/util/removeCustomFieldsFromCurrentCustomFields";
import { selectCaseDetails } from "../../slice/viewCaseSlice";
import { useOpenCaseCategoryChangeWarningModal } from "./useOpenCaseCategoryChangeWarningModal";
import { useSelector } from "react-redux";
import useUpdateMultipleCaseDetails from "./useUpdateMultipleCaseDetails";

/*
 * Handles the opening of the change case category model
 * Opens when the cases category is changed and there are custom fields that would be removed when making the change
 * Wait for confirmation from the confirmation modal before initializing the deletion in confirmCategoryChange()
 * When confirmed the fields that are to be removed have their values reset
 */
const useHandleCaseCategoryChange = (
  currentCategory,
  currentCustomFieldValue
) => {
  const [updateCaseDetails] = useUpdateMultipleCaseDetails();
  const caseDetails = useSelector(selectCaseDetails);

  const confirmCategoryChange = (newCategory, customFieldsToBeRemoved) => {
    const filteredCustomFieldsForCase = customFieldsFilteredByCaseProperties(
      customFieldBlocks,
      newCategory,
      caseDetails?.status
    );

    const customFieldsToAddAsValues = customFieldsDefaultValues(
      filteredCustomFieldsForCase
    );

    const customFieldsToRemoveAsIds = customFieldsToBeRemoved.map(
      ({ id }) => id
    );

    const customFieldsWithValuesRemoved =
      removeCustomFieldsFromCurrentCustomFields(
        currentCustomFieldValue,
        customFieldsToRemoveAsIds
      );

    updateCaseDetails({
      customFields: {
        ...customFieldsToAddAsValues,
        ...customFieldsWithValuesRemoved,
      },
      category: newCategory,
    });
  };

  const [openCategoryChangeWarningModal] =
    useOpenCaseCategoryChangeWarningModal(confirmCategoryChange);

  const handleCategoryChange = (newCategory, inputName) => {
    if (!newCategory) return;
    if (currentCategory === newCategory) return;

    const customFieldsToBeRemoved = customFieldToBeRemovedByCategoryChange(
      newCategory,
      currentCategory,
      caseDetails?.status
    );

    if (customFieldsToBeRemoved.length <= 0) {
      updateCaseDetails({ [inputName]: newCategory });
      return;
    }

    openCategoryChangeWarningModal(newCategory, customFieldsToBeRemoved);
  };

  return [handleCategoryChange];
};

export default useHandleCaseCategoryChange;
