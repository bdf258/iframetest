/* global constituentID */
import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";
import viewConstituentStore from "../store/viewConstituentStore.js";

const CreateCase = React.lazy(() =>
  import("../components/common/CreateCase/CreateCase.jsx")
);

const ConstituentMap = React.lazy(() =>
  import("../components/ConstituentPage/ConsistuentMap.jsx")
);

const MergeConstituents = React.lazy(() =>
  import(
    "../components/ViewConstituent/MergeConstituents/MergeConstituents.jsx"
  )
);

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <CreateCase
            constituentID={constituentID}
            onCreateCase={({ id: caseID }) => {
              window.location.href = `/viewcase.php?caseID=${caseID}`;
            }}
          />
        </Providers>
      </Suspense>,
      document.getElementById("createCaseReactApp")
    );
    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <ConstituentMap />
        </Providers>
      </Suspense>,
      document.getElementById("constituentMapReactApp")
    );

    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers reduxStore={viewConstituentStore}>
          <MergeConstituents />
        </Providers>
      </Suspense>,
      document.getElementById("mergeconstituents")
    );
  },
};
