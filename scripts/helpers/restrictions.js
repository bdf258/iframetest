import { getPermissionOptions, userIdentity } from "./localStorageHelper";

import $ from "jquery";
import api from "../api/protected.index";

const loadRestrictions = async (
  currentOptions,
  restrictionsFor = "",
  permissionsEnabled = false
) => {
  let caseworkersSource = [];
  if (!getPermissionOptions() || getPermissionOptions().displayCaseworkers)
    caseworkersSource = JSON.parse(localStorage.getItem("caseworkers"));
  const groupsSource =
    // for segments get only group with all users if permissions are disabled
    restrictionsFor == "segmentShare" && permissionsEnabled == false
      ? api.getGroups(undefined, 1)
      : userIdentity.id === 1 || restrictionsFor == "segmentShare"
      ? api.getGroups()
      : api.getOwnGroups();
  const [caseworkers, groups] = await Promise.all([
    caseworkersSource,
    groupsSource,
  ]);
  let options = caseworkers
    .filter((caseworker) => caseworker.active == true)
    .map((caseworker) => ({
      id: `c_${caseworker.ID}`,
      text: caseworker.caseworkerName,
      selected: currentOptions.find(
        (element) =>
          element.id == `${caseworker.ID}` && element.type === "caseworker"
      ),
    }));
  options = options.concat(
    groups.map((group) => ({
      id: `g_${group.id}`,
      text: group.name,
      selected: currentOptions.find(
        (element) => element.id == `${group.id}` && element.type === "group"
      ),
    }))
  );

  $("#restrictions")
    .select2({
      data: options,
      multiple: true,
    })
    .on("select2:unselect", (e) => {
      let restriction = e.params.data.id;

      let current = $("#deletedPermissions").val();
      if (!current || current == "") current = [];
      else current = JSON.parse($("#deletedPermissions").val());
      current.push({
        id: restriction.replace(/(c_|g_)/, ""),
        type: restriction.substring(0, 2) == "c_" ? "caseworker" : "group",
        deleted: true,
        view: false,
      });
      $("#deletedPermissions").val(JSON.stringify(current));
    })
    .on("change", () => {
      const selected = $("#restrictions").find(":selected");

      window.editingSegment.shared = selected.length > 0;
    });
  let currentSelected = JSON.parse($("#restrictions").attr("data-current")).map(
    (element) => {
      return element.id;
    }
  );
  $("#restrictions").val(currentSelected);
  $("#restrictions").trigger("change.select2");
};

export { loadRestrictions };
