import PropTypes from "prop-types";
import reviewDateCasenote from "../common/propTypes/reviewDateCasenote";

const propTypes = {
  updateCasenote: PropTypes.func.isRequired,
  casenote: reviewDateCasenote.isRequired,
  caseworkers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      active: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
    })
  ).isRequired,
  removeCasenote: PropTypes.func.isRequired,
  title: PropTypes.string,
  index: PropTypes.number,
};

export default propTypes;
