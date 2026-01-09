import constituentPropTypes from "../AssignConstituentAndCase/AssignConstituentAndCase.propTypes";
import propTypes from "prop-types";

export default {
  keepErrorSpacing: propTypes.bool,
  matchingConstituents: propTypes.arrayOf(constituentPropTypes.constituent),
  electoralRollMatches: propTypes.arrayOf(propTypes.object),
  customClassNames: propTypes.object,
  label: propTypes.string,
  name: propTypes.string,
  onConstituentSelect: propTypes.func,
  onElectoralRollSelect: propTypes.func,
  onCreateNewOrganisation: propTypes.func.isRequired,
  onCreateNewConstituent: propTypes.func.isRequired,
  value: propTypes.number,
};
