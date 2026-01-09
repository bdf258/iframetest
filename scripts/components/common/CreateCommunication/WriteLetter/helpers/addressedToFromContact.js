import { concatenateNameParts } from "../../helpers/contactList/concatenateNameParts";

export const addressedToFromContact = (contact) => {
  const { isOrganisation, organisation, role } = contact;

  if (isOrganisation) return organisation;
  return `${organisation ? `${organisation}:` : ""} ${concatenateNameParts(
    contact
  )} ${role ? `- ${role}` : ""}`.trim();
};
