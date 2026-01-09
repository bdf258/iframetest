import { createUseStyles } from "react-jss";

const minWidth = 310;
const padding = 24;
const borderWidth = 2;
const modalWidthPercent = 60;
const mediaQuery = `@media (max-width: ${Math.ceil(
  (1 + minWidth * 2 + padding * 2 + borderWidth) / (modalWidthPercent / 100)
)}px)`;

export const useStyles = createUseStyles({
  modal: {
    display: "flex",
    width: `${modalWidthPercent}vw`,
    maxWidth: 900,
    margin: { bottom: 16 },
    flexWrap: "wrap",
    "& section": {
      "&:first-child": {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        padding: { right: padding, bottom: 12 },
        width: `calc(50% - ${padding}px)`,
        minWidth,
      },
      "&:last-child": {
        flexGrow: 1,
        padding: { left: padding, bottom: 12 },
        width: `calc(50% - ${padding + borderWidth}px)`,
        borderLeft: `solid lightgrey ${borderWidth}px`,
        minWidth,
      },
    },
  },
  [mediaQuery]: {
    modal: {
      "& section": {
        "&:first-child": {
          padding: { right: 0, bottom: 16 },
          width: "100%",
          borderBottom: `solid lightgrey ${borderWidth}px`,
        },
        "&:last-child": {
          padding: { left: 0 },
          width: "100%",
          borderLeft: "unset",
        },
      },
    },
  },
  doneButton: {
    margin: { right: -28, bottom: -16 },
  },
});
