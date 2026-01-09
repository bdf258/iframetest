import propTypes from "prop-types";

export default {
  constituent: propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    firstname: propTypes.string.isRequired,
    surname: propTypes.string.isRequired,
  }),
  previousConstituent: propTypes.shape({
    id: propTypes.number.isRequired,
  }),
  emailID: propTypes.number.isRequired,
  caseID: propTypes.number,
  name: propTypes.string.isRequired,
  onClickCreateCase: propTypes.func.isRequired,
  onClickCreateConstituent: propTypes.func.isRequired,
  onClickCreateOrganisation: propTypes.func.isRequired,
  onClickChooseConstituent: propTypes.func.isRequired,
};
