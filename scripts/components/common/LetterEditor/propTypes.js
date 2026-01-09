import PropTypes from "prop-types";

const propTypes = {
  letterBody: PropTypes.string,
  letterFooter: PropTypes.string,
  letterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  letterRef: PropTypes.string,
  letterSaved: PropTypes.func.isRequired,
  letterTemplateId: PropTypes.number,
  letterheadId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  recipient: PropTypes.shape({
    acronym: PropTypes.string,
    address1: PropTypes.string,
    address2: PropTypes.string,
    email: PropTypes.array,
    firstName: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    role: PropTypes.string,
    surname: PropTypes.string,
    town: PropTypes.string,
  }),
  sendViaEmail: PropTypes.func.isRequired,
  onUnmount: PropTypes.func,
  additionalMergeCodes: PropTypes.arrayOf(
    PropTypes.shape({
      mergeCode: PropTypes.string,
      description: PropTypes.string,
      type: PropTypes.string,
    })
  ),
};

export default propTypes;
