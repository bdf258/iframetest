const getPermissions = (groups, caseworkerID, restrictions) => {
  return restrictions.reduce(
    (permissionsObject, restriction) => {
      ["view", "edit", "delete"].forEach((type) => {
        if (
          (restriction.type == "group" &&
            groups.map((group) => group.id).includes(restriction.id)) ||
          (restriction.type == "caseworker" && restriction.id == caseworkerID)
        ) {
          // Use OR logic to match backend behavior
          // If ANY restriction allows the permission, grant it
          permissionsObject[type] = permissionsObject[type] || restriction[type];
        }
      });
      return permissionsObject;
    },
    {
      view: false,
      edit: false,
      delete: false,
    }
  );
};

export default getPermissions;
