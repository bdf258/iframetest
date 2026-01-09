import { caseFiltersContainer, caseFiltersLabel } from "../../common/styles";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  casesCategorySelect: {
    ...caseFiltersContainer,
    minWidth: 250,
  },
  label: caseFiltersLabel,
});

export default useStyles;
