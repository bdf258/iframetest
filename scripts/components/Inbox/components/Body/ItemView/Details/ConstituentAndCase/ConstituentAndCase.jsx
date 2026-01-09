import { Button, SliderContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import AssignConstituentAndCase from "../common/AssignConstituentAndCase/AssignConstituentAndCase.jsx";
import AssignedCase from "./AssignedCase/AssignedCase.jsx";
import AssignedConstituent from "./AssignedConstituent/AssignedConstituent.jsx";
import CaseDetailsOneLineSummary from "./CaseDetailsOneLineSummary/CaseDetailsOneLineSummary.jsx";
import ChangeCaseButton from "./ChangeCaseButton/ChangeCaseButton.jsx";
import TranslationContext from "../../../../../../../context/translation/TranslationContext.js";
import propTypes from "./propTypes";
import { useStyles } from "./styles.js";
import { useTheme } from "react-jss";

const ConstituentAndCase = ({ caseID, item, constituent }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const iln = useContext(TranslationContext);
  const { sliderActions } = useContext(SliderContext);

  return (
    <div>
      <div className={classes.constituentAndCase}>
        <div className={classes.label}>
          {constituent?.isOrganisation
            ? iln.gettext("Organisation")
            : iln.gettext("Constituent")}
          :
        </div>
        {caseID ? (
          <AssignedConstituent constituent={constituent} />
        ) : (
          <Button
            className={classes.assignButton}
            onClick={() =>
              sliderActions.open({
                title: iln.gettext("Assign Email to Case"),
                component: <AssignConstituentAndCase item={item} />,
              })
            }
            type={"text"}
          >
            {iln.gettext("Assign to Constituent & Case")}
          </Button>
        )}
      </div>
      <div className={classes.constituentAndCase}>
        <div className={classes.label}>{iln.gettext("Case")}:</div>
        {caseID ? (
          <div className={classes.caseAndChangeContainer}>
            <AssignedCase caseID={caseID} />
            <ChangeCaseButton
              item={item}
              constituent={constituent}
              caseID={caseID}
            />
            <CaseDetailsOneLineSummary caseID={caseID} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

ConstituentAndCase.propTypes = propTypes;

export default ConstituentAndCase;
