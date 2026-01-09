import { FlexBox, Placeholder } from "@electedtech/electedtech-ui";
import React from "react";
import { useStyles } from "./styles";

const LetterLoadingPlaceHolder = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Placeholder height={27} width={450} className={classes.letterActions} />
      <Placeholder height={360} width={"100%"} className={classes.letterBody} />
      <FlexBox hAlign={"space-between"}>
        <Placeholder
          height={27}
          width={260}
          className={classes.footerActionsLeft}
        />
        <Placeholder
          height={27}
          width={150}
          className={classes.footerActionsRight}
        />
      </FlexBox>
    </React.Fragment>
  );
};

export default LetterLoadingPlaceHolder;
