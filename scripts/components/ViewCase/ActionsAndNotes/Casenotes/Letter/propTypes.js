import PropTypes from "prop-types";
import letterCasenote from "../common/propTypes/letterCasenote";

const propTypes = {
  index: PropTypes.number.isRequired,
  casenote: letterCasenote.isRequired,
  title: PropTypes.string,
};

export default propTypes;
