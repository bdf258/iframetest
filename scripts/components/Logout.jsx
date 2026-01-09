import React, { useContext, useEffect } from "react";

import { TranslationContext } from "context/translate";
import localStorageHelper from "../helpers/localStorageHelper";

const Logout = () => {
  useEffect(() => {
    localStorageHelper.removeAll();
  }, []);
  const iln = useContext(TranslationContext);
  return (
    <div>
      <h2 className="pgHeading pgHeading-yellow">{iln.gettext("Logout")}</h2>
      <div className="indent">
        <br />
        {iln.gettext(
          "Logout completed. Please close this browser window to finish"
        )}
      </div>
    </div>
  );
};

export default Logout;
