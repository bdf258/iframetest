import PropTypes from "prop-types";

const TagListPropType = PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })
  ),
]);

const TagRangeListPropType = PropTypes.arrayOf(
  PropTypes.shape({
    tagRangeType: PropTypes.string,
    text: PropTypes.string,
  })
);

export { TagListPropType, TagRangeListPropType };
