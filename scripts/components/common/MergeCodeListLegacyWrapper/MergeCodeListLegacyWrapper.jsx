import React, { useContext, useEffect, useState } from "react";

import MergeCodes from "../MergeCodes/MergeCodes/MergeCodes.jsx";
import { TranslationContext } from "context/translate";
import customFieldsAsMergeCodes from "../CustomFields/util/customFieldsAsMergeCodes";
import { getCurrentCkeditorInstance } from "../../../helpers/ckeditor/getInstance";
import { getMergeCodes } from "../MergeCodes/util/mergeCodeListForDisplay";
import { locale } from "../../../helpers/localStorageHelper";
import propTypes from "./MergeCodeListLegacyWrapper.propTypes";

const MergeCodeListLegacyWrapper = ({ type }) => {
  const iln = useContext(TranslationContext);

  const [displayMergeCodes, setDisplayMergeCodes] = useState(false);
  const displayBarcode = locale === "AU";
  const mergeCodes = getMergeCodes({
    type: type === "letter" ? "letter" : "email",
    displayBarcode,
    iln,
  });

  const customFieldMergeCodes = customFieldsAsMergeCodes();

  /**
   * Expose toggling view of merge codes on Window for legacy letter editor and email editor.
   *
   */
  useEffect(() => {
    window.toggleLegacyLetterEditorMergeCodeList = () => {
      setDisplayMergeCodes((display) => !display);
    };

    return () => {
      delete window.toggleLegacyLetterEditorMergeCodeList;
    };
  }, []);

  const handleSelectedMergeCode = (selectedMergeCode) => {
    const currentlyFocusedEditor = getCurrentCkeditorInstance();
    if (currentlyFocusedEditor) {
      currentlyFocusedEditor.insertHtml(`${selectedMergeCode} `);
    }
  };

  return (
    <MergeCodes
      selectedMergeCode={(selectedMergeCode) =>
        handleSelectedMergeCode(selectedMergeCode)
      }
      toggleMergeCodeDisplay={() => setDisplayMergeCodes((display) => !display)}
      mergeCodes={[...mergeCodes, ...customFieldMergeCodes]}
      displayBarcode={displayBarcode}
      displayMergeCodes={displayMergeCodes}
    />
  );
};

MergeCodeListLegacyWrapper.propTypes = propTypes;

export default MergeCodeListLegacyWrapper;
