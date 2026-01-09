/*eslint-disable*/
import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const FlagManager = React.lazy(() =>
  import("../components/FlagManager/FlagManager.jsx")
);

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <FlagManager />
        </Providers>
      </Suspense>,
      document.getElementById("app")
    );
  },
};
