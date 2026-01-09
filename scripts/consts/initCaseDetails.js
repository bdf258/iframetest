import {
  caseTypes,
  categoryTypes,
  contactTypes,
  statusTypes,
  userIdentity,
} from "../helpers/localStorageHelper";

import { initialCustomFieldValues } from "../components/Tools/CaseTemplateManager/util/initialCustomFieldValues";

const customFields = initialCustomFieldValues(
  {},
  categoryTypes[0].id,
  statusTypes[0].id
);

export default {
  contactType: contactTypes[0].id,
  assignedTo: userIdentity.id,
  caseType: caseTypes[0].id,
  category: categoryTypes[0].id,
  status: statusTypes[0].id,
  tagged: { value: "", chips: [] },
  relatesTo: 0,
  summary: "",
  behalfOf: "",
  customFields,
};
