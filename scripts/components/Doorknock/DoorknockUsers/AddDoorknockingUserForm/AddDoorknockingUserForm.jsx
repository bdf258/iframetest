import {
  Button,
  FlexBox,
  FormHandler,
  FormSelect,
  FormSelectAutoComplete,
  FormSubmitButton,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import { TranslationContext } from "context/translate";
import propTypes from "./AddDoorknockingUserForm.propTypes";
import { useStyles } from "./AddDoorknockingUserForm.styles";

const AddDoorknockingUserForm = ({
  doorknockingUsers,
  caseworkers,
  surveys,
  saveDoorknockPermission,
  entry,
  onCancel,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const [formError, setFormError] = useState();
  const [loading, setLoading] = useState(false);

  const caseworkersWithOutAssociatedSurveys = () => {
    const caseworkersWithSurveys = doorknockingUsers.map((user) =>
      user.caseworker_id.toString()
    );
    const caseworkersWithoutSurveys = caseworkers.filter(
      (caseworker) => !caseworkersWithSurveys.includes(caseworker.id)
    );

    return caseworkersWithoutSurveys;
  };

  const saveData = (form) => {
    let errorMessage =
      form.caseworker_id == 0 || form.survey_id == 0
        ? "Please select values"
        : "";
    setFormError(errorMessage);

    if (errorMessage == "") {
      setLoading(true);
      saveDoorknockPermission(form).then(() => {
        setLoading(false);
      });
    }
  };
  const filteredCaseworkers = (entry) =>
    entry.caseworker_id == 0
      ? caseworkersWithOutAssociatedSurveys(caseworkers)
      : caseworkers.filter((cw) => cw.id == entry.caseworker_id);

  if (loading) {
    return (
      <FlexBox hAlign={"center"}>
        <Spinner scale={1} />
      </FlexBox>
    );
  }

  return (
    <div className={classes.editDoorkockingUserModalContainer}>
      <FlexBox hAlign="space-around" wrap column={true}>
        <FormHandler state={entry} onSubmit={(form) => saveData(form)}>
          <FormSelectAutoComplete
            label={iln.gettext("Caseworkers")}
            name={"caseworker_id"}
            placeholder={iln.gettext("Caseworkers")}
            value={entry.caseworker_id}
          >
            {filteredCaseworkers(entry).map((caseworker) => (
              <option key={caseworker.id} value={+caseworker.id}>
                {caseworker.name}
              </option>
            ))}
          </FormSelectAutoComplete>
          <FormSelectAutoComplete
            label={iln.gettext("Survey")}
            name={"survey_id"}
            placeholder={iln.gettext("Survey")}
            value={entry.survey_id}
          >
            {surveys.map((survey) => (
              <option key={survey.id} value={survey.id}>
                {survey.name}
              </option>
            ))}
          </FormSelectAutoComplete>
          <FormSelect
            label={iln.gettext("Active")}
            name={"active"}
            type="text"
            value={entry.active}
            error={formError}
          >
            <option value={"1"}>Yes</option>
            <option value={"0"}>No</option>
          </FormSelect>
          <FlexBox hAlign={"space-between"}>
            <Button onClick={() => onCancel()}>{iln.gettext("Cancel")}</Button>
            <FormSubmitButton>{iln.gettext("Save")}</FormSubmitButton>
          </FlexBox>
        </FormHandler>
      </FlexBox>
    </div>
  );
};

export default AddDoorknockingUserForm;

AddDoorknockingUserForm.propTypes = propTypes;
