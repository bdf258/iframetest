import propTypes from "prop-types";

export default {
  onConstituentSelect: propTypes.func.isRequired,
  onCaseSelect: propTypes.func.isRequired,
  onClickSearchAllConstituents: propTypes.func.isRequired,
  onClickCreateConstituent: propTypes.func.isRequired,
  onClickCreateOrganisation: propTypes.func.isRequired,
  inboxItemType: propTypes.oneOf([
    "sms-inbound",
    "whatsapp-inbound",
    "external-new",
  ]),
};
