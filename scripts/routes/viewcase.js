import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";
import viewCaseStore from "../store/viewCaseStore.js";

const CasePage = React.lazy(() =>
  import("../components/ViewCase/ViewCasePage.jsx")
);

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers reduxStore={viewCaseStore}>
          <CasePage />
        </Providers>
      </Suspense>,
      document.getElementById("viewCaseReactApp")
    );
  },
};
