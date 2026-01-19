import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const CaseTemplateManager = React.lazy(() =>
  import("../components/Tools/CaseTemplateManager/CaseTemplateManager.jsx")
);

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <CaseTemplateManager />
        </Providers>
      </Suspense>,
      document.getElementById("app")
    );
  },
};
