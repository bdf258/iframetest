import {
  ModalContext,
  SliderContext,
  Switcher,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import AssignConstituent from "./AssignConstituent/AssignConstituent.jsx";
import ChangeCase from "./ChangeCase";
import ChooseCase from "./Choosecase/index.js";
import ChooseConstituent from "./ChooseConstituent/ChooseConstituent.jsx";
import CreateCaseFromInbox from "./CreateCaseFromInbox/index.js";
import CreateConstituentOrOrg from "./CreateConstituentOrOrg/index.js";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import getNameAndAddressFromEmail from "../../../../../../helpers/getNameAndAddressFromEmail.js";
import propTypes from "./AssignConstituentAndCase.propTypes.js";
import swapEmailToAndFromIfRequired from "../../../../../../helpers/swapEmailToAndFromIfRequired.js";
import useAssignState from "./hooks/useAssignState.js";
import useOpenAddContactDetailToConstituent from "./hooks/useOpenAddContactDetailToConstituent.jsx";
import { useReduxSlice } from "./AssignConstituentAndCase.redux";

const caseSearchCriteria = {
  pageNo: 1,
  resultsPerPage: "9999",
  statusID: [],
  casetypeID: [],
  categorytypeID: [],
  assignedToID: [],
  return: "columns",
  columnsToReturn: {
    case: ["id", "caseType", "tagged"],
    constituent: [],
  },
  orderBy: "caseID",
  orderByDirection: "DESC",
};

const AssignConstituentAndCase = ({
  constituent: _constituent = {},
  caseID,
  item,
}) => {
  item = swapEmailToAndFromIfRequired(item);

  const { modalActions } = useContext(ModalContext);
  const { sliderActions } = useContext(SliderContext);
  const iln = useContext(TranslationContext);
  const {
    firstName: emailFirstName,
    surname: emailSurname,
    email,
  } = getNameAndAddressFromEmail(item.from, item.to);
  const isSMS = ["sms-inbound", "whatsapp-inbound"].includes(
    item.type.toLowerCase()
  );

  const { updateItem, focusedItem } = useReduxSlice();

  const checkAddConstituentDetails =
    useOpenAddContactDetailToConstituent(focusedItem);

  const initialState = {
    view: _constituent.id ? "changeCase" : "assignConstituent",
    caseID,
    constituent: {
      ..._constituent,
      firstName: _constituent.firstName || emailFirstName,
      surname: _constituent.surname || emailSurname,
    },    
  };

  const [{ view, previousView, constituent }, dispatch] =
    useAssignState(initialState);

  const handleOnClickCreateConstituent = () => {
    dispatch({ type: "SET_VIEW", payload: "createConstituent" });
  };

  const handleOnClickCreateOrganisation = () => {
    dispatch({ type: "SET_VIEW", payload: "createOrganisation" });
  };

  const handleOnClickChooseConstituent = () => {
    dispatch({ type: "SET_VIEW", payload: "chooseConstituent" });
  };

  const handleOnClickCreateCase = () => {
    dispatch({ type: "SET_VIEW", payload: "createCase" });
  };

  const onCaseSelect = ({ caseID }) => {
    api
      .updateEmail({ emailID: focusedItem.id, caseID }, modalActions, iln)
      .then(() => {
        updateItem({ ...focusedItem, caseID });
        sliderActions.close();
      });
  };

  const onConstituentSelect = async (selectedConstituent) => {
    checkAddConstituentDetails(selectedConstituent);

    const { cases } = await api.searchCases(
      {
        ...caseSearchCriteria,
        constituentCriteria: { id: [selectedConstituent.id] },
      },
      modalActions,
      iln
    );

    selectedConstituent.cases = cases;
    selectedConstituent.hasCases = cases?.length > 0;

    dispatch({
      type: "SET_CONSTITUENT_ID",
      payload: selectedConstituent.id,
    });
    dispatch({
      type: "SET_CONSTITUENT_DETAILS",
      payload: selectedConstituent,
    });
    dispatch({
      type: "SET_VIEW",
      payload: selectedConstituent?.hasCases ? "changeCase" : "createCase",
    });
  };

  const onElectoralRollSelect = (selectedRollEntry) => {
    dispatch({
      type: "SET_CONSTITUENT_ID",
      payload: undefined,
    });
    dispatch({
      type: "SET_CONSTITUENT_DETAILS",
      payload: selectedRollEntry,
    });
    dispatch({
      type: "SET_VIEW",
      payload: "createConstituent",
    });
  };

  return (
    <Switcher selected={view}>
      {{
        assignConstituent: (
          <AssignConstituent
            onCaseSelect={onCaseSelect}
            onConstituentSelect={onConstituentSelect}
            onElectoralRollSelect={onElectoralRollSelect}
            onClickCreateConstituent={handleOnClickCreateConstituent}
            onClickCreateOrganisation={handleOnClickCreateOrganisation}
            onClickSearchAllConstituents={() =>
              dispatch({
                type: "SET_VIEW",
                payload: "chooseConstituent",
              })
            }
            emailID={item.id}
          />
        ),
        changeCase: view === "changeCase" && (
          <ChangeCase
            constituent={constituent}
            previousConstituent={_constituent}
            caseID={caseID}
            emailID={item.id}
            onClickCreateCase={handleOnClickCreateCase}
            onClickCreateConstituent={handleOnClickCreateConstituent}
            onClickCreateOrganisation={handleOnClickCreateOrganisation}
            onClickChooseConstituent={handleOnClickChooseConstituent}
          />
        ),
        chooseCase: view === "chooseCase" && (
          <ChooseCase
            item={item}
            constituent={constituent}
            onClickCreateCase={handleOnClickCreateCase}
            onClickCreateConstituent={handleOnClickCreateConstituent}
            onClickCreateOrganisation={handleOnClickCreateOrganisation}
            onClickChooseConstituent={handleOnClickChooseConstituent}
          />
        ),
        createCase: view === "createCase" && (
          <CreateCaseFromInbox
            constituent={constituent}
            emailID={item.id}
            onClickBack={() => 
              dispatch({
                type: "SET_VIEW",
                payload: previousView !== "assignConstituent" ? previousView : "chooseConstituent",
              })
            }
          />
        ),
        createConstituent: view === "createConstituent" && (
          <CreateConstituentOrOrg
            toggleView={() =>
              dispatch({
                type: "SET_VIEW",
                payload: "createOrganisation",
              })
            }
            createAsOrg={false}
            constituentDetails={constituent}
            inititalValues={{
              firstName: emailFirstName,
              surname: emailSurname,
              email: isSMS
                ? []
                : [{ id: "temp-0", value: email, primary: true }],
              mobile: isSMS
                ? [{ id: "temp-0", value: email, primary: true }]
                : [],
            }}
            onClickBack={() => {
              dispatch({
                type: "SET_CONSTITUENT_ID",
                payload: _constituent.id,
              });
              dispatch({
                type: "SET_CONSTITUENT_DETAILS",
                payload: _constituent,
              });
              dispatch({
                type: "SET_VIEW",
                payload: previousView,
              });
            }}
            onClickNext={(details, newConstituentID) => {
              dispatch({
                type: "SET_CONSTITUENT_ID",
                payload: newConstituentID,
              });
              dispatch({
                type: "SET_CONSTITUENT_DETAILS",
                payload: details,
              });
              dispatch({
                type: "SET_VIEW",
                payload: "createCase",
              });
            }}
          />
        ),
        createOrganisation: view === "createOrganisation" && (
          <CreateConstituentOrOrg
            toggleView={() =>
              dispatch({
                type: "SET_VIEW",
                payload: "createConstituent",
              })
            }
            createAsOrg={true}
            inititalValues={{
              firstName: emailFirstName,
              surname: emailSurname,
              email: isSMS
                ? []
                : [{ id: "temp-0", value: email, primary: true }],
              mobile: isSMS
                ? [{ id: "temp-0", value: email, primary: true }]
                : [],
            }}
            onClickBack={() => {
              dispatch({
                type: "SET_CONSTITUENT_ID",
                payload: _constituent.id,
              });
              dispatch({
                type: "SET_CONSTITUENT_DETAILS",
                payload: _constituent,
              });
              dispatch({
                type: "SET_VIEW",
                payload: previousView,
              });
            }}
            onClickNext={(details, newConstituentID) => {
              dispatch({
                type: "SET_CONSTITUENT_ID",
                payload: newConstituentID,
              });
              dispatch({
                type: "SET_CONSTITUENT_DETAILS",
                payload: details,
              });
              dispatch({
                type: "SET_VIEW",
                payload: "createCase",
              });
            }}
          />
        ),
        chooseConstituent: (
          <ChooseConstituent
            onClickBack={() =>
              dispatch({
                type: "SET_VIEW",
                payload: previousView,
              })
            }
            onClickCreateConstituent={handleOnClickCreateConstituent}
            onClickCreateOrganisation={handleOnClickCreateOrganisation}
            onCaseSelect={onCaseSelect}
            onConstituentSelect={onConstituentSelect}
            onElectoralRollSelect={onElectoralRollSelect}
          />
        ),
      }}
    </Switcher>
  );
};

AssignConstituentAndCase.propTypes = propTypes;

export default AssignConstituentAndCase;
