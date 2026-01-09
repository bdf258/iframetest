import {
  FormSelectAutoComplete,
  FormTextInput,
  ModalContext,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import { LetterDetailsPlaceholder } from "./LetterDetailsPlaceholder/LetterDetailsPlaceholder.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import classnames from "classnames";
import propTypes from "./LetterDetails.propTypes";
import useLetterTemplates from "./hook/useLetterTemplates";
import useSelectDefaultLetterTemplateName from "./hook/useSelectDefaultLetterTemplateName";
import useSelectedLetterTemplate from "./hook/useSelectLetterTemplate";
import useStyles from "./LetterDetails.styles";

const LetterDetails = ({ onLetterDetailsChange, letterDetails }) => {
  const classes = useStyles();

  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const {
    addressedTo,
    letterheadId,
    letterTemplateId,
    letterTemplateName,
    letterRef,
  } = letterDetails;
  const letterheadSelectInputName = "letterheadId";
  const letterTemplateSelectInputName = "letterTemplateId";

  const sortTemplatesAlphabetically = (templates) =>
    templates.sort((a, b) => a.name.localeCompare(b.name));

  const onChange = ({ target: { value, name } }) => {
    onLetterDetailsChange({ ...letterDetails, [name]: value });
  };

  const [letterTemplates] = useLetterTemplates(letterTemplateName);
  const [letterheads, setLetterheads] = useState();

  useSelectDefaultLetterTemplateName(
    letterTemplateName,
    letterTemplates,
    letterTemplateSelectInputName,
    onChange
  );

  useSelectedLetterTemplate(
    letterheadId,
    letterheads,
    letterheadSelectInputName,
    onChange
  );

  useEffect(() => {
    api
      .searchLetterHeaders(
        {
          term: "",
          active: true,
          columnsToReturn: ["id", "name"],
        },
        modalActions,
        iln
      )
      .then((letterheads) => setLetterheads(letterheads))
      .catch(() => {
        setLetterheads([]);
      });
  }, []);

  /*
   * On selecting a letter template, set the letter reference input to the selected
   * letter templates name if the template is not a default letter template
   */
  const handleLetterTemplateChange = ({
    target: { value: letterTemplateId, name },
  }) => {
    const letterTemplate = letterTemplates.find(
      ({ id }) => id === letterTemplateId
    );

    onLetterDetailsChange({
      ...letterDetails,
      [name]: letterTemplateId,
      letterRef: letterTemplate.name,
    });
  };

  if (!letterTemplates || !letterheads) {
    return <LetterDetailsPlaceholder />;
  }

  return (
    <React.Fragment>
      <h3>{iln.gettext("Letter details")}</h3>
      <FormTextInput
        readOnly
        name={"addressedTo"}
        label={iln.gettext("Addressed To")}
        onChange={onChange}
        value={addressedTo}
        keepErrorSpacing={false}
        customClassNames={{
          container: classnames(
            classes.inputContainer,
            classes.inputSpaceBelow
          ),
          label: classes.label,
        }}
      />
      <FormSelectAutoComplete
        name={letterheadSelectInputName}
        label={iln.gettext("Letterhead to use")}
        onChange={onChange}
        value={letterheadId}
        keepErrorSpacing={false}
        customClassNames={{
          container: classnames(
            classes.inputContainer,
            classes.inputSpaceBelow
          ),
          label: classes.label,
        }}
      >
        {sortTemplatesAlphabetically(letterheads).map(({ name, id }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </FormSelectAutoComplete>
      <FormSelectAutoComplete
        name={letterTemplateSelectInputName}
        label={iln.gettext("Template to use")}
        onChange={handleLetterTemplateChange}
        value={letterTemplateId}
        keepErrorSpacing={false}
        customClassNames={{
          container: classnames(
            classes.inputContainer,
            classes.inputSpaceBelow
          ),
          label: classes.label,
        }}
      >
        {sortTemplatesAlphabetically(letterTemplates).map(({ name, id }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </FormSelectAutoComplete>
      <FormTextInput
        name={"letterRef"}
        label={iln.gettext("Letter name")}
        onChange={onChange}
        value={letterRef}
        keepErrorSpacing={false}
        customClassNames={{
          container: classnames(
            classes.inputContainer,
            classes.inputSpaceBelow
          ),
          label: classes.label,
        }}
      />
    </React.Fragment>
  );
};

LetterDetails.propTypes = propTypes;
export default LetterDetails;
