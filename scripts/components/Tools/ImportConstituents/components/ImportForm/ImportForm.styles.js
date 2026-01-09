import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({

card: {
    // borderRadius: 5,
    marginBottom: "30px",
  },
  inCardGap: {
    margin: { top: 8, bottom: 8, right: 0, left: 0 },
  },
  fileCardLabelWidth: { width: "150px" },
  OptionsCardLabelWidth: { width: "200px" },
});

export default useStyles;
