import { noPermissionConstituentID } from "./noPermissionConstituent";

export const noPermissionCaseID = "noPermissionCase";

const noPermissionCase = {
  id: noPermissionCaseID,
  created: "0000-00-00 00:00:00",
  contactType: 0,
  constituentID: noPermissionConstituentID,
  caseType: 0,
  summary: "",
  status: 0,
  updatedAt: "0000-00-00 00:00:00",
  reviewDate: "",
  assignedTo: 0,
  createdbyID: 0,
  policy: 0,
  category: 0,
  relatesTo: "0",
  tags: [],
  restrictions: [
    {
      id: 1,
      type: "group",
      name: "All users",
      view: true,
      edit: true,
      delete: true,
    },
  ],
  behalfOf: null,
};

export default noPermissionCase;
