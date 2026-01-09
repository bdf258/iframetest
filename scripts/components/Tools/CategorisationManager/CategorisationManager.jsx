import React, { useContext, useEffect } from "react";

import CategorisationTable from "./components/CategorisationTable";
import ComponentLoading from "../../ComponentLoading.jsx";
import CreateButton from "./components/CreateButton";
import ErrorPage from "../../common/ErrorPage.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { getUserIdentity } from "../../../helpers/localStorageHelper.js";
import useCategorisationState from "./hooks/useCategorisationState";

const { isAdmin } = getUserIdentity() || {};

const CategorisationManager = () => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const [state, dispatch] = useCategorisationState();

  useEffect(() => {
    if (isAdmin)
      Promise.allSettled([
        api
          .getCategoryTypes(modalActions, iln)
          .then(({ data: categorytypes }) => categorytypes),
        api
          .getStatusTypes(modalActions, iln)
          .then(({ data: statustypes }) => statustypes),
        api
          .getCaseTypes(modalActions, iln)
          .then(({ data: casetypes }) => casetypes),
      ]).then(
        ([
          { value: categorytypes = [] },
          { value: statustypes = [] },
          { value: casetypes = [] },
        ]) => {
          dispatch({
            type: "SET_CATEGORY_TYPES",
            payload: categorytypes,
          });
          dispatch({
            type: "SET_CASE_TYPES",
            payload: casetypes,
          });
          dispatch({
            type: "SET_STATUS_TYPES",
            payload: statustypes,
          });
        }
      );
  }, []);

  if (!isAdmin) {
    return (
      <ErrorPage
        statusCode="403"
        message={iln.gettext("You must be an admin to access this page")}
        subtitle={iln.gettext("Forbidden")}
      />
    );
  }

  if (!state.categorytypes || !state.casetypes || !state.statustypes)
    return <ComponentLoading />;

  return (
    <main>
      <h1>{iln.gettext("Categorisation Manager")}</h1>
      <section>
        <p>
          {iln.gettext("Click an existing Category below to edit, or click")}{" "}
          <strong>{iln.gettext("Create Category / Categorisation")}</strong>{" "}
          {iln.gettext(
            "to create a new Category and associated categorisations"
          )}
        </p>
        <CreateButton dispatch={dispatch} state={state} />
        <br />
        <CategorisationTable dispatch={dispatch} state={state} />
        <br />
        {state.categorytypes.length >= 10 && (
          <CreateButton dispatch={dispatch} state={state} />
        )}
      </section>
    </main>
  );
};

export default CategorisationManager;
