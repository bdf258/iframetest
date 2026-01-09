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

const sortContactsAlphabeticallyByGroup = (contact) =>
  contact.sort((a, b) => {
    const groupComparison = a.group.localeCompare(b.group);

    if (groupComparison !== 0) return groupComparison;

    if (
      a.group === b.group &&
      a.value.firstname === b.value.firstname &&
      a.value.surname === b.value.surname
    ) {
      return b.order - a.order;
    }

    return 0;
  });

const sortContactsAlphabetically = (contact) =>
  contact.sort((a, b) => a.label.localeCompare(b.label));

/*
 * Formats contacts for display in AutoComplete
 */
const formatForAutoComplete = (
  entityContacts,
  addEmailAddressToLabel = false,
  removeOrgOnlyOption
) => {
  const contacts = entityContacts.reduce(
    (
      all,
      { entityContact, connectionsAtOrganisation, connectionsPersonal }
    ) => {
      /*
       * It is possible for an organisation / constituent to have more than one email address,
       * Therefore, more than one contact is generated per email address.
       * To group the contacts the first contact for the organisation / constituent is used as they would be the same.
       */
      const firstEntityContact = entityContact[0];

      const group = getGroup(firstEntityContact);
      const { isOrganisation } = firstEntityContact;

      return [
        ...all,
        ...(removeOrgOnlyOption
          ? []
          : entityContact.map((entity) => ({
              value: entity,
              group,
              label: getEntityLabel(entity, addEmailAddressToLabel),
              order: 1,
            }))),
        /*
         * Sorts connections (at organisation and personal) alphabetically.
         * The organisation as a contact always appears at the top of the list.
         * Hence, its omission from the below sorting logic and insertion above.
         */
        ...sortContactsAlphabetically([
          ...connectionsAtOrganisation.map((connection) => ({
            value: connection,
            group,
            label: getConnectionLabel(
              connection,
              addEmailAddressToLabel,
              isOrganisation
            ),
            order: 3,
          })),
          ...connectionsPersonal.map((contact) => ({
            value: contact,
            group,
            label: getConnectionPersonalLabel(contact, addEmailAddressToLabel),
            order: 2,
          })),
        ]),
      ];
    },
    []
  );

  /*
   * Sorts the contact groups alphabetically.
   */
  return sortContactsAlphabeticallyByGroup(contacts);
};

export default formatForAutoComplete;
