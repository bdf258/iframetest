import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const TagManager = React.lazy(() =>
  import("../components/Tools/TagManager/TagManager.jsx")
);

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <TagManager />
        </Providers>
      </Suspense>,
      document.getElementById("app")
    );
  },
};
