import React, { Suspense } from "react";

import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";
import SegmentFilters from "../components/Segments/SegmentFilters/SegmentFilters.jsx";
import api from "../api/protected.index";
import { loadRestrictions } from "../helpers/restrictions";

/*global $*/

const AddFlag = React.lazy(() =>
  import("../components/flagSegment/AddFlag.jsx")
);

export default {
  init() {
    import("../helpers/ckeditor").then((CKEDITOR) => {
      new CKEDITOR.default("email", { selector: "emailBody", height: "290px" });
      new CKEDITOR.default("letter", {
        selector: "letterBody",
        height: "500px",
      });
    });
    $(window).on("tableDataPage", () =>
      localStorage.setItem(
        "tableDataPage",
        JSON.stringify({
          segmentID: window.tableData.segmentID,
          page: window.tableData.page,
        })
      )
    );
    document
      .getElementsByClassName("addFlagToSegment")[0]
      .addEventListener("click", () =>
        ReactDom.render(
          <Suspense fallback={<ComponentLoading />}>
            <Providers>
              <AddFlag />
            </Providers>
          </Suspense>,
          document.getElementById("addFlagToSegment")
        )
      );
    $(".innercontainer").on("reveal:close", "#useSegment", function () {
      ReactDom.unmountComponentAtNode(
        document.getElementById("addFlagToSegment")
      );
    });

    $(".innercontainer").on("click", ".enableDoorknockUsers", function (e) {
      $(".useSegment").css("display", "none");
      $("#enableDoorknockUsers #surveyID").select2({
        ajax: {
          url: "/api/ajax/doorknocking/surveys",
          dataType: "json",
          processResults: function (data) {
            return {
              results: data.map((survey) => ({
                id: survey.id,
                text: survey.name,
              })),
            };
          },
        },
      });
      $("#enableDoorknockUsers").css("display", "block");
      e.preventDefault();
    });
    $("#enableDoorknockUsers #createDoorknockUsers").click((e) => {
      e.preventDefault();
      $.get(
        `aj_countSegment.php?segmentID=${
          window.model.segments[window.model.editingIndex].ID
        }&emailCount=true`,
        (response) => {
          let check = confirm(
            `You are about to enable ${response.count} user to the doorknocking app. Please confirm`
          );
          if (!check) return false;

          $.post(
            "/api/ajax/doorknocking/users/bulk",
            {
              segmentID: window.model.segments[window.model.editingIndex].ID,
              surveyID: $("#enableDoorknockUsers #surveyID").val(),
            },
            () => $("#useSegment").trigger("reveal:close")
          );
        },
        "json"
      );
    });

    const segmentsRestrictions = async () => {
      if (window.editingSegment.ID === 0) return;
      const currentOptions = await api.getSegment(window.editingSegment.ID);
      let installationPreferences = JSON.parse(
        localStorage.getItem("installationPreferences")
      );
      !Object.values(installationPreferences.disabledFeatures).includes(
        "permissionSystem"
      )
        ? loadRestrictions(currentOptions["restrictions"], "segmentShare", true)
        : loadRestrictions(
            currentOptions["restrictions"],
            "segmentShare",
            false
          );
    };
    segmentsRestrictions();
    window.loadRestrictions = segmentsRestrictions;

    $(document).on("click", "#update-restrictions", (e) => {
      e.preventDefault();
      let restrictions = $("#share.reveal-modal #restrictions").val();
      if (!Array.isArray(restrictions))
        restrictions = [JSON.parse(restrictions)];
      restrictions = restrictions.map((restriction) => {
        if (typeof restriction === "object") return restriction;
        return {
          id: restriction.replace(/(c_|g_)/, ""),
          type: restriction.substring(0, 2) == "c_" ? "caseworker" : "group",
          view: 1,
          edit: 1,
          delete: 1,
        };
      });
      let deleted = {};
      let deletedField = $("#deletedPermissions").val();
      if (deletedField && deletedField != "") {
        deleted = JSON.parse($("#deletedPermissions").val());
        if (restrictions.length > 0) {
          deleted = deleted.filter(
            (del) =>
              !restrictions.some(
                (restriction) =>
                  del.id == restriction?.id && del.type == restriction.type
              )
          );
        }

        deleted = deleted.reduce((returnArray, del) => {
          if (
            !returnArray.some(
              (existing) => existing.id == del.id && existing.type == del.type
            )
          ) {
            returnArray.push(del);
          }
          return returnArray;
        }, []);
        restrictions = restrictions.concat(deleted);
      }

      restrictions = restrictions.filter((restriction) => !!restriction);
      api
        .updateRestrictions(
          Object.assign(
            {},
            { restrictions },
            { id: window.editingSegment.ID, type: "segment" }
          )
        )
        .then(() => {
          $("#share").trigger("reveal:close");
        });
    });

    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          {/*Width matches legacy page width of 410px, legacy page does not use box-sizing*/}
          <div style={{ width: "430px" }}>
            <SegmentFilters />
          </div>
    </Providers>
      </Suspense>,
      document.getElementById("segmentFiltersReactHook")
    );
  },
};
