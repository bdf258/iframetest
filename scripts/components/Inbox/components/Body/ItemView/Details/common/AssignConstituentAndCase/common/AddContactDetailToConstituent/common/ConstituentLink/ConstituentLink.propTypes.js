import PropTypes from "prop-types";

const propTypes = {
  constituent: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    firstName: PropTypes.string,
    surname: PropTypes.string,
  }),
};

export default propTypes;
