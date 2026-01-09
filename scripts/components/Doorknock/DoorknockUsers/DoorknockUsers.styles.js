import { createUseStyles } from "react-jss";
import theme from "../../../../theme";

const headerSpacing = {
  margin: "10px 0",
};
export default createUseStyles({
  headingContainer: headerSpacing,
  footerContainer: headerSpacing,
  tableCell: {
    textAlign: "center",
    verticalAlign: "middle",
  },
  modalCard: {
    width: theme.modal.width.medium,
  },
});
