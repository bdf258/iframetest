/*global $*/
import {
  Button,
  FlexBox,
  FormChipInput,
  ModalContext,
  NotificationBox,
  Spinner,
  Step,
  Stepper,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import ConfirmationModal from "../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import OperationCompletedModal from "../common/Modal/OperationCompletedModal/OperationCompletedModal.jsx";
import { TranslationContext } from "context/translate";
import { createUseStyles } from "react-jss";
import { flagListDedupe } from "../../helpers/flags";
import flagsAPI from "../../api/src/flags";

const useStyles = createUseStyles({
  input: {
    marginBottom: 0,
  },
});

const getFlags = (searchTerm, flagList) => {
  return flagsAPI.searchFlags({ term: searchTerm }).then((flags) => {
    return flagListDedupe(flags, flagList).map((flag) => ({
      label: flag.flag,
      id: flag.id,
      count: flag.count,
    }));
  });
};

function AddFlag() {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const [flagList, setFlagList] = useState([]);
  const [step, setStep] = useState(0);
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setFlagList(e.target.value.chips);
  };

  return (
    <div>
      <h2>{iln.gettext("Add Flag")}</h2>
      <Stepper step={step}>
        <Step>
          <FormChipInput
            addNewChips={true}
            label={iln.gettext("Flags to Add")}
            customClassNames={{ autoComplete: { input: classes.input } }}
            value={{ value: "", chips: flagList }}
            name={"searchFlags"}
            chipSource={(e) => getFlags(e, flagList)}
            onChange={(e) => handleOnChange(e)}
          />
          <FlexBox hAlign="flex-end">
            <Button
              onClick={() => setStep(step + 1)}
              isDisabled={flagList.length < 1}
              customClassNames={classes.button}
            >
              Add Flags
            </Button>
          </FlexBox>
        </Step>
        <Step>
          <div>
          {loading  ?  (<FlexBox hAlign={"center"}>{`Adding flag${flagList.length > 1 ? 's' :''} ...`}<Spinner></Spinner></FlexBox>) :<ConfirmationModal
            message={
              <div>
                <NotificationBox
                  type="alert"
                  alertMessage={iln.gettext(
                    `%1 flag(s) will be added.`,
                    flagList.length
                  )}
                />
                {iln.gettext(
                  "Please confirm you wish to add flags to the segment by entering the number of flags below"
                )}
                <br />
                <br />
              </div>
            }
            confirmationValue={flagList.length}
            modifyInputValues={(value) => value.replaceAll(",", "")}
            onConfirm={() => {
              setLoading(true);
              flagsAPI
                .flagsToSegment(
                  {
                    segmentID: window.editingSegment.ID,
                    flags: flagList,
                  },
                  modalActions
                )
                .then((results) => {
                  setResults(results);
                  setStep(step + 1);
                  setLoading(false);
                });
            }}
          />
          }
          </div>
        </Step>
        <Step>
          <OperationCompletedModal
            message={iln.ngettext(
              "%1 flag added",
              "%1 flags added",
              results?.flagsAdded
            )}
            handleDone={() => $("#useSegment").trigger("reveal:close")}
          />
        </Step>
      </Stepper>
    </div>
  );
}

export default AddFlag;
