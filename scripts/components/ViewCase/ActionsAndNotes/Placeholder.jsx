import { FlexBox, Indent, Placeholder } from "@electedtech/electedtech-ui";

import React from "react";
import useStyles from "./styles";
import { useTheme } from "react-jss";

const CasenotesPlaceholder = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div>
      <Placeholder width={415} height={28} className={classes.headerH2} />
      <FlexBox hAlign="space-between">
        <div>
          <Placeholder width={135} height={27} className={classes.leftMargin} />
        </div>
        <FlexBox hAlign="flex-end">
          <Placeholder
            width={705}
            height={27}
            className={classes.rightMargin}
          />
        </FlexBox>
      </FlexBox>
      <br />
      <Indent>
        <Placeholder width="100%" height={200} />
      </Indent>
      <br />
      <Indent>
        <Placeholder width="100%" height={200} />
      </Indent>
      <br />
      <Indent>
        <Placeholder width="100%" height={200} />
      </Indent>
    </div>
  );
};

export default CasenotesPlaceholder;
