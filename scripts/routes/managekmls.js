import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const KmlManager = React.lazy(() =>
  import("../components/Tools/KmlManager/index.js")
);

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <KmlManager />
        </Providers>
      </Suspense>,
      document.getElementById("kmlManagerReactApp")
    );
  },
};
