import { Button, FlexBox, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import CategoryTypeForm from "../../common/CategoryTypeForm/CategoryTypeForm.jsx";
import OtherTypesForm from "../../common/OtherTypesForm/OtherTypesForm.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import propTypes from "./CreateCategorisation.propTypes.js";
import useStyles from "./CreateCategorisation.styles.js";

const createNewCasetypeModalID = "createCaseTypeModalID";
const editNewCasetypeModalID = "editCaseTypeModalID";
const deleteCasetypeModalID = "deleteCaseTypeModalID";
const createNewStatusModalID = "createStatusTypeModalID";
const editNewStatusModalID = "editStatusTypeModalID";
const deleteNewStatusModalID = "deleteStatusTypeModalID";

const restriction = {
  view: true,
  edit: true,
  delete: true,
  manage: true,
};

const CreateCategorisation = ({ modalID, dispatch }) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const [fetching, setFetching] = useState(false);
  const [{ categorytype, reviewInDays }, setCategorytype] = useState({
    categorytype: "",
    reviewInDays: 0,
  });
  const [casetypes, setCasetypes] = useState([]);
  const [statustypes, setStatustypes] = useState([]);

  return (
    <div className={classes.createCategorisationModal}>
      <CategoryTypeForm
        timeout={0}
        onChange={(categorytype) => setCategorytype(categorytype)}
      />
      <OtherTypesForm
        category={{ categorytype, reviewInDays }}
        types={casetypes}
        typeKey="casetype"
        modalIDs={{
          create: createNewCasetypeModalID,
          edit: editNewCasetypeModalID,
          delete: deleteCasetypeModalID,
        }}
        onCreate={(newCasetype) => {
          setCasetypes([
            ...casetypes,
            {
              ...newCasetype,
              id: casetypes.length,
              restriction,
            },
          ]);
          modalActions.removeById(createNewCasetypeModalID);
        }}
        onEdit={(updatedCasetype) => {
          casetypes[updatedCasetype.id] = updatedCasetype;
          setCasetypes([...casetypes]);
          modalActions.removeById(editNewCasetypeModalID);
        }}
        onDelete={(id) => {
          setCasetypes([...casetypes.slice(0, id), ...casetypes.slice(id + 1)]);
          modalActions.removeById(deleteCasetypeModalID);
        }}
      />
      <OtherTypesForm
        category={{ categorytype, reviewInDays }}
        types={statustypes}
        typeKey="statustype"
        modalIDs={{
          create: createNewStatusModalID,
          edit: editNewStatusModalID,
          delete: deleteNewStatusModalID,
        }}
        onCreate={(newStatustype) => {
          setStatustypes([
            ...statustypes,
            {
              ...newStatustype,
              id: statustypes.length,
              restriction,
            },
          ]);
          modalActions.removeById(createNewStatusModalID);
        }}
        onEdit={(updatedStatustype) => {
          statustypes[updatedStatustype.id] = updatedStatustype;
          setStatustypes([...statustypes]);
          modalActions.removeById(editNewStatusModalID);
        }}
        onDelete={(id) => {
          setStatustypes([
            ...statustypes.slice(0, id),
            ...statustypes.slice(id + 1),
          ]);
          modalActions.removeById(deleteNewStatusModalID);
        }}
      />
      <FlexBox hAlign="space-between">
        <Button
          isDisabled={fetching}
          onClick={() => modalActions.removeById(modalID)}
        >
          {iln.gettext("Cancel")}
        </Button>
        <Button
          isDisabled={fetching || categorytype === ""}
          onClick={() => {
            setFetching(true);
            api
              .createCategoryType({ categorytype, reviewInDays })
              .then(({ data: categorytype, restriction }) => ({
                ...categorytype,
                restriction,
              }))
              .then((categorytype) => ({
                casetypePromises: casetypes.map((ct) =>
                  api.createCaseType({ ...ct, categorytypeID: categorytype.id })
                ),
                statustypePromises: statustypes.map((st) =>
                  api.createStatusType({
                    ...st,
                    categorytypeID: categorytype.id,
                  })
                ),
                categorytype,
              }))
              .then(
                ({ categorytype, casetypePromises, statustypePromises }) => {
                  dispatch({
                    type: "ADD_CATEGORY_TYPE",
                    payload: categorytype,
                  });
                  Promise.all(casetypePromises).then((promises) =>
                    promises.forEach(({ data: casetype, restriction }) =>
                      dispatch({
                        type: "ADD_CASE_TYPE",
                        payload: { ...casetype, restriction },
                      })
                    )
                  );
                  Promise.all(statustypePromises).then((promises) =>
                    promises.forEach(({ data: statustype, restriction }) =>
                      dispatch({
                        type: "ADD_STATUS_TYPE",
                        payload: { ...statustype, restriction },
                      })
                    )
                  );
                }
              )
              .then(() => modalActions.removeById(modalID));
          }}
        >
          {iln.gettext("Create")}
        </Button>
      </FlexBox>
    </div>
  );
};

CreateCategorisation.propTypes = propTypes;

export default CreateCategorisation;
