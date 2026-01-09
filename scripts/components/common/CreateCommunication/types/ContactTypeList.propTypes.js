import PropTypes from "prop-types";

export default PropTypes.arrayOf(
  PropTypes.exact({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    question: PropTypes.string,
    default_letter_template_id: PropTypes.number,
    default_template_name: PropTypes.string,
    disable_org_only: PropTypes.bool,
  }).isRequired
);
