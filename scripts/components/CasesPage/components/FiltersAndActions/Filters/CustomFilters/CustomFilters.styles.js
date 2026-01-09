import {
  caseFiltersContainer,
  caseFiltersLabel,
  casesFilterGroup,
} from "../common/styles";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  customFieldContainer: { ...caseFiltersContainer, minWidth: 250 },
  label: caseFiltersLabel,
  filtersGroup: casesFilterGroup,
});

export default useStyles;
