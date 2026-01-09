import PropTypes from "prop-types";
import datestringPropType from "../../../types/datestring";
import permissionPropTypes from "../PermissionsChipInput/PermissionsChipInput.propTypes.js";

const propTypes = {
  caseDetails: PropTypes.shape({
    contactType: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    assignedTo: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    caseType: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    category: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    status: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    tagged: PropTypes.shape({
      value: PropTypes.string,
      chips: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
      ),
    }),
    reviewDate: PropTypes.oneOfType([
      datestringPropType,
      PropTypes.shape({
        days: PropTypes.number,
      }),
      PropTypes.shape({
        months: PropTypes.number,
      }),
      PropTypes.shape({
        years: PropTypes.number,
      }),
    ]),
    relatesTo: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    restrictions: permissionPropTypes.value,
    summary: PropTypes.string.isRequired,
    behalfOf: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    customFields: PropTypes.shape({
      [PropTypes.number]: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    }),
  }),
  includeAssignCreatorOption: PropTypes.bool,
  setCaseDetails: PropTypes.func.isRequired,
  constituentID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  caseworkers: PropTypes.arrayOf(PropTypes.object),
};

export default propTypes;
