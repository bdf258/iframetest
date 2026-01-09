import PropTypes from "prop-types";

const addressShape = PropTypes.shape({
  address1: PropTypes.string,
  address2: PropTypes.string,
  town: PropTypes.string,
  county: PropTypes.string,
  postcode: PropTypes.string,
});

const physicalAddressShape = PropTypes.shape({
  physicalAddress1: PropTypes.string,
  physicalAddress2: PropTypes.string,
  physicalTown: PropTypes.string,
  physicalCounty: PropTypes.string,
  physicalPostcode: PropTypes.string,
});

const contactDetailsShape = PropTypes.shape({
  orgEmail: PropTypes.string,
  orgTel: PropTypes.string,
  altTel: PropTypes.string,
  orgMobile: PropTypes.string,
  orgWebsite: PropTypes.string,
});

const initialValues = PropTypes.shape({
  ...addressShape.propTypes,
  ...physicalAddressShape.propTypes,
  ...contactDetailsShape.propTypes,
  isSameAsPostal: PropTypes.bool,
  connectionTypeID: PropTypes.string,
});

const propTypes = {
  onCreateOrganisationWithConnections: PropTypes.func,
  onCreateOrganisation: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func,
  initialValues,
  cancelButtonText: PropTypes.node,
  createButtonText: PropTypes.node,
  organisationTypes: PropTypes.arrayOf(PropTypes.string),
  roleTypes: PropTypes.arrayOf(PropTypes.string),
  connectionTypes: PropTypes.arrayOf(PropTypes.string),
};

export default propTypes;
