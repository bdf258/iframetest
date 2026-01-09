import { FlexBox, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useRef, useState } from "react";

import BasicEditor from "../../EmailTemplateEditor/BasicEditor.jsx";
import ButtonGroups from "../../EmailTemplateEditor/ButtonGroups.jsx";
import CaseDetailsForm from "../../EmailTemplateEditor/CaseDetailsForm.jsx";
import MergeCodes from "../../common/MergeCodes/MergeCodes/MergeCodes.jsx";
import { TranslationContext } from "context/translate";
import UnlayerEditor from "../../EmailTemplateEditor/UnlayerEditor.jsx";
import api from "@electedtech/api";
import customFieldsAsMergeCodes from "../../common/CustomFields/util/customFieldsAsMergeCodes";
import { getCurrentCkeditorInstance } from "../../../helpers/ckeditor/getInstance";
import { getMergeCodes } from "../../common/MergeCodes/util/mergeCodeListForDisplay";
import { locale } from "../../../helpers/localStorageHelper";
import propTypes from "./EmailTemplateEditorContainer.propTypes";
import testEmailModal from "../../EmailTemplateEditor/testEmailModal.js";
import { useStyles } from "./EmailTemplateEditorContainer.styles";

//init unlayer editor;
const unlayer = window.unlayer;

