import { caseFiltersContainer } from "../../common/styles";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  casesAssignedSelect: { ...caseFiltersContainer, minWidth: 425 },
  typeContainer: {
    minWidth: 150,
    flexBasis: "unset",
  },
  placeholder: {
    margin: { left: 5, right: 5 },
  },
});

export default useStyles;
