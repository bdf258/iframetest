import { Button, ButtonBar } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import Hr from "../../../../../../../../../common/Hr";
import TranslationContext from "../../../../../../../../../../context/translation/TranslationContext";
import propTypes from "./propTypes";
import { useStyles } from "./styles";

const AssignActions = ({
  onClickCreateCase,
  onClickCreateConstituent,
  onClickCreateOrganisation,
  onClickChooseConstituent,
  onClickSearchAllConstituents,
}) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles();

  return (
    <div className={classes.buttons}>
      {onClickCreateCase && (
        <ButtonBar>
          <Button customClassNames={classes.button} onClick={onClickCreateCase}>
            {iln.gettext("Create a new case")}
          </Button>
        </ButtonBar>
      )}

      {onClickCreateCase &&
        (onClickSearchAllConstituents ||
          onClickCreateConstituent ||
          onClickCreateOrganisation ||
          onClickChooseConstituent) && <Hr margin={8}>{iln.gettext("Or")}</Hr>}

      {onClickSearchAllConstituents && (
        <ButtonBar>
          <Button
            customClassNames={classes.button}
            onClick={onClickSearchAllConstituents}
          >
            {iln.gettext("Search all constituents")}
          </Button>
        </ButtonBar>
      )}

      {(onClickCreateConstituent || onClickCreateOrganisation) && (
        <ButtonBar>
          {onClickCreateConstituent && (
            <Button
              customClassNames={classes.button}
              onClick={onClickCreateConstituent}
            >
              {iln.gettext("Create new constituent")}
            </Button>
          )}
          {onClickCreateOrganisation && (
            <Button
              customClassNames={classes.button}
              onClick={onClickCreateOrganisation}
            >
              {iln.gettext("Create new organisation")}
            </Button>
          )}
        </ButtonBar>
      )}
      {onClickChooseConstituent && (
        <ButtonBar>
          <Button
            customClassNames={classes.button}
            onClick={onClickChooseConstituent}
          >
            {iln.gettext("Choose a different constituent / organisation")}
          </Button>
        </ButtonBar>
      )}
    </div>
  );
};

AssignActions.propTypes = propTypes;

export default AssignActions;