const EmailTemplateEditorContainer = ({
  templateId,
  templateName,
  advanceEditorAllowed,
}) => {
  const iln = useContext(TranslationContext);
  const { modalActions, modalState } = useContext(ModalContext);

  const classes = useStyles();

  const [advancedEditor, setAdvancedEditor] = useState(false);
  const [caseType, setCaseType] = useState(0);
  const [tags, setTags] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [basicEditorContent, setBasicEditorContent] = useState("");
  const [advancedEditorContent, setAdvancedEditorContent] = useState(null);
  const [sendTest, setSendTest] = useState(false);
  const timeoutRef = useRef(null);
  const saveRef = useRef(null);
  const changeRef = useRef(null);

  const [displayMergeCodes, setDisplayMergeCodes] = useState(false);
  const displayBarcode = locale === "AU";
  const letterMergeCodes = getMergeCodes({
    type: "email",
    displayBarcode,
    iln,
  });
  const customFieldMergeCodes = customFieldsAsMergeCodes();

  const handleSelectedMergeCode = ({ selectedMergeCode }) => {
    const currentlyFocusedEditor = getCurrentCkeditorInstance();
    if (currentlyFocusedEditor) {
      currentlyFocusedEditor.insertHtml(`${selectedMergeCode} `);
    }
  };

  const getTemplateDetails = async (templateId) => {
    let details = await api.getEmailTemplateById(templateId, modalActions);
    if (!details) return;

    if (details.isAdvanced == 1) {
      details.unlayerBlocks
        ? setAdvancedEditorContent(JSON.parse(details.unlayerBlocks))
        : null;
      advanceEditorAllowed && setAdvancedEditor(true);
    }
    setBasicEditorContent(
      details.htmlTemplate
        ? details.htmlTemplate
        : "Dear [[ConstituentFirstname]] [[ConstituentSurname]]"
    );
    details.casetypeID && setCaseType(+details.casetypeID);
    details.tagID &&
      details.tagID.map((tag) => setTags((tags) => [...tags, tag]));
    details.restrictions.length > 0 && setRestrictions(details.restrictions);
  };
  useEffect(() => {
    getTemplateDetails(templateId);
  }, []);

  useEffect(() => {
    const editorStyles = {
      width: advancedEditor ? "95vw" : "900px",
      maxWidth: advancedEditor ? "100vw" : "1500px",
    };
    Object.entries(editorStyles).map(
      ([key, value]) =>
        (document.querySelector(".innercontainer").style[key] = value)
    );
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [advancedEditor]);

  useEffect(() => {
    sendTest
      ? modalActions.add(testEmailModal(templateId, templateName, setSendTest))
      : modalActions.removeById("sendTestEmailModal");
    sendTest && saveTemplate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendTest]);

  useEffect(() => {
    !modalState.modals.some((modal) => modal.id == "sendTestEmailModal") &&
      setSendTest(false);
  }, [modalState]);
  const saveData = async (templateId, dataToSave, exit) => {
    let res = await api.saveEmailTemplate(templateId, dataToSave, modalActions);
    if (res && exit) {
      alert("Template Saved");
      window.location.replace("manageemailtemplates.php");
    }
  };

  const saveTemplate = (exit = true) => {
    let dataToSave;
    const getTagIds = (tags) => {
      let IDs = "";
      tags.map((t) => (IDs += t.id + ","));
      return IDs.slice(0, -1);
    };
    const getRestrictions = (restrictions) =>
      restrictions.length > 0 ? restrictions : null;

    if (advancedEditor) {
      unlayer.exportHtml(async (data) => {
        dataToSave = {
          json: data.design,
          html: data.html,
          casetypeID: caseType,
          tagID: tags.length > 0 ? getTagIds(tags) : null,
          restrictions: getRestrictions(restrictions),
        };
        saveData(templateId, dataToSave, exit);
      });
    } else {
      dataToSave = {
        //json saves changes made in advanced editor
        json: advancedEditorContent == null ? "" : advancedEditorContent,
        html: basicEditorContent,
        casetypeID: caseType,
        tagID: tags.length > 0 ? getTagIds(tags) : null,
        restrictions: getRestrictions(restrictions),
      };
      saveData(templateId, dataToSave, exit);
    }
  };

  const triggerAutosaveOnUpdate = () => {
    saveRef.current = () => saveTemplate(false);
    if (changeRef.current == null) {
      changeRef.current = true;
      timeoutRef.current = setTimeout(async () => {
        changeRef.current = null;
        saveRef.current();
      }, 300000);
    }
  };

  const downloadFile = async (url, filename = "test.pdf") => {
    const blob = await api.proxyDownload(btoa(url));
    const blobUrl = window.URL.createObjectURL(blob);

    let link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  };

  const pdfLoader = (classes, iln) => {
    return {
      id: "pdfProxyLoader",
      customClassNames: {
        card: classes.modalCard,
      },
      title: iln.gettext("PDF Export"),
      component: (
        <React.Fragment>
          <p>{iln.gettext("Your PDF is generating. Please wait.")}</p>
        </React.Fragment>
      ),
      blurBackground: true,
      lockWindow: true,
      allowClose: true,
    };
  };
  const getPDF = () => {
    modalActions.add(pdfLoader(classes, iln));
    unlayer.exportPdf(async function (data) {
      let pdfUrl = data.url;
      await downloadFile(pdfUrl, templateName + ".pdf");
      modalActions.removeById("pdfProxyLoader");
    });
  };

  return (
    <FlexBox hAlign="center">
      <FlexBox column hAlign="center">
        <ButtonGroups
          saveTemplate={saveTemplate}
          setSendTest={setSendTest}
          getPDF={getPDF}
          onToggleDisplayMergeCodes={() =>
            setDisplayMergeCodes((display) => !display)
          }
          advancedEditor={advancedEditor}
        />
        <FlexBox hAlign="center" className={classes.editorWidth}>
          {advancedEditor ? (
            <UnlayerEditor
              unlayer={unlayer}
              templateId={templateId}
              advancedEditorContent={advancedEditorContent}
              triggerAutosaveOnUpdate={triggerAutosaveOnUpdate}
              communicationType={"email"}
            />
          ) : (
            <BasicEditor
              basicEditorContent={basicEditorContent}
              setBasicEditorContent={setBasicEditorContent}
              triggerAutosaveOnUpdate={triggerAutosaveOnUpdate}
            />
          )}
        </FlexBox>
        <FlexBox column className={classes.form}>
          <CaseDetailsForm
            tags={tags}
            caseType={caseType}
            setTags={setTags}
            setCaseType={setCaseType}
            restrictions={restrictions}
            setRestrictions={setRestrictions}
            triggerAutosaveOnUpdate={triggerAutosaveOnUpdate}
          />
        </FlexBox>
      </FlexBox>
      {displayMergeCodes && !advancedEditor && (
        <MergeCodes
          selectedMergeCode={(selectedMergeCode) =>
            handleSelectedMergeCode({ selectedMergeCode })
          }
          toggleMergeCodeDisplay={() =>
            setDisplayMergeCodes((display) => !display)
          }
          mergeCodes={[...letterMergeCodes, ...customFieldMergeCodes]}
          displayBarcode={displayBarcode}
          displayMergeCodes={displayMergeCodes}
        />
      )}
    </FlexBox>
  );
};

EmailTemplateEditorContainer.propTypes = propTypes;
export default EmailTemplateEditorContainer;
