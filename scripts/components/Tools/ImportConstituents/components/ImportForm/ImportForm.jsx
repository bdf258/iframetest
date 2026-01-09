import {
  Button,
  Card,
  FlexBox,
  FormFileInput,
  FormSelect,
} from "@electedtech/electedtech-ui";
import React, { useState } from "react";

import CaseDetailsForm from "../../../../common/CreateCaseForm/CreateCaseForm.jsx";
import FlagInput from "../../../../common/FlagInput/FlagInput.jsx";
import { allowPersonalFlags } from "../../../../../consts/disabledFeatures.js";
import propTypes from "./ImportForm.propTypes.js";
import useStyles from "./ImportForm.styles.js";
import { validateFileType } from "./helpers/validateInputFile";

function ImportForm({
  iln,
  onConfirm,
  formData,
  setFormData,
  resetForm,
  valid,
}) {
  const [error, setError] = useState("");
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <h4>File Details</h4>
        <FormFileInput
          name="csv"
          onChange={(file) => {
            if (file && validateFileType(file, ".csv")) {
              setFormData((formData) => ({ ...formData, file: file }));
            } else {
              setError({ message: "Invalid file type" });
            }
          }}
          accept=".csv"
          label={iln.gettext("Upload CSV")}
          keepErrorSpacing={false}
          customClassNames={{
            container: classes.inCardGap,
            label: classes.fileCardLabelWidth,
          }}
        />
        <FormSelect
          name="firstLineHeader"
          label={iln.gettext("Is first row header?")}
          value={formData.firstLineHeader}
          onChange={({ target: { value } }) => {
            setFormData((data) => ({
              ...data,
              firstLineHeader: value,
            }));
          }}
          keepErrorSpacing={false}
          customClassNames={{
            container: classes.inCardGap,
            label: classes.fileCardLabelWidth,
          }}
        >
          <option value={""}>{iln.gettext("Click to select option")}</option>
          <option value={true}>{iln.gettext("Yes")}</option>
          <option value={false}>{iln.gettext("No")}</option>
        </FormSelect>
      </Card>
      <Card className={classes.card}>
        <h4>Import Options</h4>
        <FormSelect
          name="keepExistingContactDetails"
          label={iln.gettext("Keep existing details primary")}
          value={formData.keepExistingContactDetails}
          onChange={({ target: { value } }) =>
            setFormData((data) => ({
              ...data,
              keepExistingContactDetails: value,
            }))
          }
          keepErrorSpacing={false}
          customClassNames={{
            container: classes.inCardGap,
            label: classes.OptionsCardLabelWidth,
          }}
        >
          <option value={""}>{iln.gettext("Click to select option")}</option>
          <option value={true}>{iln.gettext("Yes")}</option>
          <option value={false}>{iln.gettext("No")}</option>
        </FormSelect>
        {allowPersonalFlags && (
          <>
            <FormSelect
              name="addReviewFlag"
              label={iln.gettext("Add Review Flag")}
              value={formData.addReviewFlag}
              onChange={({ target: { value } }) =>
                setFormData((data) => ({
                  ...data,
                  addReviewFlag: value,
                }))
              }
              customClassNames={{
                container: classes.inCardGap,
                label: classes.OptionsCardLabelWidth,
              }}
              keepErrorSpacing={false}
            >
              <option value={""}>
                {iln.gettext("Click to select option")}
              </option>
              <option value={true}>{iln.gettext("Yes")}</option>
              <option value={false}>{iln.gettext("No")}</option>
            </FormSelect>
            <FlagInput
              name="flags"
              value={formData.flags}
              onChange={({
                target: {
                  value: { chips },
                },
              }) => setFormData((data) => ({ ...data, flags: chips }))}
              customClassNames={{
                container: classes.inCardGap,
                label: classes.OptionsCardLabelWidth,
              }}
            />
          </>
        )}
      </Card>
      {error && <div>{error}</div>}
      <Card className={classes.card}>
        <h4>Case Details</h4>
        <FormSelect
          name="createCases"
          label={iln.gettext("Create Cases")}
          value={formData.createCases}
          onChange={({ target: { value } }) =>
            setFormData((data) => ({
              ...data,
              createCases: value,
            }))
          }
          customClassNames={{ container: classes.inCardGap }}
        >
          <option value={""}>{iln.gettext("Click to select option")}</option>
          <option value={true}>{iln.gettext("Yes")}</option>
          <option value={false}>{iln.gettext("No")}</option>
        </FormSelect>
        {formData.createCases == true && (
          <CaseDetailsForm
            caseDetails={formData.caseDetails}
            setCaseDetails={(newCaseDetails) =>
              setFormData((data) => ({
                ...data,
                caseDetails: { ...newCaseDetails },
              }))
            }
          />
        )}
      </Card>
      <FlexBox hAlign="space-between">
        <Button onClick={() => resetForm()}>{iln.gettext("Reset")}</Button>
        <Button
          onClick={() => {
            onConfirm();
          }}
          isDisabled={!valid}
        >
          {iln.gettext("Next")}
        </Button>
      </FlexBox>
    </div>
  );
}
ImportForm.propTypes = propTypes;
export default ImportForm;
