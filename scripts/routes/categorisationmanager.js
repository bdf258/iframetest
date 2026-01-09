import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const CategorisationManager = React.lazy(() =>
  import("../components/Tools/CategorisationManager")
);

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <CategorisationManager />
        </Providers>
      </Suspense>,
      document.getElementById("categorisationManagerApp")
    );
  },
};
