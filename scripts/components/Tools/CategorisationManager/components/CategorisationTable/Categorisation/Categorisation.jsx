import React, { useContext } from "react";

import CategoryTypeForm from "../../common/CategoryTypeForm";
import ComponentLoading from "../../../../../ComponentLoading.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import OtherTypesForm from "../../common/OtherTypesForm/OtherTypesForm.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import propTypes from "./Categorisation.propTypes.js";
import useStyles from "./Categorisation.styles.js";

const createCasetypeModalID = "createCaseTypeModalID";
const editCasetypeModalID = "editCaseTypeModalID";
const deleteCasetypeModalID = "deleteCaseTypeModalID";
const createStatusModalID = "createStatusTypeModalID";
const editStatusModalID = "editStatusTypeModalID";
const deleteStatusModalID = "deleteStatusTypeModalID";

const Categorisation = ({ state, dispatch, category }) => {
  const classes = useStyles({ fullWidth: category.id !== undefined });
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  if (!state.casetypes || !state.statustypes) return <ComponentLoading />;

  return (
    <div className={classes.categorisationEditor}>
      <CategoryTypeForm
        dispatch={dispatch}
        category={category}
        onChange={(category) => {
          api.updateCategoryType(category).then((categorytype) =>
            dispatch({
              type: "UPDATE_CATEGORY_TYPE",
              payload: categorytype,
            })
          );
        }}
      />
      <OtherTypesForm
        category={category}
        modalIDs={{
          create: createCasetypeModalID,
          edit: editCasetypeModalID,
          delete: deleteCasetypeModalID,
        }}
        types={state.casetypes.filter(
          ({ categorytypeID }) =>
            categorytypeID === category.id || categorytypeID === 0
        )}
        typeKey="casetype"
        onCreate={(newCasetype) =>
          api.createCaseType(newCasetype).then(({ data }) => {
            dispatch({
              type: "ADD_CASE_TYPE",
              payload: {
                ...data,
                restriction: {
                  view: true,
                  edit: true,
                  delete: true,
                  manage: true,
                },
              },
            });
            modalActions.removeById(createCasetypeModalID);
          })
        }
        onEdit={(updatedCasetype) =>
          api.updateCaseType(updatedCasetype).then((updatedCaseType) => {
            dispatch({
              type: "UPDATE_CASE_TYPE",
              payload: updatedCaseType,
            });
            modalActions.removeById(editCasetypeModalID);
          })
        }
        checkDeletionAllowed={api.checkDeleteCaseType}
        onDelete={(id) =>
          api.deleteCaseType({ id }).then(() => {
            dispatch({
              type: "REMOVE_CASE_TYPE",
              payload: { id },
            });
            modalActions.removeById(deleteCasetypeModalID);
          })
        }
        onMerge={(id, mergeID) =>
          api.deleteMergeCaseType({ id, mergeID }).then(() => {
            dispatch({
              type: "REMOVE_CASE_TYPE",
              payload: {
                id,
              },
            });
            modalActions.removeById(deleteCasetypeModalID);
          })
        }
      />
      <OtherTypesForm
        dispatch={dispatch}
        category={category}
        modalIDs={{
          create: createStatusModalID,
          edit: editStatusModalID,
          delete: deleteStatusModalID,
        }}
        heading={iln.gettext("Status Types")}
        types={state.statustypes.filter(
          ({ id, categorytypeID }) =>
            categorytypeID === category.id ||
            categorytypeID === 0 ||
            id === 1 ||
            id === 2
        )}
        typeKey="statustype"
        onCreate={(newStatustype) =>
          api.createStatusType(newStatustype).then(({ data }) => {
            dispatch({
              type: "ADD_STATUS_TYPE",
              payload: {
                ...data,
                restriction: {
                  view: true,
                  edit: true,
                  delete: true,
                  manage: true,
                },
              },
            });
            modalActions.removeById(createStatusModalID);
          })
        }
        onEdit={(updatedStatustype) =>
          api.updateStatusType(updatedStatustype).then((updatedStatusType) => {
            dispatch({
              type: "UPDATE_STATUS_TYPE",
              payload: updatedStatusType,
            });
            modalActions.removeById(editStatusModalID);
          })
        }
        checkDeletionAllowed={api.checkDeleteStatusType}
        onDelete={(id) =>
          api.deleteStatusType({ id }).then(() => {
            dispatch({
              type: "REMOVE_STATUS_TYPE",
              payload: { id },
            });
            modalActions.removeById(deleteStatusModalID);
          })
        }
        onMerge={(id, mergeID) =>
          api.deleteMergeStatusType({ id, mergeID }).then(() => {
            dispatch({
              type: "REMOVE_STATUS_TYPE",
              payload: {
                id,
              },
            });
            modalActions.removeById(deleteStatusModalID);
          })
        }
      />
    </div>
  );
};

Categorisation.propTypes = propTypes;

export default Categorisation;
