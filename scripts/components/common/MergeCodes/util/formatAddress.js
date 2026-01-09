export const getAddressForLocale = (constituent, locale) => {
  switch (locale) {
    case "en_CA":
    case "en_GB":
    case "cy_GB": {
      return {
        address1: constituent.address1,
        address2: constituent.address2,
        town: constituent.town,
        county: constituent.county,
        postcode: constituent.postcode,
      };
    }
    case "en_AU": {
      return {
        address1: constituent.address1,
        address2: constituent.address2,
        town: constituent.town ? constituent.town.toUpperCase() : "",
        county: constituent.county ? constituent.county.toUpperCase() : "",
        postcode: constituent.postcode,
      };
    }
    default: {
      return {
        address1: constituent.address1,
        address2: constituent.address2,
        town: constituent.town,
        county: constituent.county,
        postcode: constituent.postcode,
      };
    }
  }
};

export const getAddressLine = (constituent) => {
  const { title, knownAs, firstName, surname } = constituent.name;
  const { postNominal, organisation } = constituent;
  const { address1, address2, town, county, postcode } = constituent.address;

  const nameLine = getName(
    title,
    knownAs ? knownAs : firstName,
    surname,
    postNominal
  );
  const organisationLine = organisation ? `${organisation}, ` : "";
  const addressLine = getAddress(address1, address2, town, county, postcode);
  return `${nameLine}, ${organisationLine}${addressLine}`;
};

export const getAddress = (...args) =>
  args.reduce((accumulator, current) =>
    current ? `${accumulator}, ${current}` : accumulator
  );

const getName = (...args) =>
  args.reduce((accumulator, current) =>
    current ? `${accumulator} ${current}` : accumulator
  );
