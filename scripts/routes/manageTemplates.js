import React, { Suspense } from "react";

import $ from "jquery";
import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";
import { preventFormSubmission } from "../helpers/templates";

const EditLetterPermissions = React.lazy(() =>
  import("../components/EditLetterPermissions/EditLetterPermissions.jsx")
);

export default {
  init() {
    $(document).on(
      "submit",
      "form#addtemplate, form#renametemplate, form#edittemplate",
      (event) => preventFormSubmission(event)
    );
    (() => {
      Array.from(document.getElementsByClassName("permissionSelector")).forEach(
        (element) => {
          element.addEventListener("click", function (e) {
            const templateID = e.target.getAttribute("data-id");
            renderComponent(templateID);
          });
        }
      );
    })();
  },
};

const renderComponent = (templateID) => {
  ReactDom.render(
    <Suspense fallback={<ComponentLoading />}>
      <Providers>
        <EditLetterPermissions templateID={templateID} />
      </Providers>
    </Suspense>,
    document.getElementById("editPermissions")
  );
};
