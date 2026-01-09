import propTypes from "prop-types";

export default {
  onConstituentSelect: propTypes.func.isRequired,
  onCaseSelect: propTypes.func,
  onElectoralRollSelect: propTypes.func,
  extraColumnsToReturn: propTypes.shape({ constituent: propTypes.object }),
};
