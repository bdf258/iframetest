import { FlexBox, Placeholder } from "@electedtech/electedtech-ui";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  item: { marginBottom: 5 },
});

const AssignedConstituentPlaceholder = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <FlexBox column vAlign={"center"}>
        <Placeholder className={classes.item} width={550} height={15} />
        <Placeholder className={classes.item} width={500} height={15} />
        <Placeholder className={classes.item} width={400} height={30} />
      </FlexBox>
    </React.Fragment>
  );
};

export default AssignedConstituentPlaceholder;
