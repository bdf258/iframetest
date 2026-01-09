import { caseFiltersContainer, caseFiltersLabel } from "../../common/styles";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  casesDateSelect: {
    ...caseFiltersContainer,
    minWidth: 475,
  },
  label: caseFiltersLabel,
  datepickerInput: {
    textAlign: "center",
  },
  typeSelectContainer: {
    minWidth: 175,
  },
  datepickerContainer: {
    maxWidth: 120,
  },
});

export default useStyles;
