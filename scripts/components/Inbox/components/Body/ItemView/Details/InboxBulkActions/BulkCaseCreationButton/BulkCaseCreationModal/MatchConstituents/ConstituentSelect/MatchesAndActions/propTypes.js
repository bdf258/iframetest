import propTypes from "prop-types";

export default {
  constituentMatches: propTypes.array.isRequired,
  electoralRollMatches: propTypes.array.isRequired,
  resultType: propTypes.oneOf([
    "multipleMatches",
    "oneMatch",
    "noMatches",
    "matchingNames",
  ]).isRequired,
  setView: propTypes.func.isRequired,
  setConfirmDetails: propTypes.func.isRequired,
  fromEmailAddress: propTypes.string.isRequired,
};
