import PropTypes from "prop-types";
import { emailItem } from "../../../../../proptypes/emailItem";

export default {
  caseID: PropTypes.number.isRequired,
  item: PropTypes.shape(emailItem).isRequired,
  constituent: PropTypes.object,
};
