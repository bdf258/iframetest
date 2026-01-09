import { FlexBox, Placeholder } from "@electedtech/electedtech-ui";

import React from "react";
import { useStyles } from "./styles";

const ConstituentDetailsPlaceholder = () => {
  const classes = useStyles();

  return (
    <FlexBox hAlign="flex-start" className={classes.topMargin}>
      <div className={classes.bottomMargin}>
        <Placeholder width={415} height={28} className={classes.headerH2} />
        <Placeholder width={350} height={20} className={classes.listItem} />
        <Placeholder width={250} height={20} className={classes.listItem} />
        <Placeholder width={150} height={20} className={classes.listItem} />
      </div>
    </FlexBox>
  );
};

export default ConstituentDetailsPlaceholder;
