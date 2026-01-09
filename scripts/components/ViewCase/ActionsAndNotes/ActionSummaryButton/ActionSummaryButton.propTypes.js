import PropTypes from "prop-types";

const propTypes = {
  showCasenotes: PropTypes.shape({
    email: PropTypes.bool,
    letter: PropTypes.bool,
    file: PropTypes.bool,
    note: PropTypes.bool,
    reviewDate: PropTypes.bool,
  }),
  onAddCasenote: PropTypes.func,
  onUpdateCasenote: PropTypes.func,
  casenotes: PropTypes.array,
  hasMore: PropTypes.bool,
};

export default propTypes;
