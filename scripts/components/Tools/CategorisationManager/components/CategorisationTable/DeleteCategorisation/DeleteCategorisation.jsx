import React, { useContext } from "react";

import DeleteConfirmation from "../../common/DeleteConfirmation/DeleteConfirmation.jsx";
import DeleteIcon from "../../../../../common/icons/DeleteIcon.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import propTypes from "./DeleteCategorisation.propTypes.js";
import useStyles from "./DeleteCategorisation.styles.js";

const deleteModalID = "deleteCategorisationModalID";

const processMapping = ({
  mapping: { casetypes = {}, statustypes = {} } = {},
  categorytypeID,
  dispatch,
}) => [
  ...Object.keys(casetypes).map((id, { value: mergeID, mergeType }) => {
    return mergeType === "merge"
      ? api.deleteMergeCaseType({ id, mergeID }).then(() => {
          dispatch({ type: "DELETE_CASE_TYPE", payload: { id } });
        })
      : api
          .updateCaseType({ id, categorytypeID })
          .then(({ data: updatedCasetype }) =>
            dispatch({ type: "UPDATE_CASE_TYPE", payload: updatedCasetype })
          );
  }),
  ...Object.keys(statustypes).map((id, { value: mergeID, mergeType }) => {
    return mergeType === "merge"
      ? api.deleteMergeStatusType({ id, mergeID }).then(() => {
          dispatch({ type: "DELETE_STATUS_TYPE", payload: { id } });
        })
      : api
          .updateStatusType({ id, categorytypeID })
          .then(({ data: updatedStatustype }) =>
            dispatch({
              type: "UPDATE_STATUS_TYPE",
              payload: updatedStatustype,
            })
          );
  }),
];

const openModal = (
  e,
  { modalActions, dispatch, iln, categorisation, classes, state }
) => {
  e.stopPropagation();
  modalActions.add({
    id: deleteModalID,
    title: iln.gettext(
      "Delete Categorisation - %1",
      categorisation.categorytype
    ),
    component: (
      <DeleteConfirmation
        item={categorisation}
        modalID={deleteModalID}
        state={state}
        onDelete={(id) =>
          api.deleteCategoryType(categorisation).then(() => {
            dispatch({
              type: "REMOVE_CATEGORY_TYPE",
              payload: { id },
            });
            modalActions.removeById(deleteModalID);
          })
        }
        onMerge={(id, mergeID, mapping) =>
          Promise.all([
            api.deleteMergeCategoryType({ id, mergeID }).then(() =>
              dispatch({
                type: "REMOVE_CATEGORY_TYPE",
                payload: { id, mergeID },
              })
            ),
            ...processMapping({
              mapping,
              categorytypeID: mergeID,
              dispatch,
            }),
          ]).then(() => {
            modalActions.removeById(deleteModalID);
          })
        }
        checkDeletionAllowed={api.checkDeleteCategoryType}
      />
    ),
    customClassNames: { card: classes.modalWidth },
  });
};

const DeleteCategorisation = ({ dispatch, categorisation, state }) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  if (!categorisation.restriction.delete) return null;

  return (
    <div
      className={classes.iconButton}
      tabIndex={0}
      role="button"
      onKeyPress={(e) =>
        e.key === "Enter" &&
        openModal(e, { modalActions, dispatch, iln, categorisation, state })
      }
      onClick={(e) =>
        openModal(e, {
          classes,
          modalActions,
          dispatch,
          iln,
          categorisation,
          state,
        })
      }
    >
      <DeleteIcon fill="grey" width={25} height={25} />
    </div>
  );
};

DeleteCategorisation.propTypes = propTypes;

export default DeleteCategorisation;
