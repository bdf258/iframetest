import { useContext, useEffect } from "react";

import Body from "./components/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import React from "react";
import SliderMainContainer from "../common/SliderMainContainer.jsx";
import TranslationContext from "../../context/translation/TranslationContext.js";
import api from "@electedtech/api";
import filterCaseworkers from "../../helpers/filterCaseworkers.js";
import { sortCaseworkersAlphabetically } from "../CasesPage/helpers/sortCaseworkersAlphabetically.js";
import useGetItems from "./hooks/useGetItems.js";
import { useReduxSlice } from "./Page.redux.js";
import { useStyles } from "./styles.js";

const InboxPage = () => {
  useStyles();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const getItems = useGetItems();
  const {
    filters,
    setCaseworkers,
    setContactTypes,
    setOrganisationTypes,
    setConnectionTypes,
    setRoleTypes,
  } = useReduxSlice();

  useEffect(() => {
    api
      .getInboxes(modalActions, iln)
      .then((cw) =>
        setCaseworkers(sortCaseworkersAlphabetically(filterCaseworkers(cw)))
      )
      .catch(() => setCaseworkers([]));

    api
      .getContactList(modalActions, iln)
      .then((contactTypes) => setContactTypes(contactTypes))
      .catch(() => setContactTypes([]));

    api
      .getOrganisationTypes()
      .then((orgTypes) => setOrganisationTypes(orgTypes))
      .catch(() => setOrganisationTypes([]));

    api
      .getConnectionTypes()
      .then((connTypes) => setConnectionTypes(connTypes))
      .catch(() => setConnectionTypes([]));

    api
      .getRoleTypes()
      .then((roleTypes) => setRoleTypes(roleTypes))
      .catch(() => setRoleTypes([]));
  }, []);

  useEffect(() => {
    getItems();
  }, [filters]);

  return (
    <SliderMainContainer>
      <Header />
      <Body />
    </SliderMainContainer>
  );
};

export default InboxPage;
