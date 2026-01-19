import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const Statistics = React.lazy(() =>
  import("../components/StatisticsContainer.jsx")
);
export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <Statistics />
        </Providers>
      </Suspense>,
      document.getElementById("app")
    );
  },
};
