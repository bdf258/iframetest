import PropTypes from "prop-types";

export default {
  customBlocksAsInputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      parent_object: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      inputs: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          input: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.number.isRequired,
                filterID: PropTypes.number,
                group: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
              })
            ),
            filteredBy: PropTypes.number,
            categoryTypeID: PropTypes.number,
            model: PropTypes.string,
            hook: PropTypes.string,
            orderNo: PropTypes.number,
            filterable: PropTypes.bool,
            mappedToGroup: PropTypes.number,
            hideonCreate: PropTypes.number,
            block_id: PropTypes.number.isRequired,
            block: PropTypes.string.isRequired,
            categories: PropTypes.arrayOf(PropTypes.number),
          }),
        })
      ),
    })
  ),
  customClassNames: PropTypes.shape({
    input: PropTypes.string,
    container: PropTypes.string,
    inputWrapper: PropTypes.string,
    inputSpecificClasses: PropTypes.shape({
      date: PropTypes.shape({
        container: PropTypes.string,
      }),
    }),
  }),
};
