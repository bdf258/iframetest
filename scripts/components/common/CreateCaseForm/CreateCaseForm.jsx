import React, { useContext, useEffect, useState } from "react";
import {
  allowBehalfOf,
  allowRelatesTo,
} from "../../../consts/disabledFeatures.js";

import CaseCustomFieldsForDetailsBlockInputs from "../../CreateCase/CaseCustomFieldsForDetailsBlockInputs/CaseCustomFieldsForDetailsBlockInputs.jsx";
import CaseCustomFieldsForm from "../../CreateCase/CaseCustomFieldsForm/CaseCustomFieldsForm.jsx";
import CaseTypeSelect from "../CaseDetailInputs/CaseTypeSelect.jsx";
import CaseworkerSelect from "../CaseDetailInputs/CaseworkerSelect/CaseworkerSelect.jsx";
import CategorySelect from "../CaseDetailInputs/CategorySelect.jsx";
import ContactTypeSelect from "../CaseDetailInputs/ContactTypeSelect.jsx";
import { FormSelect } from "@electedtech/electedtech-ui";
import Placeholder from "./Placeholder";
import ReviewDatePicker from "../CaseDetailInputs/ReviewDatePicker.jsx";
import StatusSelect from "../CaseDetailInputs/StatusSelect.jsx";
import SummaryInput from "../CaseDetailInputs/SummaryInput.jsx";
import TagInput from "../CaseDetailInputs/TagInput.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import getConstituentConnections from "./helpers/getConstituentConnections.js";
import { handleCategoryChange } from "../../CreateCase/CaseCustomFieldsForm/util/handleCategoryChange.js";
import propTypes from "./CreateCaseForm.propTypes.js";
import useStyles from "./CreateCaseForm.styles.js";

