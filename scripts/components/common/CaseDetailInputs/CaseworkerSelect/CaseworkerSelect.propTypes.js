import propTypes from "prop-types";

export default {
  caseworkers: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
      active: propTypes.bool.isRequired,
      name: propTypes.string.isRequired,
      email: propTypes.string,
    })
  ),
  customClassNames: propTypes.shape({
    container: propTypes.string,
    label: propTypes.string,
    select: propTypes.string,
  }),
  includeCreatorOption: propTypes.bool,
  includeInactiveAssignedCaseworker: propTypes.bool,
  includeUnassignedOption: propTypes.bool,
  keepErrorSpacing: propTypes.bool,
  label: propTypes.string,
  name: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
};
