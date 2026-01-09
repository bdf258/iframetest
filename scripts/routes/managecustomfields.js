import React, { Suspense } from "react";

import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const CustomFields = React.lazy(() =>
  import("../components/Tools/CustomFieldsManager/CustomFieldManager.jsx")
);

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<div>Loading...</div>}>
        <Providers>
          <CustomFields />
        </Providers>
      </Suspense>,
      document.getElementById("caseapp")
    );
  },
};
