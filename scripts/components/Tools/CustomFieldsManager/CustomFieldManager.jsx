import { NotificationBox, Switcher } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import CreateNewCustomField from "./CreateNewCustomField/CreateNewCustomField.jsx";
import CustomFieldEditor from "./CustomFieldEditor/CustomFieldEditor.jsx";
import CustomFieldsTable from "./CusomFieldsTable/CustomFieldsTable.jsx";
import ErrorPage from "../../common/ErrorPage/ErrorPage.jsx";
import { TranslationContext } from "context/translate";
import { getUserIdentity } from "../../../helpers/localStorageHelper";
import useCustomFieldManager from "./hooks/useCustomFieldManager.jsx";
import useStyles from "./CustomFieldManager.styles.js";

const CustomFieldManager = () => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const [state, dispatch] = useCustomFieldManager();
  const { view, selectedField, customFields } = state;

  const hasCustomFields = state.customFields.length !== 0;

  const handleEditExistingField = (fieldId) => {
    const field = customFields.filter((field) => {
      return field.id === fieldId;
    })[0];

    dispatch({
      type: "SET_SELECTED_FIELD",
      payload: field,
    });
    dispatch({
      type: "SET_VIEW",
      payload: "FIELD",
    });
  };

  const { isAdmin } = getUserIdentity() || {};

  if (!isAdmin) return <ErrorPage statusCode="403" />;

  return (
    <div className={classes.customFieldManagerContainer}>
      <h1>{iln.gettext("Manage Custom Fields")}</h1>
      <Switcher selected={view}>
        {{
          TABLE: (
            <React.Fragment>
              {!hasCustomFields && (
                <NotificationBox
                  type={"info"}
                  alertMessage={iln.gettext("No custom fields available")}
                />
              )}
              {hasCustomFields && (
                <CustomFieldsTable
                  customFields={customFields}
                  handleEditExistingField={handleEditExistingField}
                />
              )}
              <CreateNewCustomField
                handleCreateNewCustomField={() => {
                  dispatch({
                    type: "CREATE_NEW_FIELD",
                  });
                  dispatch({
                    type: "SET_VIEW",
                    payload: "FIELD",
                  });
                }}
              />
            </React.Fragment>
          ),
          FIELD: (
            <CustomFieldEditor
              navigateBack={() =>
                dispatch({
                  type: "SET_VIEW",
                  payload: "TABLE",
                })
              }
              selectedField={selectedField}
              handleUpdateField={(updatedField) => {
                dispatch({
                  type: "UPDATE_SELECTED_FIELD",
                  payload: updatedField,
                });
              }}
              handleSaveField={(field) => {
                dispatch({
                  type: "SAVE_SELECTED_FIELD",
                  payload: field,
                });
              }}
              dispatch={dispatch}
            />
          ),
        }}
      </Switcher>
    </div>
  );
};

export default CustomFieldManager;
