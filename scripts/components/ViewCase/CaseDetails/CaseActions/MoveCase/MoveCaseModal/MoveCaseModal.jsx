import {
  AutoComplete,
  Button,
  FlexBox,
  ModalContext,
  Step,
  Stepper,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import ConfirmationModal from "../../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import OperationCompletedModal from "../../../../../common/Modal/OperationCompletedModal/OperationCompletedModal.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import prefixCaseID from "../../../../../../helpers/prefixCaseID";
import propTypes from "./propTypes";
import { useStyles } from "../styles";
import { useTheme } from "react-jss";

const constructNameAndAddress = ({
  firstName,
  surname,
  isOrganisation,
  organisation,
  address1,
  address2,
  town,
  county,
  postcode,
} = {}) => {
  const addressFields = [address1, address2, town, county, postcode].filter(
    (x) => x && x.trim() !== ""
  );

  return (
    <React.Fragment>
      {!isOrganisation
        ? `${firstName || ""} ${surname || ""}`
        : organisation || ""}
      {addressFields.length > 0 ? " - " : ""}
      {addressFields.join(", ")}
    </React.Fragment>
  );
};

const MoveCaseModal = ({
  modalID,
  caseID,
  constituentID,
  setCaseConstituent,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [step, setStep] = useState(0);
  const [isOrganisation, setIsOrganisation] = useState();
  const [selectedConstituent, setSelectedConstituent] = useState({
    name: "",
    id: -1,
  });
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const caseReference = prefixCaseID(caseID);
  const name = `${selectedConstituent.title || ""} ${
    selectedConstituent.firstName || ""
  } ${selectedConstituent.middleName || ""} ${
    selectedConstituent.surname || ""
  }`;

  return (
    <div className={classes.modal}>
      <Stepper step={step}>
        <Step>
          <FlexBox hAlign="space-around">
            <Button
              customClassNames={classes.selectButton}
              size="large"
              onClick={() => {
                setIsOrganisation(false);
                setStep(1);
              }}
            >
              {iln.gettext("To a Constituent")}
            </Button>
            <Button
              customClassNames={classes.selectButton}
              size="large"
              onClick={() => {
                setIsOrganisation(true);
                setStep(1);
              }}
            >
              {iln.gettext("To a Organisation")}
            </Button>
          </FlexBox>
        </Step>
        <Step>
          <div>
            {isOrganisation
              ? iln.gettext(
                  "Search for the Organisation you wish to reassign the case to below"
                )
              : iln.gettext(
                  "Search for the Constituent you wish to reassign the case to below"
                )}
            <br />
            <br />
            <AutoComplete
              customClassNames={{ container: classes.search }}
              placeholder={
                isOrganisation
                  ? iln.gettext("Enter Organisation name")
                  : iln.gettext("Enter Constituent name")
              }
              dataSource={(searchText, signal) =>
                api.constituentsSearch(
                  {
                    term: searchText,
                    isOrganisation,
                    columnsToReturn: [
                      "id",
                      "title",
                      "firstName",
                      "surname",
                      "address1",
                      "address2",
                      "town",
                      "county",
                      "postcode",
                      "isOrganisation",
                      "organisation",
                    ],
                  },
                  modalActions,
                  iln,
                  signal
                )
              }
              onResultClick={(result) => {
                setSelectedConstituent(result);
                setStep(2);
              }}
              resultsToExclude={[{ id: constituentID }]}
              constructDropDownItems={(result) =>
                constructNameAndAddress(result)
              }
            />
          </div>
        </Step>
        <Step>
          <ConfirmationModal
            confirmationValue={caseReference}
            modifyInputValues={(x) => x.toLowerCase()}
            buttonText={iln.gettext("Move")}
            message={
              <p>
                {iln.gettext("Please confirm if you would like to")}{" "}
                <strong>{iln.gettext("move")}</strong> {iln.gettext("case")}{" "}
                <strong>{caseReference}</strong> {iln.gettext("to")}{" "}
                <b>{name}</b>{" "}
                {iln.gettext("by typing the case reference below:")}
              </p>
            }
            onConfirm={() =>
              api
                .updateCase(caseID, { constituentID: selectedConstituent.id })
                .then(() => {
                  setCaseConstituent(selectedConstituent);
                  setStep(3);
                })
                .catch(() => setStep(4))
            }
            customClassNames={{ modal: classes.modal }}
          />
        </Step>
        <Step>
          <OperationCompletedModal
            message={iln.gettext(
              "Successfully moved case %1 to %2",
              caseReference,
              name
            )}
            handleDone={() => modalActions.removeById(modalID)}
          />
        </Step>
        <Step>
          <OperationCompletedModal
            message={iln.gettext(
              "Failed to moved case, please refresh the page and try again"
            )}
            handleDone={() => modalActions.removeById(modalID)}
          />
        </Step>
      </Stepper>
    </div>
  );
};

MoveCaseModal.propTypes = propTypes;

export default MoveCaseModal;
