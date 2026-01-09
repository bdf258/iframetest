import PropTypes from "prop-types";
import constituentPropTypes from "../../AssignConstituentAndCase.propTypes";
import propTypes from "prop-types";

export default {
  onConstituentSelect: propTypes.func.isRequired,
  onClickCreateConstituent: propTypes.func.isRequired,
  onClickCreateOrganisation: propTypes.func.isRequired,
  matchingConstituents: propTypes.arrayOf(constituentPropTypes.constituent),
  onClickSearchAllConstituents: propTypes.func.isRequired,
  inboxItemType: PropTypes.oneOf([
    "sms-inbound",
    "whatsapp-inbound",
    "external-new",
  ]),
};
