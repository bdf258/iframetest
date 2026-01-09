import propTypes from "prop-types";

export default {
  matchDetails: propTypes.shape({
    category: propTypes.oneOfType([propTypes.number, propTypes.string])
      .isRequired,
    caseType: propTypes.number.isRequired,
    tagged: propTypes.shape({
      value: propTypes.string,
      chips: propTypes.arrayOf(
        propTypes.shape({
          tag: propTypes.string,
          id: propTypes.oneOfType([propTypes.string, propTypes.number])
            .isRequired,
        }).isRequired
      ).isRequired,
    }),
  }).isRequired,
  updateState: propTypes.func.isRequired,
};
