import {
  Button,
  FlexBox,
  FormSelect,
  NotificationBox,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import propTypes from "./DeleteCaselessConstituentsSelect.propTypes.js";
import useStyles from "./DeleteCaselessConstituentsSelect.styles.js";

const DeleteCaselessConstituentsSelect = ({
  value,
  setValue,
  onBackClick,
  onNextClick,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <React.Fragment>
      <NotificationBox
        type="alert"
        alertMessage={iln.gettext("This action cannot be undone or stopped")}
      />
      <p>
        {iln.gettext(
          "Would you like to delete constituents that have no cases as a result of this bulk case deletion?"
        )}
      </p>
      <FormSelect
        name="deleteCaselessConstituents"
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        customClassNames={{ container: classes.container }}
        keepErrorSpacing={false}
      >
        <option value={undefined}>
          {iln.gettext("Click to select option")}
        </option>
        <option value={false}>{iln.gettext("No")}</option>
        <option value={true}>{iln.gettext("Yes")}</option>
      </FormSelect>

      <FlexBox hAlign="space-between">
        <Button onClick={onBackClick}>{iln.gettext("Back")}</Button>
        <Button isDisabled={value === undefined} onClick={onNextClick}>
          {iln.gettext("Next")}
        </Button>
      </FlexBox>
    </React.Fragment>
  );
};

DeleteCaselessConstituentsSelect.propTypes = propTypes;

export default DeleteCaselessConstituentsSelect;
