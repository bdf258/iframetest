import { caseFiltersContainer, caseFiltersLabel } from "../../common/styles";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  casesBehalfOfSelect: { ...caseFiltersContainer, minWidth: 250 },
  label: caseFiltersLabel,
  placeholder: {
    margin: { left: 5, right: 5 },
  },
});

export default useStyles;
