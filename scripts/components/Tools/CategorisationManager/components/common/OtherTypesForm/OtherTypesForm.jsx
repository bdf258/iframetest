import { FlexBox, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import Editor from "./Editor/Editor.jsx";
import PlusIcon from "../../../../../common/icons/PlusIcon.jsx";
import { TranslationContext } from "context/translate";
import TypeItems from "./TypeItems/TypeItems.jsx";
import propTypes from "./OtherTypesForm.propTypes.js";
import useStyles from "./OtherTypesForm.styles.js";

const getHeading = (iln, typeKey) => {
  switch (typeKey) {
    case "casetype":
      return iln.gettext("Case Types");
    case "statustype":
      return iln.gettext("Status Types");
  }
};

const getCreateModalTitle = (iln, typeKey) => {
  switch (typeKey) {
    case "casetype":
      return iln.gettext("Create Case Type");
    case "statustype":
      return iln.gettext("Create Status Type");
  }
};

const getNoItemsMessage = (iln, typeKey) => {
  switch (typeKey) {
    case "casetype":
      return iln.gettext(
        "Use the plus button above to add Case Types to this categorisation"
      );
    case "statustype":
      return iln.gettext(
        "Use the plus button above to add Status Types to this categorisation"
      );
  }
};

const OtherTypesForm = ({
  category,
  types,
  typeKey,
  onCreate,
  modalIDs,
  onEdit,
  onDelete,
  onMerge,
  checkDeletionAllowed,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const { closedAndGlobalTypes, globalTypes, closedTypes, otherTypes } =
    types.reduce(
      (all, next) => {
        if (next.closed && next.categorytypeID === 0)
          return {
            ...all,
            closedAndGlobalTypes: [...all.closedAndGlobalTypes, next],
          };

        if (next.closed)
          return { ...all, closedTypes: [...all.closedTypes, next] };
        else if (next.categorytypeID === 0)
          return { ...all, globalTypes: [...all.globalTypes, next] };
        else return { ...all, otherTypes: [...all.otherTypes, next] };
      },
      {
        globalTypes: [],
        closedTypes: [],
        otherTypes: [],
        closedAndGlobalTypes: [],
      }
    );

  return (
    <section className={classes.section}>
      <FlexBox hAlign="space-between" vAlign="center">
        <h3 className={classes.sectionHeading}>{getHeading(iln, typeKey)}</h3>
        <button
          className={classes.iconButton}
          onClick={() =>
            modalActions.add({
              id: modalIDs.create,
              title: getCreateModalTitle(iln, typeKey),
              component: (
                <Editor
                  item={{ categorytypeID: category.id }}
                  modalID={modalIDs.create}
                  onConfirm={onCreate}
                  typeKey={typeKey}
                />
              ),
              customClassNames: { card: classes.modalWidth },
            })
          }
        >
          <PlusIcon width={25} height={25} />
        </button>
      </FlexBox>
      {types.length === 0 ? (
        <p className={classes.noItems}>{getNoItemsMessage(iln, typeKey)}</p>
      ) : (
        <React.Fragment>
          <TypeItems
            types={otherTypes}
            typeKey={typeKey}
            modalIDs={modalIDs}
            onEdit={onEdit}
            onDelete={onDelete}
            onMerge={onMerge}
            checkDeletionAllowed={checkDeletionAllowed}
          />
          <TypeItems
            heading={iln.gettext("Closed & Global")}
            types={closedAndGlobalTypes}
            typeKey={typeKey}
            modalIDs={modalIDs}
            onEdit={onEdit}
            onDelete={onDelete}
            onMerge={onMerge}
            checkDeletionAllowed={checkDeletionAllowed}
          />
          <TypeItems
            heading={iln.gettext("Closed")}
            types={closedTypes}
            typeKey={typeKey}
            modalIDs={modalIDs}
            onEdit={onEdit}
            onDelete={onDelete}
            onMerge={onMerge}
            checkDeletionAllowed={checkDeletionAllowed}
          />
          <TypeItems
            heading={iln.gettext("Global")}
            types={globalTypes}
            typeKey={typeKey}
            modalIDs={modalIDs}
            onEdit={onEdit}
            onDelete={onDelete}
            onMerge={onMerge}
            checkDeletionAllowed={checkDeletionAllowed}
          />
        </React.Fragment>
      )}
    </section>
  );
};

OtherTypesForm.propTypes = propTypes;

export default OtherTypesForm;
