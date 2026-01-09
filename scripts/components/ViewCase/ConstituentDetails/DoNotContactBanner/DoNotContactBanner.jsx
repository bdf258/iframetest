import React, { useContext } from "react";

import { NotificationBox } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import propTypes from "./DoNotContactBanner.propTypes.js";
import { useStyles } from "./DoNotContactBanner.styles.js";

const DoNotContactBanner = ({
  selectedDoNotContacts,
  doNotContactTypes = {},
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  if (selectedDoNotContacts.length === 0) return null;

  return (
    <NotificationBox
      type="alert"
      alertMessage={selectedDoNotContacts
        .map(
          (id) =>
            doNotContactTypes[id] ||
            iln.gettext("Do not contact (Unknown type)")
        )
        .join(", ")}
      customClassNames={{ container: classes.doNotContactBanner }}
    />
  );
};

DoNotContactBanner.propTypes = propTypes;

export default DoNotContactBanner;
