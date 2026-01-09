import { caseFiltersContainer, caseFiltersLabel } from "../../common/styles";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  casesStatusSelect: { ...caseFiltersContainer, minWidth: 300 },
  label: caseFiltersLabel,
});

export default useStyles;
