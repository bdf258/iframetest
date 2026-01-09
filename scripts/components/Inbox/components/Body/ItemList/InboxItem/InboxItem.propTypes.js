import PropTypes from "prop-types";

export const itemPropType = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    subject: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
    attachment_count: PropTypes.number.isRequired,
    from: PropTypes.oneOfType([
      PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
      }),
      PropTypes.array,
    ]),
  }),
};
