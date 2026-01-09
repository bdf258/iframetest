import { FlexBox, Placeholder } from "@electedtech/electedtech-ui";

import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  button: {
    margin: { bottom: 8 },
  },
  row: { margin: { top: 5, bottom: 5 } },
});

const AddButtonPlaceholder = () => {
  const classes = useStyles();

  return (
    <FlexBox hAlign="flex-end">
      <Placeholder width={150} height={37} className={classes.button} />
    </FlexBox>
  );
};

const TablePlaceholder = () => {
  const classes = useStyles();

  return [
    <Placeholder key={1} width="100%" height={50} className={classes.row} />,
    <Placeholder key={2} width="100%" height={50} className={classes.row} />,
    <Placeholder key={3} width="100%" height={50} className={classes.row} />,
    <Placeholder key={4} width="100%" height={50} className={classes.row} />,
    <Placeholder key={5} width="100%" height={50} className={classes.row} />,
    <Placeholder key={6} width="100%" height={50} className={classes.row} />,
    <Placeholder key={7} width="100%" height={50} className={classes.row} />,
    <Placeholder key={8} width="100%" height={50} className={classes.row} />,
    <Placeholder key={9} width="100%" height={50} className={classes.row} />,
    <Placeholder key={10} width="100%" height={50} className={classes.row} />,
  ];
};

export { AddButtonPlaceholder, TablePlaceholder };
