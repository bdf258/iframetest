import "./styles.css";

import {
  Button,
  FlexBox,
  FormCheckbox,
  ModalContext,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";
import {
  getUserPreferences,
  setUserPreferences as updateUserPreferencesLocalStorage,
} from "../../../../../../helpers/localStorageHelper.js";

import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import propTypes from "prop-types";

const caseAssignedToMeUpdated = "caseAssignedToMeUpdated";
const caseAssignedToMe = "caseAssignedToMe";
const taskAssignedToMe = "taskAssignedToMe";
const emailAssignedToMe = "emailAssignedToMe";
const caseDue = "caseDue";
const reviewDateAssignedToMe = "reviewDateAssignedToMe";

const ManageNotificationPreferences = ({ modalID }) => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);
  const userPreferences = getUserPreferences() || {};

  const initialState = userPreferences.notificationPreferences || {
    [caseAssignedToMeUpdated]: false,
    [caseAssignedToMe]: false,
    [taskAssignedToMe]: false,
    [emailAssignedToMe]: false,
    [reviewDateAssignedToMe]: false,
    [caseDue]: false,
  };

  const updateLocalStorage =
    ({ notificationPreferences }) =>
    ({ target: { name, value } }) => {
      const newPreferences = {
        ...notificationPreferences,
        [name]: value,
      };
      api.updateUserPreferences({ notificationPreferences: newPreferences });
      updateUserPreferencesLocalStorage({
        ...userPreferences,
        notificationPreferences: newPreferences,
      });
      setNotificationPreferences(() => {
        return newPreferences;
      });
    };

  const [notificationPreferences, setNotificationPreferences] =
    useState(initialState);

  return (
    <React.Fragment>
      <p>{iln.gettext("Notify me when:")}</p>
      <FormCheckbox
        name={caseAssignedToMe}
        value={notificationPreferences[caseAssignedToMe]}
        label={iln.gettext("A new case is assigned to me")}
        textAlign="center"
        onChange={updateLocalStorage({
          notificationPreferences,
          setNotificationPreferences,
        })}
        keepErrorSpacing={false}
      />
      <FormCheckbox
        name={caseAssignedToMeUpdated}
        value={notificationPreferences[caseAssignedToMeUpdated]}
        label={iln.gettext("A case is assigned to me is updated")}
        textAlign="center"
        onChange={updateLocalStorage({
          notificationPreferences,
        })}
        keepErrorSpacing={false}
      />
      <FormCheckbox
        name={emailAssignedToMe}
        value={notificationPreferences[emailAssignedToMe]}
        label={iln.gettext("An email is assigned to me")}
        textAlign="center"
        onChange={updateLocalStorage({
          notificationPreferences,
        })}
        keepErrorSpacing={false}
      />
      <FormCheckbox
        name={reviewDateAssignedToMe}
        value={notificationPreferences[reviewDateAssignedToMe]}
        label={iln.gettext("A review date is assigned to me")}
        textAlign="center"
        onChange={updateLocalStorage({
          notificationPreferences,
        })}
        keepErrorSpacing={false}
      />
      <FormCheckbox
        name={caseDue}
        value={notificationPreferences[caseDue]}
        label={iln.gettext("A review date is due")}
        textAlign="center"
        onChange={updateLocalStorage({
          notificationPreferences,
        })}
        keepErrorSpacing={false}
      />
      <FlexBox hAlign="flex-end">
        <Button onClick={() => modalActions.removeById(modalID)}>
          {iln.gettext("Done")}
        </Button>
      </FlexBox>
    </React.Fragment>
  );
};

ManageNotificationPreferences.propTypes = {
  modalID: propTypes.string.isRequired,
};

export default ManageNotificationPreferences;
