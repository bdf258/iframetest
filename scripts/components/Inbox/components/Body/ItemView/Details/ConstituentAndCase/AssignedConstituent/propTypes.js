import propTypes from "prop-types";

export default {
  constituent: propTypes.shape({
    id: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    firstName: propTypes.string,
    surname: propTypes.string,
    address1: propTypes.string,
    postcode: propTypes.string,
  }),
};
