import { contactDetailsPropType } from "../MultiContactInput/MultiContactInput.propTypes";
import propTypes from "prop-types";

export default {
  createButtonText: propTypes.node,
  cancelButtonText: propTypes.node,
  inititalValues: propTypes.shape({
    title: propTypes.string,
    firstName: propTypes.string,
    surname: propTypes.string,
    organsiation: propTypes.string,
    role: propTypes.string,
    address1: propTypes.string,
    address2: propTypes.string,
    town: propTypes.string,
    county: propTypes.string,
    postcode: propTypes.string,
    email: propTypes.arrayOf(contactDetailsPropType),
    telephone: propTypes.arrayOf(contactDetailsPropType),
    mobile: propTypes.arrayOf(contactDetailsPropType),
  }),
  onCancelClick: propTypes.func,
  onCreateClick: propTypes.func.isRequired,
  disbleCreateButton: propTypes.bool,
};
