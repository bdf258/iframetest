import PropTypes from "prop-types";

const filterPropType = PropTypes.arrayOf(PropTypes.number);

const isNumberPropType =
  ({ required, path = "" } = {}) =>
  (props, propName, componentName) =>
    !required && !props[propName]
      ? undefined
      : required && !props[propName]
      ? new Error(
          `'${propName}' is required in ${componentName}, expected number or valid number string and recieved '${props[propName]}'`
        )
      : isNaN(props[propName])
      ? new Error(
          `'Invalid prop ${path}${propName}' supplied to ${componentName}, expected number or valid number string`
        )
      : undefined;

export const filtersPropTypes = PropTypes.exact({
  pageNo: PropTypes.number.isRequired,
  return: PropTypes.oneOf(["columns", "emailCount"]).isRequired,
  orderBy: PropTypes.oneOf(["caseID", "surname", "created", "lastActioned"])
    .isRequired,
  orderByDirection: PropTypes.oneOf(["ASC", "DESC"]).isRequired,
  resultsPerPage: isNumberPropType({
    required: true,
    path: "state.filters.",
  }),
  statusID: filterPropType.isRequired,
  casetypeID: filterPropType.isRequired,
  categorytypeID: filterPropType.isRequired,
  contacttypeID: filterPropType.isRequired,
  assignedToID: filterPropType,
  createdByID: filterPropType,
  behalfOf: filterPropType,
  customFields: PropTypes.object.isRequired,
  constituentCriteria: PropTypes.shape({
    inPostalTown: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  tagged: PropTypes.exact({
    searchType: PropTypes.oneOf(["any", "all", "none"]).isRequired,
    tagID: filterPropType.isRequired,
  }).isRequired,
  notTagged: PropTypes.exact({
    searchType: PropTypes.oneOf(["any", "all", "none"]).isRequired,
    tagID: filterPropType.isRequired,
  }).isRequired,
  dateRange: PropTypes.exact({
    type: PropTypes.oneOf(["created", "lastActioned", "reviewDate"]).isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }).isRequired,
  columnsToReturn: PropTypes.exact({
    case: PropTypes.arrayOf(PropTypes.string).isRequired,
    constituent: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
}).isRequired;

const statePropType = PropTypes.shape({
  caseworkers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  allCaseworkers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  filters: filtersPropTypes,
  view: PropTypes.oneOf(["table", "map"]).isRequired,
  results: PropTypes.exact({
    page: PropTypes.number.isRequired,
    cases: PropTypes.arrayOf(
      PropTypes.exact({
        customFields: PropTypes.object.isRequired,
        id: PropTypes.number.isRequired,
        assignedTo: PropTypes.number.isRequired,
        contactType: PropTypes.number.isRequired,
        created: PropTypes.string.isRequired,
        caseType: PropTypes.number.isRequired,
        category: PropTypes.number.isRequired,
        restrictions: PropTypes.arrayOf(PropTypes.string),
        lastActioned: PropTypes.string.isRequired,
        createdBy: PropTypes.number.isRequired,
        summary: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
        reviewDate: PropTypes.string.isRequired,
        constituent: PropTypes.shape({
          id: PropTypes.number.isRequired,
          firstname: PropTypes.string.isRequired,
          surname: PropTypes.string.isRequired,
          organisationName: PropTypes.string.isRequired,
        }),
        tagged: PropTypes.string.isRequired,
        assignedInitials: PropTypes.string.isRequired,
        userPermissions: PropTypes.exact({
          delete: PropTypes.bool.isRequired,
          edit: PropTypes.bool.isRequired,
          manage: PropTypes.bool.isRequired,
          view: PropTypes.bool.isRequired,
        }),
      })
    ),
    resultsPerPage: isNumberPropType({
      path: "state.results.",
    }),
    totalResults: PropTypes.number,
  }).isRequired,
});

export default statePropType;
