import {
  getConnectionLabel,
  getConnectionPersonalLabel,
  getEntityLabel,
} from "../contactListLabels";

import { concatenateNameParts } from "../concatenateNameParts";
const getGroup = (contact) => {
  const { isOrganisation, organisation } = contact;
  if (isOrganisation) return organisation;
  return concatenateNameParts(contact);
};

const getIsOrganisationByOrganisationName = (contact, group) => {
  const { organisation } = contact;
  if (organisation) return organisation;
  return group;
};

const sortContactsAlphabeticallyByGroup = (contact) =>
  contact.sort((a, b) => a.group.localeCompare(b.group));

const sortContactsAlphabetically = (contact) =>
  contact.sort((a, b) => a.label.localeCompare(b.label));

/*
 * Formats the items for the contact select when selecting the constituent / organisation option
 * The formatting of the list is slightly different from the other options (Ministers, ThirdParty etc.)
 * The constituents personal contact details (Multiple email addresses) are inserted into a group, grouped by the constituent name
 * The constituents connections are then grouped into their own groups
 */

const formatForAutoCompleteConstituent = (
  contact,
  addEmailAddressToLabel = false
) => {
  const { entityContact, connectionsAtOrganisation, connectionsPersonal } =
    contact;

  const firstEntityContact = entityContact[0];
  const { isOrganisation } = firstEntityContact;

  const constituentGroup = getGroup(firstEntityContact);

  const constituentContacts = entityContact.map((entity) => ({
    value: entity,
    group: constituentGroup,
    label: getEntityLabel(entity, addEmailAddressToLabel),
  }));

  const contacts = [
    ...sortContactsAlphabetically(
      connectionsAtOrganisation.map((connection) => ({
        value: connection,
        group: getIsOrganisationByOrganisationName(
          connection,
          constituentGroup
        ),
        label: getConnectionLabel(
          connection,
          addEmailAddressToLabel,
          isOrganisation
        ),
      }))
    ),
    ...sortContactsAlphabetically(
      connectionsPersonal.map((contact) => ({
        value: contact,
        group: getIsOrganisationByOrganisationName(contact, constituentGroup),
        label: getConnectionPersonalLabel(contact, addEmailAddressToLabel),
      }))
    ),
  ];

  const sortedContacts = sortContactsAlphabeticallyByGroup(contacts);
  const constituentConnectionsPersonal = sortedContacts.filter(
    (contact) => contact.group === constituentGroup
  );
  const organisationContacts = sortedContacts.filter(
    (contact) => contact.group !== constituentGroup
  );

  // The constituents personal details always appear at the top of the list.
  return [
    ...constituentContacts,
    ...constituentConnectionsPersonal,
    ...organisationContacts,
  ];
};

export default formatForAutoCompleteConstituent;
