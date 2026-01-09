import { emailItem } from "../../../../../../proptypes/emailItem";
import propTypes from "prop-types";

export default {
  item: propTypes.shape(emailItem).isRequired,
  caseID: propTypes.number,
  constituent: propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string,
    firstName: propTypes.string,
    surname: propTypes.string,
    address1: propTypes.string,
    address2: propTypes.string,
    town: propTypes.string,
    county: propTypes.string,
    postcode: propTypes.string,
    email: propTypes.string,
  }),
  constituentElectoralRoll: propTypes.shape({
    id: propTypes.number,
    title: propTypes.string,
    firstName: propTypes.string,
    surname: propTypes.string,
    address1: propTypes.string,
    address2: propTypes.string,
    town: propTypes.string,
    county: propTypes.string,
    postcode: propTypes.string,
    email: propTypes.string,
  }),
};
