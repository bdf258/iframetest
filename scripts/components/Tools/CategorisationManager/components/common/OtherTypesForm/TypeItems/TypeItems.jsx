import React, { useContext } from "react";

import DeleteConfirmation from "../../DeleteConfirmation/DeleteConfirmation.jsx";
import Editor from "../Editor/Editor.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import TypeItem from "./TypeItem/TypeItem.jsx";
import propTypes from "./TypeItems.propTypes.js";
import useStyles from "./TypeItems.styles.js";

const getEditModalTitle = (iln, typeKey, type) => {
  switch (typeKey) {
    case "casetype":
      return iln.gettext("Edit Case Type - %1", type[typeKey]);
    case "statustype":
      return iln.gettext("Edit Status Type - %1", type[typeKey]);
  }
};

const getDeleteModalTitle = (iln, typeKey, type) => {
  switch (typeKey) {
    case "casetype":
      return iln.gettext("Delete Case Type - %1", type[typeKey]);
    case "statustype":
      return iln.gettext("Delete Status Type - %1", type[typeKey]);
  }
};

const TypeItems = ({
  types = [],
  heading,
  typeKey,
  modalIDs,
  onEdit,
  onDelete,
  onMerge,
  checkDeletionAllowed,
}) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  return (
    types.length > 0 && [
      heading && <h4 key="heading">{heading}</h4>,
      <div key="items" className={classes.items}>
        {types.map((type) => (
          <TypeItem
            key={type.id}
            item={type}
            typeKey={typeKey}
            onEditClick={() =>
              modalActions.add({
                id: modalIDs.edit,
                title: getEditModalTitle(iln, typeKey, type),
                component: (
                  <Editor
                    item={type}
                    modalID={modalIDs.edit}
                    onConfirm={onEdit}
                    typeKey={typeKey}
                  />
                ),
                customClassNames: { card: classes.modalWidth },
              })
            }
            onDeleteClick={() =>
              modalActions.add({
                id: modalIDs.delete,
                title: getDeleteModalTitle(iln, typeKey, type),
                component: (
                  <DeleteConfirmation
                    item={type}
                    modalID={modalIDs.delete}
                    onDelete={onDelete}
                    onMerge={onMerge}
                    checkDeletionAllowed={checkDeletionAllowed}
                  />
                ),
                customClassNames: { card: classes.modalWidth },
              })
            }
          />
        ))}
      </div>,
    ]
  );
};

TypeItems.propTypes = propTypes;

export default TypeItems;
