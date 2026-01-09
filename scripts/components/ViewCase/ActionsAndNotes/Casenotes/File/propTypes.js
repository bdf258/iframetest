import PropTypes from "prop-types";
import { constituentPropType } from "../../../../../types/Constituent";
import fileCasenote from "../common/propTypes/fileCasenote";

const propTypes = {
  updateCasenote: PropTypes.func.isRequired,
  casenote: fileCasenote,
  constituent: constituentPropType,
  removeCasenote: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default propTypes;
