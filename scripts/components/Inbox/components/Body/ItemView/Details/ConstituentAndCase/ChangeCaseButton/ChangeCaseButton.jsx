import {
  Button,
  Placeholder,
  SliderContext,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import AssignConstituentAndCase from "../../common/AssignConstituentAndCase/AssignConstituentAndCase.jsx";
import TranslationContext from "../../../../../../../../context/translation/TranslationContext.js";
import { noPermissionConstituentID } from "../../consts/noPermissionConstituent.js";
import proptypes from "./ChangeCaseButton.propTypes.js";
import { useStyles } from "./ChangeCaseButton.styles.js";

const ChangeCaseButton = ({ caseID, item, constituent }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { sliderActions } = useContext(SliderContext);

  if (constituent && constituent.id === noPermissionConstituentID) return null;

  if (!constituent || !caseID)
    return (
      <Placeholder style={{ marginBottom: "0.2rem" }} width={55} height={15} />
    );

  return (
    <Button
      type={"text"}
      customClassNames={classes.changeButton}
      onClick={() =>
        sliderActions.open({
          title: "Assign Email to Case",
          component: (
            <AssignConstituentAndCase
              constituent={constituent}
              caseID={caseID}
              item={item}
            />
          ),
        })
      }
    >
      ({iln.gettext("Change")})
    </Button>
  );
};

ChangeCaseButton.propTypes = proptypes;

export default ChangeCaseButton;
