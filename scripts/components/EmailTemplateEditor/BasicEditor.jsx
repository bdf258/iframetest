import React, { useEffect, useState } from "react";

import ElectedTechCKEditor from "@electedtech/electedtech-ckeditor";
import { createUseStyles } from "react-jss";
import propTypes from "prop-types";

const useStyles = createUseStyles({
  container: {
    width: 100 + "%",
  },
});

const BasicEditor = ({
  basicEditorContent,
  setBasicEditorContent,
  triggerAutosaveOnUpdate,
}) => {
  const [initTemplate, setInitTemplate] = useState("");
  const [templateLoaded, setTemplateLoaded] = useState(false);
  useEffect(() => {
    setInitTemplate(basicEditorContent);
    if (basicEditorContent) {
      setTemplateLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basicEditorContent]);

  const classes = useStyles();
  return (
    <>
      {templateLoaded && (
        <ElectedTechCKEditor
          name="body"
          data={initTemplate}
          onChange={(e) => {
            setBasicEditorContent(() => e.target.value);
            triggerAutosaveOnUpdate();
          }}
          customClassNames={{ container: classes.container }}
          config={{
            extraPlugins:
              "panelbutton,colorbutton,autolink,button-link,signatureblock",
            removePlugins: "elementspath",
            contentsCss: "ckeditorv4/emailscss.php",
          }}
        />
      )}
    </>
  );
};
BasicEditor.propTypes = {
  basicEditorContent: propTypes.string,
  setBasicEditorContent: propTypes.func,
  triggerAutosaveOnUpdate: propTypes.func,
};
export default BasicEditor;
