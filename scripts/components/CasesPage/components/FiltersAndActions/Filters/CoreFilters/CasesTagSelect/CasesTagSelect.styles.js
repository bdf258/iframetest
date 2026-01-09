import { caseFiltersContainer, caseFiltersLabel } from "../../common/styles";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  casesTagSelect: { ...caseFiltersContainer, minWidth: 700 },
  searchTypeSelectContainer: {
    flexBasis: "unset",
    flexGrow: "unset",
    minWidth: 100,
  },
  label: caseFiltersLabel,
  placeholder: {
    margin: { left: 5, right: 5 },
  },
});

export default useStyles;
