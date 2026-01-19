import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import MergeCodeListLegacyWrapper from "../components/common/MergeCodeListLegacyWrapper/MergeCodeListLegacyWrapper.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";
import injectCCs from "../helpers/injectCCs";
import { loadRestrictions } from "../helpers/restrictions";

/*global $ */
export default {
  init() {
    import("../helpers/ckeditor").then((CKEDITOR) => {
      new CKEDITOR.default("letter", {
        selector: "editor1",
        height: "500px",
        autocorrect_enabled: true,
        removePlugins: "link,image",
        line_height: "1;1.1;1.15;1.2;1.5;1.75;2",
        extraPlugins: "lineheight,printenvelope",
      });
      $(document).on("injectCCs", injectCCs);
    });
    const currentOptions = $("#restrictions").data("current");

    loadRestrictions(currentOptions);

    /**
     * This is used by multiple routes:
     * Legacy email and letter template editor pages.
     * Legacy write a letter and email.
     */
    const mergeCodeContainerId = "letterTemplateEditorMergeCodeContainer";

    if (!document.getElementById(mergeCodeContainerId)) {
      return;
    }

    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <MergeCodeListLegacyWrapper type={"letter"} />
        </Providers>
      </Suspense>,
      document.getElementById(mergeCodeContainerId)
    );
  },
};
