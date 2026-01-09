import PropTypes from "prop-types";
import constituentPropTypes from "../../AssignConstituentAndCase.propTypes";
import propTypes from "prop-types";

export default {
  onConstituentSelect: propTypes.func.isRequired,
  onElectoralRollSelect: propTypes.func.isRequired,
  onClickCreateConstituent: propTypes.func.isRequired,
  matchingConstituents: propTypes.arrayOf(constituentPropTypes.constituent),
  electoralRollMatches: propTypes.arrayOf(
    constituentPropTypes.constituentElectoralRoll
  ),
  onClickSearchAllConstituents: propTypes.func.isRequired,
  inboxItemType: PropTypes.oneOf([
    "sms-inbound",
    "whatsapp-inbound",
    "external-new",
  ]),
};
