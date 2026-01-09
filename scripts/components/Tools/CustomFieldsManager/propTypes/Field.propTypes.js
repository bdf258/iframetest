import PropTypes from "prop-types";

export const option = PropTypes.shape({
  id: PropTypes.number.isRequired,
  filterID: PropTypes.number.isRequired,
  group: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
});
export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["checkbox", "int", "datetime", "text", "varchar"]),
  object: PropTypes.oneOf(["constituents", "cases", "users"]),
  orderNo: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.arrayOf(option).isRequired,
  filteredBy: PropTypes.number.isRequired,
  filterable: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.number).isRequired,
  mappedToGroup: PropTypes.number.isRequired,
  hideonCreate: PropTypes.number.isRequired,
  block_id: PropTypes.number.isRequired,
});
