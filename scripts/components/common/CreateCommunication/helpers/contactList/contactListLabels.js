import { concatenateNameParts } from "./concatenateNameParts";

const getEntityLabel = (entity, addEmailAddressToLabel) => {
  const { email, isOrganisation } = entity;
  if (isOrganisation)
    return `No one, organisation only ${
      addEmailAddressToLabel && email.length !== 0 ? "- " + email[0].value : ""
    }`;

  return `${concatenateNameParts(entity)} - (Constituent) ${
    addEmailAddressToLabel && email.length !== 0 ? email[0].value : ""
  }`;
};

const getConnectionLabel = (
  connection,
  addEmailAddressToLabel,
  isOrganisation
) => {
  const { role, email } = connection;

  if (isOrganisation) {
    return `${concatenateNameParts(connection)} ${role ? `- ${role}` : ""} ${
      addEmailAddressToLabel && email.length !== 0 ? email[0].value : ""
    }`;
  }

  return `${concatenateNameParts(
    connection
  )} - ${role} (Constituent connection) ${
    addEmailAddressToLabel && email.length !== 0 ? email[0].value : ""
  }`;
};

const getConnectionPersonalLabel = (connection, addEmailAddressToLabel) => {
  const { email, isOrganisation, organisation } = connection;

  if (isOrganisation) {
    return `${organisation} - (Organisation) ${
      addEmailAddressToLabel && email.length !== 0 ? email[0].value : ""
    }`;
  }

  return `${concatenateNameParts(connection)} - (Personal) ${
    addEmailAddressToLabel && email.length !== 0 ? email[0].value : ""
  }`;
};

export { getEntityLabel, getConnectionLabel, getConnectionPersonalLabel };
