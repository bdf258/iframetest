import { emailItem } from "../../../../../../proptypes/emailItem";
import { noPermissionCaseID } from "../../consts/noPermissionCase";
import propTypes from "prop-types";

export default {
  caseID: propTypes.number.isRequired,
  constituent: propTypes.shape({
    id: propTypes.oneOfType([
      propTypes.number,
      propTypes.string,
      propTypes.oneOf([noPermissionCaseID]),
    ]).isRequired,
    title: propTypes.string,
    firstName: propTypes.string,
    surname: propTypes.string,
  }),
  item: propTypes.shape(emailItem).isRequired,
};
