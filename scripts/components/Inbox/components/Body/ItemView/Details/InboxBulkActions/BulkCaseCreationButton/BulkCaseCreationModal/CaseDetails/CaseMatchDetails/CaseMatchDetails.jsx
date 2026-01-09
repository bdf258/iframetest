import React, { useContext } from "react";

import CaseTypeSelect from "../../../../../../../../../../common/CaseDetailInputs/CaseTypeSelect.jsx";
import CategorySelect from "../../../../../../../../../../common/CaseDetailInputs/CategorySelect.jsx";
import TagInput from "../../../../../../../../../../common/CaseDetailInputs/TagInput.jsx";
import TranslationContext from "../../../../../../../../../../../context/translation/TranslationContext.js";
import propTypes from "./propTypes.js";
import { useStyles } from "./styles.js";

const CaseMatchDetails = ({ matchDetails, updateState }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const { category, caseType, tagged } = matchDetails;

  return (
    <div>
      <h3>{iln.gettext("Case Match Details")}</h3>
      <CategorySelect
        name="category"
        value={category}
        onChange={updateState}
        includeAnyOption
        customClassNames={{ container: classes.container }}
      />
      <CaseTypeSelect
        name="caseType"
        value={caseType}
        onChange={updateState}
        customClassNames={{ container: classes.container }}
      />
      <TagInput
        name="tagged"
        value={tagged}
        onChange={updateState}
        label={iln.gettext("Tagged")}
        customClassNames={{ container: classes.container }}
      />
    </div>
  );
};

CaseMatchDetails.propTypes = propTypes;

export default CaseMatchDetails;
