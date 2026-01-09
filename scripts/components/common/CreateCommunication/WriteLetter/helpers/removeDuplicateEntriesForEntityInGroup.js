/*
 * Removes duplicates for the entity contact for organisations
 * If multiple results for the same organisation are returned this results in duplicates for the same organisation
 * Entities always have an order of 1
 * Entities are the top level keys returned from a search result
 */
export const removeDuplicateEntriesForEntityInGroup = (contactList) => {
  let groups = {};
  return contactList.filter((contact) => {
    const {
      group,
      order,
      value: { isOrganisation },
    } = contact;
    const groupKeys = Object.keys(groups);
    // is an entity and an organisation
    if (order === 1 && isOrganisation) {
      if (groupKeys.includes(group)) {
        return false;
      } else {
        groups = { ...groups, [group]: group };
        return true;
      }
    } else {
      return true;
    }
  });
};
