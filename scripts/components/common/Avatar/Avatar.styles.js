import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  avatar: {
    fontSize: 16,
    fontWeight: 400,
    color: ({ textColor }) => `#${textColor}`,
    width: 40,
    minWidth: 40,
    height: 40,
    borderRadius: "40px",
    backgroundColor: ({ avatarColor }) => `#${avatarColor}`,
    margin: { right: 0 },
  },
  questionMark: {
    padding: { left: 2 },
  },
});

export default useStyles;
