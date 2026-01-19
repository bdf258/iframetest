import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";
import { getQueryStringParamMap } from "../helpers/queryString.js";

const CreateCase = React.lazy(() =>
  import("../components/common/CreateCase/CreateCase.jsx")
);

export default {
  init() {
    const queryStrings = getQueryStringParamMap();
    const constituentID = parseInt(queryStrings.get("constituentID"));

    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          {isNaN(constituentID) ? (
            <p>constituentID required</p>
          ) : (
            <CreateCase
              constituentID={constituentID}
              onCreateCase={({ id: caseID }) =>
                (window.location.href = `/viewcase.php?caseID=${caseID}`)
              }
            />
          )}
        </Providers>
      </Suspense>,
      document.getElementById("createCaseApp")
    );
  },
};
