import React, { useContext, useEffect } from "react";

import { TranslationContext } from "context/translate";
import { getItem } from "../../helpers/localStorageHelper";
import { mergeCodeListForUnlayer } from "../common/MergeCodes/util/mergeCodeListForUnlayer";
import propTypes from "prop-types";
import storage from "../../api/src/storage";

const UnlayerEditor = ({
  unlayer,
  advancedEditorContent,
  triggerAutosaveOnUpdate,
  communicationType,
}) => {
  const iln = useContext(TranslationContext);
  function setupStorage() {
    unlayer.registerCallback("image", function (file, done) {
      storage.upload(file.attachments[0]).then((response) => {
        return done({
          progress: 100,
          url: response.url,
        });
      });
    });
  }
  const applyTemplate = () => {
    unlayer.loadDesign(advancedEditorContent);
  };

  useEffect(() => {
    let applyAdvancedFeatures = getItem(
      "installationPreferences"
    ).unlayer_advanced_features;
    let features = {
      userUploads: applyAdvancedFeatures,
      pageAnchors: applyAdvancedFeatures,
      stockImages: {
        enabled: false,
      },
    };

    if (getItem("installationPreferences").unlayer_advanced_features)
      features.colorPicker = {
        presets: getItem("installationPreferences").editorColors.map(
          (color) => `#${color}`
        ),
      };
    unlayer.init({
      id: "unlayer-emailBody",
      projectId: 49403,
      displayMode: "email",
      version: getItem("installationPreferences").unlayer_version,
      user: {
        id: getItem("installationPreferences").unlayer_user_id,
        signature: getItem("installationPreferences").unlayer_signature,
      },
      designTagsConfig: {
        delimiter: ["[[[", "]]]"],
      },
      features,
      mergeTags: mergeCodeListForUnlayer({
        communicationType,
        displayBarcode: false,
        additionalMergeCodes: [],
        iln,
      }),
      mergeTagsConfig: {
        sort: false,
      },
    });
    setupStorage();
    applyTemplate();
    unlayer.addEventListener("design:updated", triggerAutosaveOnUpdate);
    return () =>
      unlayer.removeEventListener("design:updated", triggerAutosaveOnUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="unlayer-emailBody" style={{ height: 700, width: 100 + "%" }}></div>
  );
};

UnlayerEditor.propTypes = {
  advancedEditorContent: propTypes.any,
  communicationType: propTypes.oneOf(["email", "letter"]).isRequired,
  triggerAutosaveOnUpdate: propTypes.func,
  unlayer: propTypes.any,
};
export default UnlayerEditor;
