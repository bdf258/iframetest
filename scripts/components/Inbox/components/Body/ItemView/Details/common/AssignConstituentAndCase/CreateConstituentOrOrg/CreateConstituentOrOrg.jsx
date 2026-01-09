import { Button, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import CreateConstituentForm from "../../../../../../../../common/CreateConstituent/CreateConstituent.jsx";
import CreateOrganisationForm from "../../../../../../../../common/CreateOrganisation/CreateOrganisation.jsx";
import TranslationContext from "../../../../../../../../../context/translation/TranslationContext.js";
import api from "@electedtech/api";
import propTypes from "./CreateConstituentOrOrg.propTypes.js";
import { useReduxSlice } from "./CreateConstituentOrOrg.redux.js";
import { useStyles } from "./CreateConstituentOrOrg.styles.js";

const CreateConstituentOrOrg = ({
  onClickBack,
  onClickNext,
  inititalValues = {},
  createAsOrg,
  toggleView,
  disableConnectionCreation,
}) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const { organisationTypes, addOrganisationType, connectionTypes, roleTypes } =
    useReduxSlice();

  return (
    <div>
      <header className={classes.heading}>
        <h4 className={classes.title}>
          {!createAsOrg
            ? iln.gettext("Create a new constituent")
            : iln.gettext("Create a new organisation")}
        </h4>
        {toggleView && (
          <Button size="small" onClick={() => toggleView()}>
            {createAsOrg
              ? iln.gettext("Create constituent instead?")
              : iln.gettext("Create organisation instead?")}
          </Button>
        )}
      </header>

      {!createAsOrg ? (
        <CreateConstituentForm
          inititalValues={inititalValues}
          createButtonText={iln.gettext("Next")}
          onCreateClick={(details) =>
            api
              .createConstituent(details, modalActions, iln)
              .then(({ id: constituentID }) =>
                onClickNext(details, constituentID)
              )
          }
          cancelButtonText={iln.gettext("Back")}
          onCancelClick={onClickBack}
        />
      ) : (
        <CreateOrganisationForm
          inititalValues={inititalValues}
          createButtonText={iln.gettext("Next")}
          onCreateOrganisation={(organisation) => {
            addOrganisationType(organisation.organisationType);

            api
              .createConstituent(organisation, modalActions, iln)
              .then(({ id: constituentID }) =>
                onClickNext(organisation, constituentID)
              );
          }}
          onCreateOrganisationWithConnections={
            !disableConnectionCreation
              ? ({ organisation, constituent, connectionTypeID }) => {
                  addOrganisationType(organisation.organisationType);

                  return Promise.all([
                    api.createConstituent(organisation, modalActions, iln),
                    api.createConstituent(constituent, modalActions, iln),
                  ])
                    .then(([organisation, constituent]) => {
                      addOrganisationType(organisation.organisationType);
                      api.createConnection(
                        {
                          parentID: organisation.id,
                          childID: constituent.id,
                          connectionTypeID,
                        },
                        modalActions,
                        iln
                      );
                      return organisation;
                    })
                    .then((organisation) =>
                      onClickNext(organisation, organisation.id)
                    );
                }
              : undefined
          }
          cancelButtonText={iln.gettext("Back")}
          onCancelClick={onClickBack}
          organisationTypes={organisationTypes}
          connectionTypes={connectionTypes}
          roleTypes={roleTypes}
        />
      )}
    </div>
  );
};

CreateConstituentOrOrg.propTypes = propTypes;

export default CreateConstituentOrOrg;
