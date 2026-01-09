import propTypes from "prop-types";

export default {
  onClickBack: propTypes.func.isRequired,
  onClickNext: propTypes.func.isRequired,
  initialValues: propTypes.object,
  createAsOrg: propTypes.bool.isRequired,
  toggleView: propTypes.func,
  disableConnectionCreation: propTypes.bool,
};
