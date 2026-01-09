import React, { useContext } from "react";
import { NotificationBox } from "@electedtech/electedtech-ui";
import PropTypes from "prop-types";
import TranslationContext from "../../../../context/translation/TranslationContext";

const DeceasedBanner = ({ isDeceased }) => {
  const iln = useContext(TranslationContext);

  return (
    <React.Fragment>
      {isDeceased && (
        <NotificationBox type="alert" alertMessage={iln.gettext("Deceased")} />
      )}
    </React.Fragment>
  );
};

DeceasedBanner.propTypes = {
  isDeceased: PropTypes.bool.isRequired,
};

export default DeceasedBanner;
