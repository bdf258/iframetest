export const duplicateEmailAddressesAcrossToCcBcc = (to, cc, bcc, key) => {
  const emailAddresses = [...to, ...cc, ...bcc].map(({ label, ...rest }) => ({
    ...rest,
    label: label?.toLowerCase() || "",
  }));

  return emailAddresses.reduce((acc, currentEmail, index, emailAddresses) => {
    if (
      emailAddresses.slice(index + 1).some((emailAddress) => {
        return emailAddress[key] === currentEmail[key];
      }) &&
      !acc.some((emailAddress) => emailAddress[key] === currentEmail[key])
    ) {
      acc.push(currentEmail[key]);
    }
    return acc;
  }, []);
};
