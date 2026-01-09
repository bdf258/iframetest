import React, { useContext } from "react";

import ConstituentLink from "./common/ConstituentLink/ConstituentLink.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../../../../../../../context/translation/TranslationContext.js";
import YesNoButtons from "./common/YesNoButtons/YesNoButtons.jsx";
import { allowInboxSuggestChangedEmail } from "../../../../../../../../../../consts/disabledFeatures.js";
import api from "@electedtech/api";
import propTypes from "./AddContactDetailToConstituent.propTypes.js";
import useStyles from "./AddContactDetailToConstituent.styles.js";

const AddContactDetailToConstituent = ({
  modalID,
  constituent,
  email,
  mobile,
}) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  if (email) {
    const hasNoEmail = constituent?.email.length === 0;

    if (hasNoEmail)
      return (
        <div className={classes.addContactToConstituent}>
          <p>
            <ConstituentLink constituent={constituent} />{" "}
            {iln.gettext("currently has no email address on file.")}
          </p>
          <p>
            {iln.gettext("Do you want to add")} <strong>{email}</strong>{" "}
            {iln.gettext("to their file")}?
          </p>
          <YesNoButtons
            onYesClick={() =>
              api
                .addConstituentContactDetail({
                  constituentID: constituent.id,
                  contactTypeID: 4,
                  source: "inbox",
                  value: email,
                  primary: true,
                })
                .then(() => {
                  modalActions.removeById(modalID);
                })
            }
            onNoClick={() => {
              modalActions.removeById(modalID);
            }}
          />
        </div>
      );

    const emailOnFile = (constituent?.email || []).some(
      ({ value }) => value.trim().toLowerCase() === email
    );

    if (!emailOnFile && allowInboxSuggestChangedEmail)
      return (
        <div className={classes.addContactToConstituent}>
          <p>
            <ConstituentLink constituent={constituent} />{" "}
            {iln.ngettext(
              "currently has the email address %2 on file.",
              "currently has the email addresses %2 on file.",
              constituent?.email.length,
              constituent?.email.map(({ value }) => value).join(", ")
            )}
          </p>
          <p>
            {iln.gettext("Do you want to add")} <strong>{email}</strong>{" "}
            {iln.gettext("to their file")}?
          </p>
          <YesNoButtons
            onYesClick={() =>
              api
                .addConstituentContactDetail({
                  constituentID: constituent.id,
                  contactTypeID: 4,
                  source: "inbox",
                  value: email,
                  primary: false,
                })
                .then(() => {
                  modalActions.removeById(modalID);
                })
            }
            onNoClick={() => {
              modalActions.removeById(modalID);
            }}
          />
        </div>
      );
  }

  if (mobile) {
    const hasNoMobile = constituent?.mobile.length === 0;

    if (hasNoMobile)
      return (
        <div className={classes.addContactToConstituent}>
          <p>
            <ConstituentLink constituent={constituent} />{" "}
            {iln.gettext("currently has no mobile number on file.")}
          </p>
          <p>
            {iln.gettext("Do you want to add")} <strong>{mobile}</strong>{" "}
            {iln.gettext("to their file")}?
          </p>
          <YesNoButtons
            onYesClick={() =>
              api
                .addConstituentContactDetail({
                  constituentID: constituent.id,
                  contactTypeID: 3,
                  source: "inbox",
                  value: mobile,
                  primary: true,
                })
                .then(() => {
                  modalActions.removeById(modalID);
                })
            }
            onNoClick={() => {
              modalActions.removeById(modalID);
            }}
          />
        </div>
      );

    const mobileOnFile = (constituent?.mobie || []).some(
      ({ value }) => value.trim().toLowerCase() === email
    );

    if (!mobileOnFile && allowInboxSuggestChangedEmail)
      return (
        <div className={classes.addContactToConstituent}>
          <p>
            <ConstituentLink constituent={constituent} />{" "}
            {iln.ngettext(
              "currently has the mobile number %2 on file.",
              "currently has the mobile numbers %2 on file.",
              constituent?.mobile.length,
              constituent?.mobile.map(({ value }) => value).join(", ")
            )}
          </p>
          <p>
            {iln.gettext("Do you want to add")} <strong>{mobile}</strong>{" "}
            {iln.gettext("to their file")}?
          </p>
          <YesNoButtons
            onYesClick={() =>
              api
                .addConstituentContactDetail({
                  constituentID: constituent.id,
                  contactTypeID: 3,
                  source: "inbox",
                  value: mobile,
                  primary: true,
                })
                .then(() => {
                  modalActions.removeById(modalID);
                })
            }
            onNoClick={() => {
              modalActions.removeById(modalID);
            }}
          />
        </div>
      );
  }
  return null;
};

AddContactDetailToConstituent.propTypes = propTypes;

export default AddContactDetailToConstituent;
