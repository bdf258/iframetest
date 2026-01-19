import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const Validate = React.lazy(() => import("../components/Validate/Page.jsx"));

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <Validate />
        </Providers>
      </Suspense>,
      document.getElementById("validateReactApp")
    );
  },
};
