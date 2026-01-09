import PropTypes from "prop-types";
import { addressField } from "../../../../../proptypes/emailItem";

export default {
  addresses: PropTypes.arrayOf(addressField),
  label: PropTypes.string.isRequired,
};
