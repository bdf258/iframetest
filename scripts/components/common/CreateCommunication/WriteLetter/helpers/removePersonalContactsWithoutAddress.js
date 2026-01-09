/*
 * Filters out personal contacts that have useOrgAddress set to true.
 * Filters out personal contact that don't have an address
 * To have an address the contact must have at least one of the following set: address1, address2, town, county, postcode
 */
export const removePersonalContactsWithoutAddress = (contactsByGroup) => {
  return contactsByGroup.map((contactGroup) => {
    const { entityContact, connectionsAtOrganisation, connectionsPersonal } =
      contactGroup;

    return {
      entityContact,
      connectionsAtOrganisation,
      connectionsPersonal: connectionsPersonal.filter((personalConnection) => {
        const { useOrgAddress } = personalConnection;
        if (useOrgAddress) return false;
        const { address1, address2, town, county, postcode } =
          personalConnection;
        return address1 || address2 || town || county || postcode;
      }),
    };
  });
};
