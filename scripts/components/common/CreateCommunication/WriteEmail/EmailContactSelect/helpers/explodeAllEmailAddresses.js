const explodeEntityEmails = (entityContact) => {
  if (entityContact.email.length === 0) return [entityContact];
  return entityContact.email.map((email) => ({
    ...entityContact,
    email: [email],
  }));
};

// Adds additional contact to the list of contacts for each email address within a contact
const explodeContacts = (contacts) =>
  contacts.reduce(
    (allContacts, nextContact) => [
      ...allContacts,
      ...explodeEntityEmails(nextContact),
    ],
    []
  );

// needs a separate exploder
// the shape of emails that come back from the connection
// is different to the shape of an email in the detail of a connection
const explodeOrganisationContacts = (organisationContacts) =>
  organisationContacts
    .filter((organisationContact) => organisationContact?.email)
    .map((organisationContact) => ({
      ...organisationContact,
      email: [{ value: organisationContact?.email }],
    }));

const explodeAllEmailAddresses = (contactLists) =>
  contactLists.map(
    ({ entityContact, connectionsAtOrganisation, connectionsPersonal }) => ({
      entityContact: explodeContacts(entityContact),
      connectionsAtOrganisation: explodeOrganisationContacts(
        connectionsAtOrganisation
      ),
      connectionsPersonal: explodeContacts(connectionsPersonal),
    })
  );
export default explodeAllEmailAddresses;
