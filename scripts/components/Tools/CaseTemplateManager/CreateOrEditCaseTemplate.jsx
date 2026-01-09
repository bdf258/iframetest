import {
  Button,
  FlexBox,
  FormTextInput,
  ModalContext,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";

import CaseDetailsForm from "../../common/CreateCaseForm/CreateCaseForm.jsx";
import Loading from "../../ComponentLoading.jsx";
import PermissionsChipInput from "../../common/PermissionsChipInput/PermissionsChipInput.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import initCaseDetails from "../../../consts/initCaseDetails.js";
import { initialCustomFieldValues } from "./util/initialCustomFieldValues";
import propTypes from "prop-types";

const useStyles = createUseStyles({
  modal: { width: ({ theme }) => theme.modal.width.medium },
  spacing: {
    marginBottom: ({ theme }) => theme.spacing,
    margin: { left: 0, right: 0 },
  },
  label: {
    width: 150,
    maxWidth: 150,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

const adminUserID = 1;

const isNotInteger = (value) => !Number.isInteger(value);

const createTemplate = (
  name,
  restrictions,
  caseDetails,
  templates,
  modalActions,
  setTemplates
) => {
  api
    .createCaseTemplate(
      {
        name: name.trim(),
        restrictions: restrictions,
        template: caseDetails,
      },
      modalActions
    )
    .then((response) => {
      const newTemplate = {
        created: response.created,
        createdBy: response.createdBy,
        id: response.id,
        name: response.name,
        updated: response.updated,
        updatedBy: response.updatedBy,
        restrictions: response.restrictions,
      };
      setTemplates([...templates, newTemplate]);
      modalActions.reset();
    });
};

const updateTemplate = async (
  templateID,
  name,
  restrictions,
  caseDetails,
  templates,
  modalActions,
  setTemplates
) => {
  api
    .updateCaseTemplate(
      templateID,
      {
        name: name.trim(),
        template: caseDetails,
        restrictions: restrictions,
      },
      modalActions
    )
    .then((response) => {
      const newTemplate = {
        created: response.created,
        createdBy: response.createdBy,
        id: response.id,
        name: response.name,
        updated: response.updated,
        updatedBy: response.updatedBy,
        restrictions: response.restrictions,
      };
      const indexToUpdate = templates.findIndex((t) => t.id === templateID);
      const updatedTemplates = templates;
      updatedTemplates[indexToUpdate] = newTemplate;

      setTemplates(updatedTemplates);
      modalActions.reset();
    });
};

// if templateID is undefined, creating a new template with defaults
// else editing an existing template with it's exisitng details
const CreateOrEditCaseTemplate = ({
  setTemplates,
  templateID,
  templates,
  permissionSystem,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const { modalActions } = useContext(ModalContext);
  const [caseDetails, setCaseDetails] = useState();
  const [name, setName] = useState();
  const [restrictions, setRestrictions] = useState();
  const iln = useContext(TranslationContext);

  useEffect(() => {
    if (templateID) {
      api
        .getCaseTemplate(templateID)
        .then(({ template, name, restrictions }) => {
          const customFields = initialCustomFieldValues(
            template?.customFields,
            template?.category,
            template?.status
          );

          setCaseDetails({ ...template, customFields });
          setName(name);
          setRestrictions(restrictions);
        });
    } else {
      const customFields = initialCustomFieldValues(
        initCaseDetails?.customFields,
        initCaseDetails?.category,
        initCaseDetails?.status
      );
      setCaseDetails({ ...initCaseDetails, customFields });
      setName("");
    }
  }, []);

  if (!name && !caseDetails) return <Loading />;

  return (
    <div className={classes.modal}>
      <div>
        <FormTextInput
          label={iln.gettext("Name")}
          name="name"
          keepErrorSpacing={false}
          onChange={(e) => setName(e.target.value)}
          value={name}
          customClassNames={{
            container: classes.spacing,
            label: classes.label,
          }}
        />
        {false && permissionSystem !== "transparent" && (
          <PermissionsChipInput
            value={restrictions}
            onChange={({ target: { value } }) => setRestrictions(value)}
            customClassNames={{
              container: classes.spacing,
            }}
          />
        )}
        <CaseDetailsForm
          includeAssignCreatorOption
          caseDetails={caseDetails}
          setCaseDetails={setCaseDetails}
        />
      </div>
      <FlexBox hAlign="flex-end">
        <div>
          <Button
            onClick={() => {
              templateID
                ? updateTemplate(
                    templateID,
                    name,
                    restrictions,
                    caseDetails,
                    templates,
                    modalActions,
                    setTemplates
                  )
                : createTemplate(
                    name,
                    restrictions,
                    caseDetails,
                    templates,
                    modalActions,
                    setTemplates
                  );
            }}
            isDisabled={
              name === "" ||
              caseDetails.assignedTo === adminUserID ||
              isNotInteger(caseDetails.contactType) ||
              (!caseDetails.assignedTo && caseDetails.assignedTo !== 0) ||
              isNotInteger(caseDetails.caseType) ||
              isNotInteger(caseDetails.category) ||
              isNotInteger(caseDetails.status)
            }
          >
            {templateID ? iln.gettext("Update") : iln.gettext("Create")}
          </Button>
        </div>
      </FlexBox>
    </div>
  );
};

CreateOrEditCaseTemplate.propTypes = {
  permissionSystem: propTypes.string,
  setTemplates: propTypes.func.isRequired,
  templateID: propTypes.oneOfType([propTypes.string, propTypes.number]),
  templates: propTypes.arrayOf(
    propTypes.shape({
      created: propTypes.string,
      createdBy: propTypes.number,
      id: propTypes.number,
      name: propTypes.string,
      updated: propTypes.string,
      updatedBy: propTypes.number,
    })
  ).isRequired,
};

export default CreateOrEditCaseTemplate;
