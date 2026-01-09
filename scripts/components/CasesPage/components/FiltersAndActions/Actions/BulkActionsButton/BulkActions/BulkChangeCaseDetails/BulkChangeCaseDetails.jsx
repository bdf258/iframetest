import {
  Button,
  FlexBox,
  FormSelect,
  Indent,
  NotificationBox,
  Step,
  Stepper,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";
import {
  caseTypes,
  categoryTypes,
  contactTypes,
  customFields,
  statusTypes,
} from "../../../../../../../../helpers/localStorageHelper.js";

import ComponentLoading from "../../../../../../../ComponentLoading.jsx";
import ConfirmationModal from "../../../../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import OperationCompletedModal from "../../../../../../../common/Modal/OperationCompletedModal/OperationCompletedModal.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import filterCaseworkers from "../../../../../../../../helpers/filterCaseworkers.js";
import formatNumberForDisplay from "../helpers/formNumberForDisplay.js";
import propTypes from "./BulkChangeCaseDetails.propTypes.js";
import useCustomFieldCaseChangeModal from "./hooks/useCustomFieldCaseChangeModal";
import useStyles from "./BulkChangeCaseDetails.styles.js";
import { useTheme } from "react-jss";

const unchanged = {
  contactType: {
    id: "unchanged",
    contacttype: "Unchanged",
  },
  assignedTo: {
    id: "unchanged",
    name: "Unchanged",
    active: true,
  },
  caseType: {
    id: "unchanged",
    casetype: "Unchanged",
  },
  categoryType: {
    id: "unchanged",
    categorytype: "Unchanged",
  },
  status: {
    id: "unchanged",
    statustype: "Unchanged",
  },
};

const createChangesPayload = (changes) => {
  const payload = {
    contactType: changes.contactType.id,
    assignedToID: changes.assignedTo.id,
    caseTypeID: changes.caseType.id,
    categoryTypeID: changes.categoryType.id,
    statusID: changes.status.id,
  };

  return Object.keys(payload).reduce(
    (all, key) =>
      payload[key] === "unchanged" ? all : { ...all, [key]: payload[key] },
    {}
  );
};

const BulkChangeCaseDetails = ({
  refreshResults,
  state,
  onBackClick,
  closeModal,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const iln = useContext(TranslationContext);

  const [step, setStep] = useState(0);
  const [changes, setChanges] = useState(unchanged);

  const [affectedCases, setAffectedCases] = useState();
  const [loading, setLoading] = useState(false);

  const [openCustomFieldCaseChangeModal] = useCustomFieldCaseChangeModal();

  if (loading) return <ComponentLoading />;

  return (
    <Stepper step={step}>
      <Step>
        <div className={classes.innerModal}>
          <br />
          <FormSelect
            customClassNames={{ label: classes.label }}
            label={iln.gettext("Contact Type")}
            name="contactType"
            value={changes.contactType}
            onChange={({ target: { name, value } }) =>
              setChanges({ ...changes, [name]: value })
            }
            keepErrorSpacing={false}
          >
            {[unchanged.contactType, ...contactTypes].map((ct) => (
              <option key={ct.id} value={ct}>
                {ct.contacttype}
              </option>
            ))}
          </FormSelect>
          <br />
          <FormSelect
            customClassNames={{ label: classes.label }}
            name="assignedTo"
            label={iln.gettext("Assigned To")}
            value={changes.assignedTo}
            onChange={({ target: { name, value } }) =>
              setChanges({ ...changes, [name]: value })
            }
            keepErrorSpacing={false}
          >
            {filterCaseworkers([
              unchanged.assignedTo,
              ...state.caseworkers,
            ]).map((cw) => {
              return (
                <option value={cw} key={cw.id}>
                  {cw.name}
                </option>
              );
            })}
          </FormSelect>
          <br />
          <FormSelect
            customClassNames={{ label: classes.label }}
            name="caseType"
            label={iln.gettext("Type")}
            value={changes.caseType}
            onChange={({ target: { name, value } }) =>
              setChanges({ ...changes, [name]: value })
            }
            keepErrorSpacing={false}
          >
            {[unchanged.caseType, ...caseTypes].map((ct) => {
              return (
                <option value={ct} key={ct.id}>
                  {ct.casetype}
                </option>
              );
            })}
          </FormSelect>
          <br />
          <FormSelect
            name="categoryType"
            label={iln.gettext("Category")}
            value={changes.categoryType}
            onChange={({ target: { name, value } }) => {
              openCustomFieldCaseChangeModal({
                inputName: name,
                inputLabel: "category",
                currentValue: changes.categoryType,
                newValue: value,
                confirm: (confirmation) => {
                  if (confirmation) setChanges({ ...changes, [name]: value });
                },
              });
            }}
            customClassNames={{
              container: classes.spacing,
              label: classes.label,
            }}
            keepErrorSpacing={false}
          >
            {[unchanged.categoryType, ...categoryTypes].map((ct) => {
              return (
                <option value={ct} key={ct.id}>
                  {ct.categorytype}
                </option>
              );
            })}
          </FormSelect>
          <br />
          <FormSelect
            customClassNames={{ label: classes.label }}
            label={iln.gettext("Status")}
            value={changes.status}
            name="status"
            onChange={({ target: { name, value } }) => {
              openCustomFieldCaseChangeModal({
                inputName: name,
                inputLabel: "status",
                currentValue: changes.categoryType,
                newValue: value,
                confirm: (confirmation) => {
                  if (confirmation) setChanges({ ...changes, [name]: value });
                },
              });
            }}
          >
            {[unchanged.status, ...statusTypes].map((status) => {
              return (
                <option key={status.id} value={status}>
                  {status.statustype}
                </option>
              );
            })}
          </FormSelect>
          <br />
          <FlexBox className={classes.buttonRow} hAlign="space-between">
            <Button onClick={onBackClick}>{iln.gettext("Back")}</Button>
            <Button
              isDisabled={Object.values(changes).every(
                ({ id }) => id === "unchanged"
              )}
              onClick={() => setStep(1)}
            >
              {iln.gettext("Change")}
            </Button>
          </FlexBox>
        </div>
      </Step>

      <Step>
        <ConfirmationModal
          message={
            <React.Fragment>
              <NotificationBox
                type="warn"
                alertMessage={iln.gettext("This cannot be undone.")}
              />
              {customFields.length === 0 ||
                changes.status.id !== "unchanged" ||
                (changes.categoryType !== "unchanged" && (
                  <NotificationBox
                    type={"warn"}
                    alertMessage={`Changing the case status or category could result in data loss on custom fields`}
                  />
                ))}
              <p>
                {iln.ngettext(
                  "This will affect %1 case by changing the following details:",
                  "This will affect %1 cases by changing the following details:",
                  formatNumberForDisplay(state.results.totalResults)
                )}
              </p>
              <Indent left={20}>
                {changes.contactType.id !== "unchanged" && (
                  <div>
                    <b>{iln.gettext("Contact Type")}</b>{" "}
                    {iln.gettext(
                      "will change to %1",
                      changes.contactType.contacttype
                    )}
                  </div>
                )}
                {changes.assignedTo.id !== "unchanged" && (
                  <div>
                    <b>{iln.gettext("Assigned Caseworker")}</b>{" "}
                    {iln.gettext("will change to %1", changes.assignedTo.name)}
                  </div>
                )}
                {changes.caseType.id !== "unchanged" && (
                  <div>
                    <b>{iln.gettext("Case Type")}</b>{" "}
                    {iln.gettext(
                      "will change to %1",
                      changes.caseType.casetype
                    )}
                  </div>
                )}
                {changes.categoryType.id !== "unchanged" && (
                  <div>
                    <b>{iln.gettext("Category")}</b>{" "}
                    {iln.gettext(
                      "will change to %1",
                      changes.categoryType.categorytype
                    )}
                  </div>
                )}
                {changes.status.id !== "unchanged" && (
                  <div>
                    <b>{iln.gettext("Status")}</b>{" "}
                    {iln.gettext(
                      "will change to %1",
                      changes.status.statustype
                    )}
                  </div>
                )}
              </Indent>
              <p>
                {iln.gettext(
                  "Please confirm by typing the number of affected cases below"
                )}
              </p>
            </React.Fragment>
          }
          buttonText="Confirm"
          confirmationValue={formatNumberForDisplay(state.results.totalResults)}
          modifyInputValues={(value) => value.replaceAll(",", "")}
          onConfirm={() => {
            setLoading(true);
            api
              .bulkChangeCaseDetails({
                caseSearch: state.filters,
                ...createChangesPayload(changes),
              })
              .then(({ casesUpdated }) => {
                setAffectedCases(casesUpdated);
                refreshResults();
                setStep(2);
                setLoading(false);
              });
          }}
        />
      </Step>

      <Step>
        <OperationCompletedModal handleDone={closeModal}>
          <p className={classes.center}>
            {iln.ngettext(
              "Case details successfully updated on %1 case",
              "Case details successfully updates on %1 cases",
              formatNumberForDisplay(affectedCases)
            )}
          </p>
        </OperationCompletedModal>
      </Step>
    </Stepper>
  );
};

BulkChangeCaseDetails.propTypes = propTypes;

export default BulkChangeCaseDetails;
