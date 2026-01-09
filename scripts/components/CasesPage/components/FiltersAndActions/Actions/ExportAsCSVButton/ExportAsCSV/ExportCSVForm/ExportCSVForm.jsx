import {
  Button,
  FlexBox,
  FormCheckbox,
  FormSelect,
  FormTextInput,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";
import {
  getCustomFields,
  getDisabledFeatures,
  setExportCsvFields as updateLocalStorage,
} from "../../../../../../../../helpers/localStorageHelper.js";

import CustomFieldsExportCSVForm from "./CustomFieldsExportCSVForm/CustomFieldsExportCSVForm.jsx";
import { TranslationContext } from "context/translate";
import combinedNameOptions from "../consts/combinedNameOptions.js";
import propTypes from "./ExportCSVForm.propTypes.js";
import useStyles from "./ExportCSVForm.styles.js";

const customFields = getCustomFields() || [];
const usePhysicalAddress = !(getDisabledFeatures() || []).includes(
  "Physical Address"
);

const ExportCSVForm = ({ options, setOptions, state }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const onChange = ({ target: { name, value } }) => {
    const newValue = name === "exportName" ? value || "" : value;
    const newOptions = { ...options, [name]: newValue };

    setOptions(newOptions);
    updateLocalStorage({ ...newOptions, exportName: "" });
  };

  const {
    filters: { categorytypeID },
  } = state;

  return (
    <div className={classes.formContainer}>
      <FlexBox hAlign={"right"}>
        <Button
          onClick={() => {
            setOptions({
              combinedNameFormat: combinedNameOptions[0].value,
              exportName: options.exportName,
            });
          }}
          type={"text"}
        >
          {iln.gettext("Clear All")}
        </Button>
      </FlexBox>
      <FormTextInput
        keepErrorSpacing={false}
        label={iln.gettext("Export Name")}
        name="exportName"
        value={options.exportName || ""}
        onChange={onChange}
        customClassNames={{ container: classes.exportInput }}
      />
      <div className={classes.formSection}>
        <h3 className={classes.formSectionHeading}>{iln.gettext("Case")}</h3>
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
            container: classes.container,
          }}
          label={iln.gettext("Case Ref. No.")}
          name="caseRefNo"
          value={options.caseRefNo}
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
            container: classes.container,
          }}
          label={iln.gettext("Opened On")}
          name="openedOn"
          value={options.openedOn}
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
            container: classes.container,
          }}
          label={iln.gettext("Closed On")}
          name="closedOn"
          value={options.closedOn}
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
            container: classes.container,
          }}
          label={iln.gettext("Last Actioned")}
          name="lastActioned"
          value={options.lastActioned}
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
            container: classes.container,
          }}
          label={iln.gettext("Created By")}
          name="createdBy"
          value={options.createdBy}
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
            container: classes.container,
          }}
          label={iln.gettext("Assigned To")}
          name="assignedTo"
          value={options.assignedTo}
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
            container: classes.container,
          }}
          label={iln.gettext("Review On")}
          name="reviewOn"
          value={options.reviewOn}
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
            container: classes.container,
          }}
          label={iln.gettext("Relates To")}
          name="relatesTo"
          value={options.relatesTo}
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
            container: classes.container,
          }}
          label={iln.gettext("Contact Type")}
          name="contactType"
          value={options.contactType}
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
            container: classes.container,
          }}
          label={iln.gettext("Case Type")}
          name="caseType"
          value={options.caseType}
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
            container: classes.container,
          }}
          value={options.status}
          label={iln.gettext("Status")}
          name="status"
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
            container: classes.container,
          }}
          value={options.category}
          label={iln.gettext("Category")}
          name="category"
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
            container: classes.container,
          }}
          label={iln.gettext("Tags")}
          name="tags"
          value={options.tags}
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <div>
          <FormCheckbox
            size="small"
            customClassNames={{
              label: classes.label,
              input: classes.input,
            }}
            label={iln.gettext("Description")}
            name="summary"
            value={options.summary}
            keepErrorSpacing={false}
            onChange={onChange}
          />
          <FormCheckbox
            size="small"
            customClassNames={{
              label: classes.label,
              input: classes.input,
            }}
            label={iln.gettext("Full Description")}
            name="summaryFull"
            value={options.summaryFull}
            keepErrorSpacing={false}
            onChange={onChange}
          />
        </div>
      </div>
      <div className={classes.formSection}>
        <h3 className={classes.formSectionHeading}>
          {iln.gettext("Custom Fields")}
        </h3>
        <div>
          {customFields.length > 0 && (
            <div className={classes.formSection}>
              <CustomFieldsExportCSVForm
                caseCategory={categorytypeID}
                value={options.customFields}
                onChange={({ target: { name, value } }) => {
                  setOptions({
                    ...options,
                    customFields: { ...options.customFields, [name]: value },
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className={classes.formSection}>
        <h3 className={classes.formSectionHeading}>
          {iln.gettext("Constituent")}
        </h3>
        <div>
          <FormCheckbox
            size="small"
            customClassNames={{
              label: classes.label,
              input: classes.input,
            }}
            label={iln.gettext("Title")}
            name="title"
            value={options.title}
            keepErrorSpacing={false}
            onChange={onChange}
          />
          <FormCheckbox
            size="small"
            customClassNames={{
              label: classes.label,
              input: classes.input,
            }}
            label={iln.gettext("First Name")}
            name="firstname"
            value={options.firstname}
            keepErrorSpacing={false}
            onChange={onChange}
          />
          <FormCheckbox
            size="small"
            customClassNames={{
              label: classes.label,
              input: classes.input,
            }}
            label={iln.gettext("Surname")}
            name="surname"
            value={options.surname}
            keepErrorSpacing={false}
            onChange={onChange}
          />
          <FormCheckbox
            size="small"
            customClassNames={{
              label: classes.label,
              input: classes.input,
            }}
            label={iln.gettext("Known As")}
            name="knownAs"
            value={options.knownAs}
            keepErrorSpacing={false}
            onChange={onChange}
          />
          <FormCheckbox
            size="small"
            customClassNames={{
              label: classes.label,
              input: classes.input,
            }}
            label={iln.gettext("Post Nominal")}
            name="postNominal"
            value={options.postNominal}
            keepErrorSpacing={false}
            onChange={onChange}
          />
          <FormCheckbox
            size={"small"}
            customClassNames={{
              label: classes.label,
              input: classes.input,
            }}
            label={iln.gettext("Gender")}
            name="gender"
            keepErrorSpacing={false}
            onChange={onChange}
            value={options.gender}
          />
          <FormCheckbox
            size={"small"}
            customClassNames={{
              label: classes.label,
              input: classes.input,
            }}
            label={iln.gettext("Date of birth")}
            name="dob"
            keepErrorSpacing={false}
            onChange={onChange}
            value={options.dob}
          />
        </div>
        <div>
          <FormCheckbox
            size="small"
            customClassNames={{
              label: classes.label,
              input: classes.input,
            }}
            value={options.constituentEmail}
            label={iln.gettext("Constituent Email")}
            name="constituentEmail"
            keepErrorSpacing={false}
            onChange={onChange}
          />
          <FormCheckbox
            size="small"
            customClassNames={{
              label: classes.label,
              input: classes.input,
            }}
            label={iln.gettext("Constituent Telephone")}
            name="constituentTelephone"
            value={options.constituentTelephone}
            keepErrorSpacing={false}
            onChange={onChange}
          />
          <FormCheckbox
            size="small"
            customClassNames={{
              label: classes.label,
              input: classes.input,
            }}
            value={options.constituentMobile}
            label={iln.gettext("Constituent Mobile")}
            name="constituentMobile"
            keepErrorSpacing={false}
            onChange={onChange}
          />
        </div>
      </div>

      <div className={classes.formSection}>
        <h3 className={classes.formSectionHeading}>
          {iln.gettext("Organisations")}
        </h3>
        <div>
          <FormCheckbox
            size="small"
            customClassNames={{
              label: classes.label,
              input: classes.input,
            }}
            label={iln.gettext("Organisation Name")}
            name="organisationName"
            value={options.organisationName}
            keepErrorSpacing={false}
            onChange={onChange}
          />
          <FormCheckbox
            size="small"
            customClassNames={{
              label: classes.label,
              input: classes.input,
            }}
            label={iln.gettext("Organisation Type")}
            name="organisationType"
            value={options.organisationType}
            keepErrorSpacing={false}
            onChange={onChange}
          />
        </div>
      </div>

      <div className={classes.formSection}>
        <h3 className={classes.formSectionHeading}>
          {iln.gettext("Name Format")}
        </h3>
        <div>
          <div className={classes.combinedNameSection}>
            <FormCheckbox
              size="small"
              customClassNames={{
                label: classes.label,
                input: classes.input,
              }}
              label={iln.gettext("Combined Name")}
              name="showCombinedName"
              value={options.showCombinedName}
              keepErrorSpacing={false}
              onChange={onChange}
            />
            {options.showCombinedName && (
              <div>
                <FormSelect
                  name="combinedNameFormat"
                  value={options.combinedNameFormat}
                  onChange={onChange}
                  label={iln.gettext("Name Format")}
                  customClassNames={{ container: classes.noMargin }}
                  keepErrorSpacing={false}
                >
                  {combinedNameOptions.map(({ value, text }) => (
                    <option key={value} value={value}>
                      {text}
                    </option>
                  ))}
                </FormSelect>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={classes.formSection}>
        <h3 className={classes.formSectionHeading}>{iln.gettext("Address")}</h3>

        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
          }}
          label={iln.gettext("Postal Address Line")}
          name="postalAddressLine"
          value={options.postalAddressLine}
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
          }}
          label={iln.gettext("Postal Address 1")}
          name="postalAddress1"
          value={options.postalAddress1}
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
          }}
          label={iln.gettext("Postal Address 2")}
          name="postalAddress2"
          value={options.postalAddress2}
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
          }}
          label={iln.gettext("Postal Town")}
          name="postalTown"
          value={options.postalTown}
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
          }}
          label={iln.gettext("Postal County")}
          name="postalCounty"
          value={options.postalCounty}
          keepErrorSpacing={false}
          onChange={onChange}
        />
        <FormCheckbox
          size="small"
          customClassNames={{
            label: classes.label,
            input: classes.input,
          }}
          label={iln.gettext("Postal Postcode")}
          name="postalPostCode"
          value={options.postalPostCode}
          keepErrorSpacing={false}
          onChange={onChange}
        />
        {usePhysicalAddress && (
          <React.Fragment>
            <FormCheckbox
              size="small"
              customClassNames={{
                label: classes.label,
                input: classes.input,
              }}
              label={iln.gettext("Physical Address Line")}
              value={options.registeredAddressLine}
              name="registeredAddressLine"
              keepErrorSpacing={false}
              onChange={onChange}
            />
            <FormCheckbox
              size="small"
              customClassNames={{
                label: classes.label,
                input: classes.input,
              }}
              label={iln.gettext("Physical Address 1")}
              name="registeredAddress1"
              value={options.registeredAddress1}
              keepErrorSpacing={false}
              onChange={onChange}
            />
            <FormCheckbox
              size="small"
              customClassNames={{
                label: classes.label,
                input: classes.input,
              }}
              label={iln.gettext("Physical Address 2")}
              name="registeredAddress2"
              value={options.registeredAddress2}
              keepErrorSpacing={false}
              onChange={onChange}
            />
            <FormCheckbox
              size="small"
              customClassNames={{
                label: classes.label,
                input: classes.input,
              }}
              label={iln.gettext("Physical Suburb")}
              name="registeredSuburb"
              value={options.registeredSuburb}
              keepErrorSpacing={false}
              onChange={onChange}
            />
            <FormCheckbox
              size="small"
              customClassNames={{
                label: classes.label,
                input: classes.input,
              }}
              label={iln.gettext("Physical State")}
              name="registeredState"
              value={options.registeredState}
              keepErrorSpacing={false}
              onChange={onChange}
            />
            <FormCheckbox
              size="small"
              customClassNames={{
                label: classes.label,
                input: classes.input,
              }}
              label={iln.gettext("Physical Postcode")}
              name="registeredPostcode"
              value={options.registeredPostcode}
              keepErrorSpacing={false}
              onChange={onChange}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

ExportCSVForm.propTypes = propTypes;

export default ExportCSVForm;
