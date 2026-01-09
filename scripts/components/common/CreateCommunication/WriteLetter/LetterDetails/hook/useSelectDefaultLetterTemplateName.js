import { useEffect } from "react";

const useSelectDefaultLetterTemplateName = (
  selectedTemplateName,
  letterTemplates,
  letterTemplateSelectInputName,
  onChange
) => {
  useEffect(() => {
    if (!letterTemplates) return;
    if (letterTemplates.length === 0) return;

    const selectedTemplate = letterTemplates.find(
      ({ name }) => name === selectedTemplateName
    );
    onChange({
      target: {
        value: selectedTemplate?.id || letterTemplates[0].id,
        name: letterTemplateSelectInputName,
      },
    });
  }, [letterTemplates]);
};

export default useSelectDefaultLetterTemplateName;
