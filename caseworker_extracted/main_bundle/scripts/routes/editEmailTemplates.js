import React, { Suspense } from "react";
import { test, userCanDoTemplates } from "../helpers/permissions";

import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const EmailTemplateEditorContainer = React.lazy(() =>
  import(
    "../components/Tools/EmailTemplateEditor/EmailTemplateEditorContainer.jsx"
  )
);

export default {
  init() {
    (async () => {
      const app = document.getElementById("app");
      const templateId = app.dataset.id;
      const templateName = app.dataset.templateName;
      let advanceEditorAllowed;

      try {
        advanceEditorAllowed = await test(userCanDoTemplates());
      } catch (e) {
        advanceEditorAllowed = false;
      }
      ReactDom.render(
        <Suspense fallback={<ComponentLoading />}>
          <Providers>
            <EmailTemplateEditorContainer
              templateId={templateId}
              templateName={templateName}
              advanceEditorAllowed={advanceEditorAllowed}
            />
          </Providers>
        </Suspense>,
        document.getElementById("app")
      );
    })();
  },
};
