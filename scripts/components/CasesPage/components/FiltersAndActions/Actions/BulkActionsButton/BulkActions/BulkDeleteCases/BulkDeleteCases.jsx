import { NotificationBox, Step, Stepper } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import ComponentLoading from "../../../../../../../ComponentLoading.jsx";
import ConfirmationModal from "../../../../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import DeleteCaselessConstituentsSelect from "./DeleteCaselessConstituentsSelect/DeleteCaselessConstituentsSelect.jsx";
import OperationCompletedModal from "../../../../../../../common/Modal/OperationCompletedModal/OperationCompletedModal.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import formatNumberForDisplay from "../helpers/formNumberForDisplay.js";
import { getUserIdentity } from "../../../../../../../../helpers/localStorageHelper.js";
import propTypes from "./BulkDeleteCases.propTypes.js";
import useStyles from "./BulkDeleteCases.styles.js";

const { name: userName, email: userEmail } = getUserIdentity();

const BulkDeleteCases = ({
  state,
  refreshResults,
  closeModal,
  onBackClick,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(0);
  const [deleteCaselessConstituents, setDeleteCaselessConstituents] =
    useState();
  const [affectedCases, setAffectedCases] = useState({});
  const [httpError, setHttpError] = useState();

  if (loading) return <ComponentLoading />;

  if (httpError)
    return (
      <OperationCompletedModal handleDone={closeModal}>
        <h1>{iln.gettext("Bulk case delete failed")}</h1>
        <p>
          {httpError.status}
          <br /> <br />
          {httpError.message}
        </p>
      </OperationCompletedModal>
    );

  return (
    <Stepper step={step}>
      <Step>
        <ConfirmationModal
          message={
            <React.Fragment>
              <NotificationBox
                type="alert"
                alertMessage={
                  <p>
                    {iln.gettext(
                      "This action cannot be undone or stopped, please confirm you are deleting the correct cases before continuing."
                    )}
                    <br />
                    <br />
                    {iln.gettext(
                      "Note: Recovering data from backups caused by building deletions will be chargeable work"
                    )}
                  </p>
                }
              />
              <p>
                {iln.gettext("Please confirm you wish to")}{" "}
                <strong className={classes.warningText}>
                  {iln.gettext("delete")}
                </strong>{" "}
                <strong>
                  {iln.ngettext(
                    "%1 case",
                    "%1 cases",
                    formatNumberForDisplay(state.results.totalResults)
                  )}
                </strong>{" "}
                {iln.gettext("by typing the number of affected cases below")}
              </p>
            </React.Fragment>
          }
          buttonText={iln.gettext("Next")}
          confirmationValue={state.results.totalResults}
          modifyInputValues={(value) => value.replaceAll(",", "")}
          onCancel={onBackClick}
          cancelButtonText={iln.gettext("Back")}
          onConfirm={() => setStep(step + 1)}
        />
      </Step>

      <Step>
        <DeleteCaselessConstituentsSelect
          value={deleteCaselessConstituents}
          setValue={setDeleteCaselessConstituents}
          onBackClick={() => setStep(step - 1)}
          onNextClick={() => setStep(step + 1)}
        />
      </Step>

      <Step>
        <ConfirmationModal
          message={
            <React.Fragment>
              <NotificationBox
                type="alert"
                alertMessage={iln.gettext(
                  "This action cannot be undone or stopped"
                )}
              />
              <p>
                {iln.gettext("You are bulk deleting")}{" "}
                <strong>
                  {iln.ngettext(
                    "%1 case",
                    "%1 cases",
                    formatNumberForDisplay(state.results.totalResults),
                    userEmail
                  )}
                </strong>
                {deleteCaselessConstituents && (
                  <span>
                    {" "}
                    {iln.gettext("and any")}{" "}
                    <strong>
                      {iln.gettext("constituents that have 0 cases")}
                    </strong>{" "}
                    {iln.gettext("following the case deletion")}
                  </span>
                )}
              </p>
              <p>
                {iln.gettext(
                  "This action will be recorded against your user account:"
                )}{" "}
                <br />
                <strong>
                  {userName} ({userEmail})
                </strong>
              </p>
              <p>
                {iln.gettext(
                  "Please enter your Caseworker login email address below to confirm"
                )}
              </p>
            </React.Fragment>
          }
          buttonText={iln.gettext("Confirm")}
          confirmationValue={userEmail}
          modifyInputValues={(value) => value.trim()}
          onCancel={() => setStep(step - 1)}
          cancelButtonText={iln.gettext("Back")}
          onConfirm={() => {
            setLoading(true);
            api
              .bulkDeleteCases({
                caseSearch: state.filters,
                deleteCaselessConstituents,
              })
              .then((deleted) => {
                setAffectedCases(deleted);
                refreshResults();
                setStep(step + 1);
              })
              .catch((e) => setHttpError(e))
              .finally(() => setLoading(false));
          }}
        />
      </Step>

      <Step>
        <OperationCompletedModal handleDone={closeModal}>
          {deleteCaselessConstituents && (
            <p>
              {iln.ngettext(
                "%1 constituent permanently deleted",
                "%1 constituents permanently deleted",
                affectedCases.constituentsDeleted
              )}
            </p>
          )}
          <p>
            {iln.ngettext(
              "%1 case marked to be permanently deleted. You will be notified when the operation has completed.",
              "%1 cases marked to be permanently deleted. You will be notified when the operation has completed.",
              affectedCases.casesForDeletion
            )}
          </p>
        </OperationCompletedModal>
      </Step>
    </Stepper>
  );
};

BulkDeleteCases.propTypes = propTypes;

export default BulkDeleteCases;
