import propTypes from "prop-types";

export default {
  constituentMatches: propTypes.array,
  electoralRollMatches: propTypes.array,
  resultType: propTypes.oneOf([
    "multipleMatches",
    "oneMatch",
    "noMatches",
    "matchingNames",
    "",
  ]),
  fetching: propTypes.bool.isRequired,
  view: propTypes.oneOf(["suggestions", "create", "search"]).isRequired,
  setView: propTypes.func.isRequired,
  onConstituentSelect: propTypes.func.isRequired,
  email: propTypes.object.isRequired,
};
