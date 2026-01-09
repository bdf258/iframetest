import { caseFiltersContainer, caseFiltersLabel } from "../../common/styles";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  casesTownSelect: { ...caseFiltersContainer, minWidth: 550 },
  townPostcodeTypeSelectContainer: {
    flexBasis: "unset",
    flexGrow: "unset",
    minWidth: 110,
  },
  label: caseFiltersLabel,
});

export default useStyles;
