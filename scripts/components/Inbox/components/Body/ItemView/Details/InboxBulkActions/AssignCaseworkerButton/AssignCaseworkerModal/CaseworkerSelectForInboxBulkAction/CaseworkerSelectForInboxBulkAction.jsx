import { Button, FlexBox } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import CaseworkerSelect from "../../../../../../../../../common/CaseDetailInputs/CaseworkerSelect/CaseworkerSelect.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./CaseworkerSelectForInboxBulkAction.propTypes.js";
import useStyles from "./CaseworkerSelectForInboxBulkAction.styles.js";

const CaseworkerSelectForInboxBulkAction = ({
  value = "undefined",
  onChange,
  onConfirm,
  caseworkers,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <div className={classes.caseworkerSelectForInboxBulkAction}>
      <p>{iln.gettext("Select a Caseworker to assign to selected emails")}</p>
      <CaseworkerSelect
        onChange={onChange}
        name="caseworker"
        label={iln.gettext("Assign to")}
        keepErrorSpacing={false}
        caseworkers={caseworkers}
        value={value}
      />
      <br />
      <FlexBox hAlign="flex-end">
        <Button isDisabled={value === "undefined"} onClick={onConfirm}>
          {iln.gettext("Next")}
        </Button>
      </FlexBox>
    </div>
  );
};

CaseworkerSelectForInboxBulkAction.propTypes = propTypes;

export default CaseworkerSelectForInboxBulkAction;
