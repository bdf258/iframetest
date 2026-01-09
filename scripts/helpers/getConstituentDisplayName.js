const getConstituentDisplayName = ({
  isOrganisation = false,
  organisation = "",
  organisationName = "",
  title = "",
  firstname = "",
  firstName = "",
  knownAs = "",
  middleName = "",
  surname = "",
} = {}) => {
  if (isOrganisation) return organisation || organisationName;

  firstName = firstName || firstname; // endpoints return firstName or firstname

  if (knownAs && firstName)
    return `${title} ${knownAs} (${firstName}) ${middleName} ${surname}`;

  if (knownAs) return `${title} ${knownAs} ${middleName} ${surname}`;

  return `${title} ${firstName} ${middleName} ${surname}`;
};

export default getConstituentDisplayName;
