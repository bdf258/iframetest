import PropTypes from "prop-types";

const propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      casetype: PropTypes.string.isRequired,
      categorytypeID: PropTypes.number.isRequired,
    }),
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      statustype: PropTypes.string.isRequired,
      categorytypeID: PropTypes.number.isRequired,
      closed: PropTypes.bool.isRequired,
    }),
    PropTypes.shape({
      categorytypeID: PropTypes.number.isRequired,
    }),
    PropTypes.shape({
      categorytypeID: PropTypes.oneOf([undefined]),
    }),
  ]).isRequired,
  typeKey: PropTypes.oneOf(["casetype", "statustype"]),
};

export default propTypes;
