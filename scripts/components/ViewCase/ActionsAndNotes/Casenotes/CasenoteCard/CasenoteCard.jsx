import { Card, FlexBox, Indent } from "@electedtech/electedtech-ui";

import { ButtonBar } from "@electedtech/electedtech-ui";
import React from "react";
import propTypes from "./propTypes";
import { useReduxSlice } from "./CasenoteCard.redux";
import { useStyles } from "./styles";
import { useTheme } from "react-jss";

const CasenoteCard = ({ title, icon, right, header, main, footer, id }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const { casePermissions } = useReduxSlice();

  return (
    <div id={id} className={classes.casenote}>
      <Indent>
        <Card className={classes.card}>
          <div className={classes.cardHeader}>
            <FlexBox hAlign={"space-between"}>
              <div className={classes.title}>{title}</div>
              {casePermissions?.edit && (
                <ButtonBar
                  customClassNames={classes.buttonBar}
                  dropShadow={false}
                  size={"small"}
                >
                  {right}
                </ButtonBar>
              )}
            </FlexBox>
          </div>
          <div className={classes.cardBody}>
            <div className={classes.icon}>{icon}</div>
            <div className={classes.main}>
              {header}
              {main}
            </div>
          </div>
          {footer && <div className={classes.footer}>{footer}</div>}
        </Card>
      </Indent>
    </div>
  );
};

CasenoteCard.propTypes = propTypes;

export default CasenoteCard;
