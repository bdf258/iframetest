import React, { useContext, useEffect, useState } from "react";

import { ModalContext } from "@electedtech/electedtech-ui";
import PermissionsChipInput from "../common/PermissionsChipInput/PermissionsChipInput.jsx";
import api from "../../api/protected.index.js";
import { getPermissionOptions } from "../../helpers/localStorageHelper.js";
import inboxAPI from "../../api/src/inboxApi.js";
import propTypes from "prop-types";

function ManageInbox({ caseworkerId, reset }) {
  //Update component whenever different caseworker is selected
  //or when it is closed without saving so its reset to last saved setting

  const { setModalState } = useContext(ModalContext);
  //to set Error Modal
  const caseWorkersList = JSON.parse(localStorage.getItem("caseworkers"));
  //get all the caseworkers for an installation
  const [delegated, setDelegated] = useState([]);
  //array of caseworkers who have been delegated inbox access
  const [toAdd, setToAdd] = useState([]);
  const [groupsAndUsers, setGroupsAndUsers] = useState([]);

  useEffect(() => {
    getGroups();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseworkerId, reset]);

  const getGroups = async () => {
    const groups = await api.getGroups();
    setGroupsAndUsers([
      ...caseWorkersList
        .filter((c) => c.active == "1")
        .map((c) => ({
          ...c,
          name: c.caseworkerName,
          type: "user",
          group: " User",
          ID: `c_${c.ID}`,
          id: +c.ID,
        })),
      ...groups.map((g) => ({
        ...g,
        type: "group",
        group: "Group",
        ID: `g_${g.id}`,
      })),
    ]);
  };

  useEffect(() => {
    getWorkersAndGroups();
  }, [groupsAndUsers]);

  const getWorkersAndGroups = async () => {
    const res = await inboxAPI.getInboxDetails(caseworkerId, setModalState);
    if (res) {
      const temp = [];
      groupsAndUsers.map((worker) => {
        res.caseworkers.map(
          (resId) =>
            "c_" + resId == worker.ID &&
            worker.type == "user" &&
            temp.push(worker)
        );
        res.groups.map(
          (group) =>
            "g_" + group == worker.ID &&
            worker.type == "group" &&
            temp.push(worker)
        );
      });

      setDelegated([...temp]);
    }
  };

  //get the caseworker whose inbox settings are being changed.
  const caseWorker =
    caseworkerId == 0
      ? { caseworkerName: "Anyone" }
      : groupsAndUsers.filter((worker) => worker.ID == "c_" + caseworkerId)[0];

  useEffect(() => {
    const temp = [];
    groupsAndUsers
      .filter((worker) =>
        !getPermissionOptions() || getPermissionOptions().displayCaseworkers
          ? worker
          : worker.type == "group"
      )
      .map((worker) => {
        if (
          !delegated.some((w) => w.ID == worker.ID) &&
          worker.ID != caseWorker.ID
        ) {
          temp.push(worker);
        }
      });
    //set toAdd array which feeds caseworkers which are not already selected to the selector
    setToAdd([...temp]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delegated]);

  const getIds = (type, array) =>
    array
      .filter((entity) => entity.type == type)
      .map((entity) =>
        entity.id && !isNaN(+entity.id) ? entity.id : entity.ID.substring(2)
      );

  const saveDetails = async ({ target: { value } }) => {
    const obj = {
      caseworkers: getIds("user", value),
      groups: getIds("group", value),
    };
    await inboxAPI.updateInboxDetails(caseworkerId, obj, setModalState);
    await getWorkersAndGroups();
  };
  return (
    <div>
      <h3>Manage Inbox</h3>
      {caseworkerId == 0 ? (
        <p>Following users can access Anyone&apos;s Inbox</p>
      ) : (
        <p>
          {caseWorker &&
            `${caseWorker.caseworkerName}'s Inbox can be accessed by : `}
        </p>
      )}

      {toAdd ? (
        <PermissionsChipInput
          name="InboxDelegation"
          label={"Add / Remove"}
          value={delegated}
          onChange={({ target: { name, value } }) =>
            saveDetails({ target: { name, value } })
          }
          prependGroup={true}
        />
      ) : (
        <h5>Everyone has access to this inbox</h5>
      )}
    </div>
  );
}

ManageInbox.propTypes = {
  caseworkerId: propTypes.oneOfType([propTypes.string, propTypes.number]),
  reset: propTypes.bool,
};

export default ManageInbox;
