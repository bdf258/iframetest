import { customFields } from "../../../../../../helpers/localStorageHelper";
export const customFieldsToBeRemapped = (customBlockId, parent_object) =>
  customFields
    .filter((customField) => customField.block_id === customBlockId)
    .filter((customField) => customField.object === parent_object)
    .map((customField) => ({ ...customField, mapToCustomBlockId: null }));
