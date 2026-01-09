import PropTypes from "prop-types";

const emailPropType = PropTypes.exact({
  value: PropTypes.string.isRequired,
  primary: PropTypes.bool.isRequired,
});

const constituentPropTypeBase = {
  address1: PropTypes.string,
  address2: PropTypes.string,
  county: PropTypes.string,
  deceased: PropTypes.bool,
  deregisteredDate: PropTypes.string,
  dob: PropTypes.string,
  electorRefNo: PropTypes.string,
  email: PropTypes.arrayOf(emailPropType),
  facebook: PropTypes.string,
  federalConstituency: PropTypes.string,
  firstname: PropTypes.string,
  gender: PropTypes.string,
  id: PropTypes.number,
  isOrganisation: PropTypes.bool,
  knownAs: PropTypes.string,
  lastElectorRefNo: PropTypes.number,
  lat: PropTypes.number,
  lng: PropTypes.number,
  localGovArea: PropTypes.string,
  middleName: PropTypes.string,
  mobile: PropTypes.arrayOf(
    PropTypes.shape({
      primary: PropTypes.bool,
      value: PropTypes.string,
    })
  ),
  notes: PropTypes.string,
  organisation: PropTypes.string,
  organisationType: PropTypes.string,
  postNominal: PropTypes.string,
  postcode: PropTypes.string,
  registeredAddress1: PropTypes.string,
  registeredAddress2: PropTypes.string,
  registeredConstituency: PropTypes.string,
  registeredDate: PropTypes.string,
  registeredPostcode: PropTypes.string,
  registeredState: PropTypes.string,
  registeredTown: PropTypes.string,
  role: PropTypes.string,
  stateConstituency: PropTypes.string,
  stripeCustomerID: PropTypes.string,
  surname: PropTypes.string,
  telephone: PropTypes.arrayOf(
    PropTypes.shape({
      primary: PropTypes.bool,
      value: PropTypes.string,
    })
  ),
  telephoneWork: PropTypes.arrayOf(
    PropTypes.shape({
      primary: PropTypes.bool,
      value: PropTypes.string,
    })
  ),
  title: PropTypes.string,
  town: PropTypes.string,
  twitter: PropTypes.string,
  ward: PropTypes.string,
  website: PropTypes.string,
};

const connectionPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  parentID: PropTypes.number,
  childID: PropTypes.number,
  connectionTypeID: PropTypes.number,
  connectionStarted: PropTypes.string,
  connectionFinished: PropTypes.string,
  role: PropTypes.string,
  email: PropTypes.string,
  telephone: PropTypes.string,
  useOrgAddress: PropTypes.bool,
  primaryContact: PropTypes.bool,
  deleted: PropTypes.bool,
  editable: PropTypes.bool,
  detail: PropTypes.shape(constituentPropTypeBase),
});

const constituentPropType = PropTypes.shape({
  ...constituentPropTypeBase,
  connections: PropTypes.arrayOf(connectionPropType),
});

const constituentDetails = PropTypes.shape({
  name: PropTypes.shape({
    title: PropTypes.string,
    firstName: PropTypes.string,
    surname: PropTypes.string,
    knownAs: PropTypes.string,
  }),
  postNominal: PropTypes.string,
  role: PropTypes.string,
  organisation: PropTypes.string,
  address: PropTypes.shape({
    address1: PropTypes.string,
    address2: PropTypes.string,
    town: PropTypes.string,
    county: PropTypes.string,
    postcode: PropTypes.string,
  }),
  contactDetails: PropTypes.shape({
    telephone: PropTypes.string,
    mobile: PropTypes.string,
    email: PropTypes.string,
  }),
  ordinalAge: PropTypes.string,
  monthDayOfBirth: PropTypes.string,
  dob: PropTypes.string,
  ref1: PropTypes.string,
  ref2: PropTypes.string,
  ref3: PropTypes.string,
  membershipNumber: PropTypes.string,
  membershipType: PropTypes.string,
});

export {
  constituentPropType,
  constituentDetails,
  constituentPropTypeBase,
  connectionPropType,
};
