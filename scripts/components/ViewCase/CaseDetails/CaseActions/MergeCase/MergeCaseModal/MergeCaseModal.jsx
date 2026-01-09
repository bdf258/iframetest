import {
  Button,
  FlexBox,
  FormSelect,
  ModalContext,
  Spinner,
  Switcher,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import ConfirmationModal from "../../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import Loading from "../../../../../ComponentLoading.jsx";
import OperationCompletedModal from "../../../../../common/Modal/OperationCompletedModal/OperationCompletedModal.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { caseTypes } from "../../../../../../helpers/localStorageHelper";
import prefixCaseID from "../../../../../../helpers/prefixCaseID";
import propTypes from "./propTypes";
import { useReduxSlice } from "./MergeCaseModal.redux.js";
import { useStyles } from "../styles";
import { useTheme } from "react-jss";

const getCaseType = (id) =>
  caseTypes.find((ct) => ct?.id === id)?.casetype || "Unknown";

const MergeCaseModal = ({ modalID, caseID, cases }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const { clearCasenotes } = useReduxSlice();

  const [step, setStep] = useState("select");
  const [mergeID, setMergeID] = useState("none");

  return (
    <div className={classes.modal}>
      {cases ? (
        <Switcher selected={step}>
          {{
            select: (
              <div>
                {iln.gettext("Which case do you want to merge with?")}
                <br />
                <br />
                <FormSelect
                  name="cases"
                  keepErrorSpacing={false}
                  value={mergeID}
                  onChange={(e) => setMergeID(e.target.value)}
                >
                  {[
                    <option key="-1" value="none">
                      &nbsp;
                    </option>,
                    ...cases.map((c, idx) => (
                      <option key={idx} value={c.id}>
                        {`${prefixCaseID(c.id)} - ${getCaseType(c.caseType)}`}
                      </option>
                    )),
                  ]}
                </FormSelect>
                <br />
                {iln.gettext(
                  "Please note this will move all casenotes, emails, and files from this case to the case you select above. This case will not be deleted automatically."
                )}
                <br />
                <br />
                <FlexBox hAlign="flex-end">
                  <Button
                    isDisabled={mergeID === "none"}
                    onClick={() => setStep("confirm")}
                  >
                    {iln.gettext("Merge")}
                  </Button>
                </FlexBox>
              </div>
            ),
            confirm: (
              <ConfirmationModal
                buttonText={iln.gettext("Merge")}
                confirmationValue={prefixCaseID(mergeID)}
                modifyInputValues={(x) => x.toLowerCase()}
                onConfirm={() => {
                  setStep("loading");
                  api
                    .mergeCase(caseID, mergeID)
                    .then(() => {
                      clearCasenotes();
                      setStep("success");
                    })
                    .catch(() => setStep("failure"));
                }}
                message={
                  <div>
                    {iln.gettext("Please confirm you would like to")}{" "}
                    <strong>{iln.gettext("merge")}</strong>{" "}
                    {iln.gettext("this case with")}{" "}
                    <strong>{prefixCaseID(mergeID)}</strong>{" "}
                    {iln.gettext("by typing the case reference below:")}
                    <br />
                    <br />
                  </div>
                }
              />
            ),
            loading: <Spinner />,
            success: (
              <OperationCompletedModal
                handleDone={() =>
                  window.location.replace(`viewcase.php?caseID=${mergeID}`)
                }
                message={iln.gettext(
                  "Successfully Merged case %1 with case %2",
                  prefixCaseID(caseID),
                  prefixCaseID(mergeID)
                )}
              />
            ),

            failure: (
              <OperationCompletedModal
                buttonText={iln.gettext("OK")}
                handleDone={() => modalActions.removeById(modalID)}
                message={iln.gettext(
                  "Merging case %1 with case %2 failed",
                  prefixCaseID(caseID),
                  prefixCaseID(mergeID)
                )}
              />
            ),
          }}
        </Switcher>
      ) : (
        <Loading />
      )}
    </div>
  );
};

MergeCaseModal.propTypes = propTypes;

export default MergeCaseModal;
