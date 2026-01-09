import {
  AutoComplete,
  Button,
  FlexBox,
  ModalContext,
  NotificationBox,
  Spinner,
  Step,
  Stepper,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import ComponentLoading from "../../ComponentLoading.jsx";
import ConfirmationModal from "../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import ConstituentOverview from "./ConstituentOverview/ConstituentOverview.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import theme from "@electedtech/theme";
import useGetConstituent from "./hooks/useGetConstituent.js";
import useGetMergeDetails from "./hooks/useGetMergeDetails.js";
import useMergeConstituents from "./hooks/useMergeConstituents.js";
import { useReduxSlice } from "../ViewConstituentPage.redux.js";
import { useStyles } from "./MergeConstituents.styles.js";

const MergeConstituents = () => {
  const classes = useStyles(theme);
  const iln = useContext(TranslationContext);
  const { constituent } = useReduxSlice();
  const getConstituent = useGetConstituent();

  const [selection, setSelection] = useState();
  const [precedence, setPrecedence] = useState();
  const [step, setStep] = useState(0);
  const [mergeDetails, setMergeDetails] = useState("");
  const [fetching, setFetching] = useState(false);

  const { modalActions } = useContext(ModalContext);

  const mergeConstituents = useMergeConstituents(
    constituent,
    selection,
    precedence,
    modalActions,
    setFetching
  );
  const getMergeDetails = useGetMergeDetails(
    constituent?.id,
    setMergeDetails,
    modalActions
  );

  useEffect(() => {
    getConstituent();

    // register a global func to reset state from php
    window.resetMergeConstituentState = () => {
      setStep(0);
      setPrecedence(0);
      setSelection();
    };

    // clean up global func when component unmounts
    return () => {
      delete window.resetMergeConstituentState;
    };
  }, []);

  if (!constituent) return <ComponentLoading />;

  return (
    <React.Fragment>
      <h2>
        {iln.gettext("Merge")} {iln.gettext("Constituents")}
      </h2>
      <Stepper step={step}>
        <Step>
          <div>
            <NotificationBox
              type="warn"
              alertMessage={iln.gettext(
                "%1 %2 will be deleted.",
                constituent.firstName,
                constituent.surname
              )}
            />
            <p>
              {iln.gettext(
                "Please select the profile into which to merge all current details."
              )}
            </p>
            <AutoComplete
              placeholder={iln.gettext("Search Constituents")}
              dataSource={(searchText, signal) =>
                api
                  .constituentsSearch(
                    {
                      term: searchText,
                      isOrganisation: constituent.isOrganisation,
                      exclude: constituent.id,
                      columnsToReturn: [
                        "id",
                        "title",
                        "firstName",
                        "middleName",
                        "surname",
                        "email",
                        "mobile",
                        "telephone",
                        "address1",
                        "address2",
                        "town",
                        "county",
                        "postcode",
                        "registeredAddress1",
                        "registeredAddress2",
                        "registeredTown",
                        "registeredState",
                        "registeredPostcode",
                        "dob",
                        "gender",
                      ],
                    },
                    modalActions,
                    iln,
                    signal
                  )
                  .then((constituents) =>
                    constituents.map((constituent) => {
                      return {
                        id: constituent.id,
                        name: `${
                          !constituent.isOrganisation
                            ? constituent.firstName + " " + constituent.surname
                            : constituent.organisation
                        } ${
                          constituent.address1 || constituent.registeredAddress1
                            ? " - "
                            : ""
                        }${
                          constituent.address1
                            ? constituent.address1 + " " + constituent.town
                            : constituent.registeredAddress1 +
                              " " +
                              constituent.registeredTown
                        } ${
                          constituent.postcode
                            ? constituent.postcode
                            : constituent.registeredPostcode
                        }`,
                        constituent,
                      };
                    })
                  )
              }
              onResultClick={(r) => {
                setStep(1);
                setSelection(r);
                getMergeDetails();
                setPrecedence(undefined);
              }}
              clearInputOnResultClick
              labelKey="name"
              customClassNames={{ container: classes.spacing }}
            />
          </div>
        </Step>
        <Step>
          {selection && (
            <div>
              <p>
                {iln.gettext(
                  "Please select which profile information you would like to take precedence."
                )}
              </p>
              <FlexBox className={classes.spacing} hAlign="space-between">
                <ConstituentOverview
                  constituent={constituent}
                  setPrecedence={setPrecedence}
                  precedence={precedence}
                />
                <ConstituentOverview
                  constituent={selection.constituent}
                  setPrecedence={setPrecedence}
                  precedence={precedence}
                />
              </FlexBox>

              <FlexBox hAlign="space-between">
                <Button
                  onClick={() => {
                    setSelection("");
                    setPrecedence("");
                    setStep(0);
                  }}
                >
                  {iln.gettext("Back")}
                </Button>
                <Button
                  onClick={() => {
                    setStep(2);
                  }}
                  isDisabled={!precedence}
                >
                  {iln.gettext("Merge constituents")}
                </Button>
              </FlexBox>
            </div>
          )}
        </Step>
        <Step>
          {mergeDetails && (
            <ConfirmationModal
              customClassNames={{ modal: classes.confirmationModal }}
              errorTextToDisplay={iln.gettext(
                "Input doesn't match the number of cases"
              )}
              message={
                <div>
                  <NotificationBox
                    type="alert"
                    alertMessage={iln.gettext("This cannot be undone.")}
                  />
                  <p>
                    {iln.ngettext(
                      "This constituent has %1 case ",
                      "This constituent has %1 cases ",
                      mergeDetails.cases
                    )}
                    {iln.ngettext(
                      "and %1 flag attached to it",
                      "and %1 flags attached to it",
                      mergeDetails.flags
                    )}
                  </p>
                  <p>
                    {iln.ngettext(
                      "Please confirm you wish to merge this constituent by typing the number of affected cases below"
                    )}
                  </p>
                </div>
              }
              buttonText={fetching ? <Spinner /> : iln.gettext("Confirm")}
              confirmationValue={mergeDetails.cases}
              onConfirm={() => {
                setFetching(true);
                mergeConstituents(
                  constituent.id,
                  selection.constituent.id,
                  precedence,
                  modalActions
                );
              }}
            />
          )}
        </Step>
      </Stepper>
    </React.Fragment>
  );
};

export default MergeConstituents;
