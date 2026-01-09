import "./styles.css";

import {
  Button,
  FlexBox,
  ModalContext,
  Switcher,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";
import {
  caseworkerID,
  getInstallationPreferences,
  getUserPreferences,
  setItem,
} from "@electedtech/helpers/localStorageHelper";

import CKEditor from "@electedtech/electedtech-ckeditor";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import classnames from "classnames";
import getUserCKEditorConfig from "../../../../../../helpers/ckeditor/getUserCKEditorConfig.js";
import getUserEmailSignature from "../../../../../../helpers/getUserEmailSignature";
import propTypes from "prop-types";
import useStyles from "./styles.js";
import { useTheme } from "react-jss";

const userPreferences = getUserPreferences();
const installationPreferences = getInstallationPreferences();

const defaultEmailSig = {
  ...getUserEmailSignature(installationPreferences.defaultEmailAddress),
  email: installationPreferences.defaultEmailAddress,
};
const altEmailSigs = userPreferences.altSendEmailAs.map((email) => ({
  ...getUserEmailSignature(email),
  email,
}));

const emailSignatures = userPreferences.altSendIsPrimary
  ? [...altEmailSigs, defaultEmailSig]
  : [defaultEmailSig, ...altEmailSigs];

const updateLocalStorage = (newEmailSignature, index) => {
  if (index > -1) emailSignatures[index] = newEmailSignature;
  setItem("userPreferences", {
    ...userPreferences,
    emailSignatures: [...emailSignatures],
  });
};

const createOrUpdateSignature = ({
  signature,
  selectedIndex,
  setView,
  modalActions,
  iln,
}) => {
  if (signature.id && signature.id !== -1) {
    api.updateEmailSignature(signature, modalActions, iln).then((res) => {
      updateLocalStorage(res, selectedIndex);
      setView("success");
    });
  } else {
    api
      .createEmailSignature({ ...signature, caseworkerID }, modalActions, iln)
      .then((res) => {
        updateLocalStorage(res, selectedIndex);
        setView("success");
      });
  }
};

const CKconfig = getUserCKEditorConfig("email");

const ManageEmailSignatures = ({ modalID }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [view, setView] = useState("edit");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [signatureText, setSignatureText] = useState(
    emailSignatures[0].signature
  );
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  return (
    <Switcher selected={view}>
      {{
        edit: (
          <div className={classes.editModal}>
            <FlexBox hAlign="space-between">
              <div className={classes.emailColumn}>
                {emailSignatures.map((es, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedIndex(idx);
                      setSignatureText(es.signature);
                    }}
                    className={classnames(
                      classes.button,
                      selectedIndex === idx && classes.selected,
                      idx === 0 && classes.firstButton
                    )}
                  >
                    {es.email}
                  </button>
                ))}
              </div>
              <div className={classes.ckeditorContainer}>
                <CKEditor
                  name="emailSignature"
                  data={signatureText}
                  onChange={(e) => setSignatureText(() => e.target.value)}
                  keepErrorSpacing={false}
                  config={CKconfig}
                />
              </div>
            </FlexBox>
            <FlexBox hAlign="flex-end">
              <Button
                onClick={() =>
                  createOrUpdateSignature({
                    signature: {
                      ...emailSignatures[selectedIndex],
                      signature: signatureText,
                    },
                    selectedIndex,
                    setView,
                    modalActions,
                    iln,
                  })
                }
              >
                {iln.gettext("Save Signature")}
              </Button>
            </FlexBox>
          </div>
        ),
        success: (
          <div className={classes.successModal}>
            <p>{iln.gettext("Successfully updated email signature.")}</p>
            <FlexBox>
              <Button onClick={() => modalActions.removeById(modalID)}>
                {iln.gettext("OK")}
              </Button>
            </FlexBox>
          </div>
        ),
      }}
    </Switcher>
  );
};

ManageEmailSignatures.propTypes = {
  modalID: propTypes.string.isRequired,
};

export default ManageEmailSignatures;