const CreateCaseForm = ({
  caseDetails,
  setCaseDetails,
  includeAssignCreatorOption,
  caseworkers,
  constituentID,
}) => {
  const classes = useStyles();
  const [caseworkersOptions, setCaseworkersOptions] = useState(caseworkers);
  const [behalfs, setBehalfs] = useState([]);
  const [connections, setConnections] = useState();

  const iln = useContext(TranslationContext);

  const handleOnChange = ({ target: { name, value } }) =>
    setCaseDetails({ ...caseDetails, [name]: value });

  useEffect(() => {
    // if caseworkers passed in, no need to load caseworkers
    if (!caseworkers)
      api
        .getCaseworkers()
        .then((res) => setCaseworkersOptions(res))
        .catch(() => setCaseworkersOptions([]));

    if (constituentID)
      getConstituentConnections(constituentID, caseDetails).then(
        (connections) => setConnections(connections)
      );
    else setConnections([]);

    if (allowBehalfOf)
      api.getBehalfs().then((res) => {
        setBehalfs(res);
        if (res.length > 0) {
          handleOnChange({ target: { name: "behalfOf", value: res[0].id } });
        }
      });
  }, []);

  if (!caseworkersOptions || !connections)
    return (
      <Placeholder
        includeConnectionsPlaceholder={caseDetails.relatesTo !== undefined}
      />
    );

  return (
    <React.Fragment>
      <ContactTypeSelect
        keepErrorSpacing={false}
        label={iln.gettext("Contact Type")}
        name="contactType"
        onChange={handleOnChange}
        value={caseDetails.contactType}
        customClassNames={{
          container: classes.spacing,
          label: classes.label,
        }}
      />
      <CaseworkerSelect
        caseworkers={caseworkersOptions}
        keepErrorSpacing={false}
        label={iln.gettext("Assigned To")}
        name="assignedTo"
        onChange={handleOnChange}
        value={caseDetails.assignedTo}
        includeCreatorOption={includeAssignCreatorOption}
        customClassNames={{
          container: classes.spacing,
          label: classes.label,
        }}
      />
      <CategorySelect
        keepErrorSpacing={false}
        label={iln.gettext("Category")}
        name="category"
        onChange={(e) =>
          handleCategoryChange({
            newCategory: e.target.value,
            caseDetails,
            setCaseDetails,
          })
        }
        value={caseDetails.category}
        customClassNames={{
          container: classes.spacing,
          label: classes.label,
        }}
      />
      <CaseCustomFieldsForDetailsBlockInputs
        value={caseDetails?.customFields}
        onChange={(customField) =>
          handleOnChange({
            target: {
              value: { ...caseDetails?.customFields, ...customField },
              name: "customFields",
            },
          })
        }
        category={caseDetails?.category}
        customClassNames={{
          container: classes.containerSpacing,
          label: classes.label,
        }}
      />
      <CaseTypeSelect
        keepErrorSpacing={false}
        label={iln.gettext("Type")}
        name="caseType"
        onChange={handleOnChange}
        value={caseDetails.caseType}
        customClassNames={{
          container: classes.spacing,
          label: classes.label,
        }}
        selectedCategoryIDs={caseDetails.category}
      />
      <StatusSelect
        keepErrorSpacing={false}
        label={iln.gettext("Status")}
        name="status"
        onChange={handleOnChange}
        value={caseDetails.status}
        customClassNames={{
          container: classes.spacing,
          label: classes.label,
        }}
        selectedCategoryId={caseDetails?.category}
      />
      <TagInput
        keepErrorSpacing={false}
        label={iln.gettext("Tags")}
        name="tagged"
        onChange={({
          target: {
            name,
            value: { chips },
          },
        }) => handleOnChange({ target: { name, value: { chips, value: "" } } })}
        value={caseDetails.tagged}
        customClassNames={{
          container: classes.spacing,
          label: classes.label,
        }}
      />
      <ReviewDatePicker
        popperPlacement="top-end"
        keepErrorSpacing={false}
        label={iln.gettext("Review")}
        name="reviewDate"
        onChange={handleOnChange}
        value={caseDetails.reviewDate}
        customClassNames={{
          container: classes.containerSpacing,
          label: classes.label,
        }}
        placeholder="Click to assign"
      />
      {connections.length > 1 && allowRelatesTo && (
        <FormSelect
          keepErrorSpacing={false}
          label="Relates To"
          name="relatesTo"
          onChange={handleOnChange}
          value={caseDetails.relatesTo}
          customClassNames={{
            container: classes.containerSpacing,
            label: classes.label,
          }}
        >
          {connections.map((connection, idx) => (
            <option key={idx} value={connection.connectionConstituentID}>
              {connection.connectionName}
            </option>
          ))}
        </FormSelect>
      )}
      {behalfs.length > 1 && allowBehalfOf && (
        <FormSelect
          keepErrorSpacing={false}
          label="On Behalf Of"
          name="behalfOf"
          onChange={handleOnChange}
          value={caseDetails.behalfOf}
          customClassNames={{
            container: classes.containerSpacing,
            label: classes.label,
          }}
        >
          {behalfs.map((behalf, idx) => (
            <option key={idx} value={behalf.id}>
              {behalf.label}
            </option>
          ))}
        </FormSelect>
      )}
      <SummaryInput
        keepErrorSpacing={false}
        name="summary"
        label="Description"
        onChange={handleOnChange}
        value={caseDetails.summary}
        customClassNames={{
          container: classes.spacing,
          label: classes.label,
        }}
      />
      <CaseCustomFieldsForm
        onChange={(customField) =>
          handleOnChange({
            target: {
              value: { ...caseDetails?.customFields, ...customField },
              name: "customFields",
            },
          })
        }
        category={caseDetails?.category}
        status={caseDetails?.status}
        value={caseDetails?.customFields}
        customClassNames={{
          container: classes.containerSpacing,
          label: classes.label,
        }}
      />
    </React.Fragment>
  );
};

CreateCaseForm.propTypes = propTypes;

export default CreateCaseForm;
