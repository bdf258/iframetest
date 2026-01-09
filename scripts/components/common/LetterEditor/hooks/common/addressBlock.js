const getName = (...args) => {
  return args.reduce((accumulator, current) =>
    current ? `${accumulator} ${current}` : accumulator
  );
};

const splitAddress = (address = "") => address?.split(",") || [];

const formatAddressBlock = ({
  nameLine,
  role,
  organisation,
  address1,
  address2,
  town,
  county,
  postcode,
}) => {
  address1 = splitAddress(address1);
  address2 = splitAddress(address2);
  return generateAddressBlock(
    nameLine,
    role,
    organisation,
    address1[0],
    address1[1],
    address2[0],
    address2[1],
    town,
    county,
    postcode
  );
};

// filter out undefinied, empty string
// trim remaining strings
// join with <br />
const generateAddressBlock = (...args) =>
  args
    .filter((x) => x !== undefined && x?.trim() !== "")
    .map((x) => x?.trim())
    .join("<br />");

const formatAddressBlockForLocale = (
  nameLine,
  role,
  organisation,
  address1,
  address2,
  town,
  county,
  postcode,
  locale
) => {
  let addressBlock;

  switch (locale) {
    case "en_CA":
    case "en_GB":
    case "cy_GB": {
      addressBlock = formatAddressBlock({
        nameLine,
        role,
        organisation,
        address1,
        address2,
        town,
        county,
        postcode,
      });
      break;
    }
    case "en_AU": {
      addressBlock = formatAddressBlock({
        nameLine,
        role,
        organisation,
        address1,
        address2,
        town: `${town} ${county} ${postcode}`,
      });
      break;
    }
    default: {
      addressBlock = formatAddressBlock({
        nameLine,
        role,
        organisation,
        address1,
        address2,
        town,
        county,
        postcode,
      });
      break;
    }
  }

  // id of address block required for CKEditor envelope printing
  return `<span id="addressblock">${addressBlock}</span>`;
};

export const getAddressBlock = (constituent, locale) => {
  const {
    title = "",
    knownAs = "",
    firstName = "",
    surname = "",
  } = constituent.name;
  const {
    postNominal = "",
    organisation = "",
    role = "",
    suffix = "",
  } = constituent;
  const {
    address1 = "",
    address2 = "",
    town = "",
    county = "",
    postcode = "",
  } = constituent.address;
  const nameLine = getName(
    title,
    knownAs ? knownAs : firstName,
    surname,
    postNominal,
    suffix
  );

  return formatAddressBlockForLocale(
    nameLine,
    role,
    organisation,
    address1,
    address2,
    town,
    county,
    postcode,
    locale
  );
};
