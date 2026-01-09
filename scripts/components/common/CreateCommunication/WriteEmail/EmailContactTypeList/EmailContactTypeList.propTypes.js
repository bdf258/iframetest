import ContactTypeListPropTypes from "../../types/ContactTypeList.propTypes";
import PropTypes from "prop-types";
import { constituentPropType } from "../../../../../types/Constituent";

const propTypes = {
  onContactTypeSelect: PropTypes.func.isRequired,
  contactTypes: ContactTypeListPropTypes,
  constituent: constituentPropType,
};

export default propTypes;
