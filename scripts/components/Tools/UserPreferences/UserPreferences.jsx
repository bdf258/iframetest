import React, { useContext, useEffect, useState } from "react";

import { ModalContext } from "@electedtech/electedtech-ui";
import Placeholder from "./Placeholder/Placeholder.jsx";
import Preferences from "./Preferences/Preferences.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { setItem } from "../../../helpers/localStorageHelper";

const handleChange =
  ({ preferences, setPreferences, modalActions, iln }) =>
  (e) => {
    // Handle checkboxes differently from other inputs
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const updatedValue = { [e.target.name]: value };
    setPreferences({ ...preferences, ...updatedValue }, modalActions, iln);
    api.updateUserPreferences(updatedValue).then(() => {
      const newPreferences = { ...preferences, ...updatedValue };
      setItem("userPreferences", newPreferences);
      
      // Real-time Intercom enable/disable (only if installation allows Intercom)
      if (e.target.name === 'enableIntercomMessenger' && window.allowIntercom) {
        if (value === false) {
          // Disable Intercom
          if (window.Intercom && typeof window.Intercom === 'function') {
            window.Intercom('shutdown');
          }
        } else {
          // Prevent multiple simultaneous initializations
          if (window._intercomInitializing) {
            return;
          }
          window._intercomInitializing = true;
          
          // Re-initialize Intercom using the same pattern as topTemplate.php
          const installationPreferences = JSON.parse(localStorage.getItem('installationPreferences') || '{}');
          const user = JSON.parse(localStorage.getItem('userIdentity') || '{}');
          const INTERCOM_APP_ID = "ro0kgiih";
          
          // Use existing intercomSettings if available (includes JWT), otherwise create new
          const existingSettings = window.intercomSettings || {};
          const intercomJWT = existingSettings.intercom_user_jwt || '';
          
          window.intercomSettings = {
            app_id: INTERCOM_APP_ID,
            mpName: installationPreferences.mpName,
            version: installationPreferences.version,
            ...(intercomJWT ? { 
              name: user.name,
              email: user.email,
              user_id: user.id, 
              intercom_user_jwt: intercomJWT
            } : {})
          };
          
          // Re-initialize Intercom using the same pattern as topTemplate.php
          const w = window;
          const ic = w.Intercom;
          if (typeof ic === "function") {
            ic('update', w.intercomSettings);
            ic('boot', w.intercomSettings);
            window._intercomInitializing = false;
          } else {
            // If Intercom is not loaded, load the script
            const d = document;
            const i = function() {
              i.c(arguments);
            };
            i.q = [];
            i.c = function(args) {
              i.q.push(args);
            };
            w.Intercom = i;
            const l = function() {
              const s = d.createElement('script');
              s.type = 'text/javascript';
              s.async = true;
              s.src = 'https://widget.intercom.io/widget/' + INTERCOM_APP_ID;
              s.onload = function() {
                window._intercomInitializing = false;
              };
              const x = d.getElementsByTagName('script')[0];
              x.parentNode.insertBefore(s, x);
            };
            if (d.readyState === 'complete') {
              l();
            } else if (w.attachEvent) {
              w.attachEvent('onload', l);
            } else {
              w.addEventListener('load', l, false);
            }
          }
        }
      }
    }).catch((error) => {
      // Revert optimistic update on error
      setPreferences(preferences, modalActions, iln);
      // Show error to user if modalActions available
      if (modalActions && typeof modalActions.setContent === 'function') {
        modalActions.setContent(iln.gettext("Failed to update preferences. Please try again."));
      }
      console.error('Failed to update preferences:', error);
    });
  };

const UserPreferencesPage = () => {
  const [preferences, setPreferences] = useState();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  useEffect(() => {
    api.getUserPreferences().then((res) => setPreferences(res));
  }, []);

  return (
    <React.Fragment>
      {preferences ? (
        <div>
          <h2>{iln.gettext("Tools - Manage Your Preferences")}</h2>
          <Preferences
            preferences={preferences}
            onChange={handleChange({
              preferences,
              setPreferences,
              modalActions,
              iln,
            })}
          />
        </div>
      ) : (
        <Placeholder />
      )}
    </React.Fragment>
  );
};

export default UserPreferencesPage;
