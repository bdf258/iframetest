import {
  Button,
  FlexBox,
  FormSelect,
  ModalContext,
  NotificationBox,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import localStorageHelper from "../../../../helpers/localStorageHelper";
import propTypes from "./SaveField.propTypes";
import useStyles from "./SavaField.styles";

const SaveFields = ({
  navigateBack,
  selectedField,
  handleUpdateField,
  handleSaveField,
}) => {
  const classes = useStyles();

  const [selectedInput, setSelectedInput] = useState(selectedField);

  const { removedOptions, options } = selectedInput;
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const HANDLE_REMOVED_OPTIONS = removedOptions.length > 0;
  const REMOVED_OPTIONS_REMAPPED =
    removedOptions.length > 0 &&
    removedOptions.filter((option) => {
      return option.mapto === -1;
    }).length === 0;

  const optionsMapped = () => {
    if (removedOptions.length === 0) return false;
    return !removedOptions.every((option) => option.hasOwnProperty("mapto"));
  };
  const handleSaveCustomField = () => {
    const removedOptionMappings = removedOptions.map((removedOption) => {
      return { id: removedOption.id, mapto: removedOption.mapto };
    });

    if (selectedInput.id === 0) {
      api
        .saveCustomField(selectedInput, modalActions)
        .then((customFields) => {
          localStorageHelper.setItem("customFields", customFields);
          handleSaveField(customFields);
          modalActions.removeById("saveFieldModalId");
          navigateBack();
        })
        .catch(() => {
          modalActions.removeById("saveFieldModalId");
        });
    } else {
      api
        .updateCustomField(
          selectedInput.id,
          {
            fieldDetails: {
              ...selectedInput,
            },
            removedOptionsMapping: removedOptionMappings,
          },
          modalActions
        )
        .then((customFields) => {
          localStorageHelper.setItem("customFields", customFields);
          handleSaveField(customFields);
          modalActions.removeById("saveFieldModalId");
          navigateBack();
        })
        .catch(() => {
          modalActions.removeById("saveFieldModalId");
        });
    }
  };

  const ChangeRemoveOptionMapping = (e, optionId, removedOptions) => {
    const optionIndex = removedOptions
      .map((option) => option.id)
      .indexOf(optionId);

    let updatedRemovedOptions = [...removedOptions];
    updatedRemovedOptions[optionIndex].mapto = e.target.value;
    removedOptions[optionIndex].mapto = e.target.value;

    handleUpdateField({
      ...selectedInput,
      removedOptions: updatedRemovedOptions,
    });

    setSelectedInput({
      ...selectedInput,
      removedOptions: updatedRemovedOptions,
    });
  };

  return (
    <React.Fragment>
      {(REMOVED_OPTIONS_REMAPPED || removedOptions.length === 0) && (
        <React.Fragment>
          <p>{iln.gettext("Do you want to save this field?")}</p>
          <NotificationBox
            type={"alert"}
            alertMessage={iln.gettext(
              "This action cannot be undone, please confirm you are creating the correct custom field before continuing."
            )}
          />
          {HANDLE_REMOVED_OPTIONS && (
            <React.Fragment>
              <div>
                <p>{iln.gettext("Map Deleted Options")}</p>
                <NotificationBox
                  type={"info"}
                  alertMessage={iln.gettext(
                    "Before you continue you must map the options that you have deleted to a remaining option. This will ensure that no existing data is lost or orphaned"
                  )}
                />
                {removedOptions.map((removedOption) => {
                  return (
                    <React.Fragment key={removedOption.id}>
                      <div className={classes.aboveInputLabel}>
                        {removedOption.text}
                      </div>
                      <FormSelect
                        name={"reamp-" + removedOption.id}
                        value={removedOption.mapto}
                        onChange={(e) =>
                          ChangeRemoveOptionMapping(
                            e,
                            removedOption.id,
                            removedOptions
                          )
                        }
                        customClassNames={{
                          container: classes.mapDeletedOptionContainer,
                        }}
                      >
                        {options
                          .sort((a, b) =>
                            a.text < b.text ? -1 : b.text < a.text ? 1 : 0
                          )
                          .map((option, idx) => {
                            return (
                              <option key={idx} value={option.id}>
                                {option.text}
                              </option>
                            );
                          })}
                      </FormSelect>
                    </React.Fragment>
                  );
                })}
              </div>
            </React.Fragment>
          )}
          <FlexBox style={{ marginTop: 10 }} hAlign="space-between">
            <Button
              onClick={() => {
                modalActions.removeById("saveFieldModalId");
              }}
            >
              Cancel
            </Button>
            <Button
              isDisabled={optionsMapped()}
              onClick={() => {
                handleSaveCustomField();
              }}
            >
              {iln.gettext("Confirm")}
            </Button>
          </FlexBox>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default SaveFields;

SaveFields.propTypes = propTypes;
