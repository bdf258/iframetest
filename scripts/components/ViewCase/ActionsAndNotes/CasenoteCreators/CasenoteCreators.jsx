import React, { useContext } from "react";

import { ButtonBar } from "@electedtech/electedtech-ui";
import CreatorsContainer from "./CreatorsContainer/CreatorsContainer.jsx";
import { TranslationContext } from "context/translate";
import { useStyles } from "./styles";

const CasenoteCreators = () => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <React.Fragment>
      <div className={classes.buttonBarCollasped}>
        <ButtonBar
          collapsedButtonTitle={iln.gettext("Create")}
          collapse={true}
          size="small"
        >
          <CreatorsContainer />
        </ButtonBar>
      </div>
      <div className={classes.buttonBarContainer}>
        <ButtonBar alignDropDownRight size="small">
          <CreatorsContainer />
        </ButtonBar>
      </div>
    </React.Fragment>
  );
};

export default CasenoteCreators;
