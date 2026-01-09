import propTypes from "prop-types";

export default {
  item: propTypes.shape({
    id: propTypes.number.isRequired,
    from: propTypes.oneOfType([
      propTypes.string,
      propTypes.shape({ email: propTypes.string.isRequired }),
    ]).isRequired,
  }),
  constituent: propTypes.object,
  onClickCreateCase: propTypes.func.isRequired,
  onClickCreateConstituent: propTypes.func.isRequired,
  onClickCreateOrganisation: propTypes.func.isRequired,
  onClickChooseConstituent: propTypes.func.isRequired,
};
