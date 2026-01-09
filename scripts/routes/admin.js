import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const ExportTag = React.lazy(() => import("../components/ExportTag.jsx"));
const ExportFlag = React.lazy(() => import("../components/ExportFlag.jsx"));

export default {
  init() {
    ReactDom.render(
      <Providers>
        <Suspense fallback={<ComponentLoading />}>
          <ExportTag />
        </Suspense>
      </Providers>,
      document.getElementById("exportTag")
    );
    ReactDom.render(
      <Providers>
        <Suspense fallback={<ComponentLoading />}>
          <ExportFlag />
        </Suspense>
      </Providers>,
      document.getElementById("exportFlag")
    );
  },
};
