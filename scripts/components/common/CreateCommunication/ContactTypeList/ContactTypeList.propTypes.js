import ContactTypeListPropTypes from "../types/ContactTypeList.propTypes";
import PropTypes from "prop-types";

const propTypes = {
  contactTypes: ContactTypeListPropTypes,
  onContactTypeSelect: PropTypes.func.isRequired,
  onOrganisationPage: PropTypes.bool,
};

export default propTypes;
