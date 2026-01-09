import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import propTypes from "./CaseCount.propTypes.js";

const CaseCount = ({ state }) => {
  const iln = useContext(TranslationContext);

  return (
    <div>
      {iln.ngettext(
        "%1 case matches this search",
        "%1 cases match this search",
        state?.results?.totalResults || 0
      )}
    </div>
  );
};

CaseCount.propTypes = propTypes;

export default CaseCount;
