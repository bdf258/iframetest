import PropTypes from "prop-types";
import noteCasenote from "../common/propTypes/noteCasenote";

const propTypes = {
  updateCasenote: PropTypes.func.isRequired,
  casenote: noteCasenote.isRequired,
  removeCasenote: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default propTypes;
