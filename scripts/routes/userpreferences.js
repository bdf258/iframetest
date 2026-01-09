import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const UserPreferences = React.lazy(() =>
  import("../components/Tools/UserPreferences/UserPreferences.jsx")
);

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <UserPreferences />
        </Providers>
      </Suspense>,
      document.getElementById("userPreferencesReactApp")
    );
  },
};
