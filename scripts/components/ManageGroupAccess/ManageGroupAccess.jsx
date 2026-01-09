/*global $*/
import {
  Button,
  FlexBox,
  ModalContext,
  Paragraph,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import SelectedGroup from "./SelectedGroup.jsx";
import Selector from "./Selector.jsx";
import api from "../../api/protected.index.js";
import groupsAPI from "../../api/src/groupsApi.js";
import propTypes from "prop-types";

function ManageGroupAccess({ caseID, reset }) {
  useEffect(() => {
    setSelectedGroups([]);
    async function getData() {
      await getGroups();
      await getFilteredGroups();
      caseID ? getInitialGroups(caseID) : null;
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [caseworkers, setCaseworkers] = useState([]);
  const { modalActions } = useContext(ModalContext);
  useEffect(() => {
    getCaseworkers();
  }, []);
  useEffect(() => {
    getFilteredGroups();
    getFilteredWorkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroups]);
  const getFilteredGroups = () => {
    let filteredArray = [];
    const groupIds = [];
    selectedGroups.map((selGroup) =>
      "entity_id" in selGroup
        ? groupIds.push(selGroup.group_id)
        : groupIds.push(selGroup.id)
    );
    groups.map((group) => {
      groupIds.some((id) => id == group.id) ? null : filteredArray.push(group);
    });
    filteredArray = [{ id: 9999, name: "--- Groups ---" }, ...filteredArray];
    setFilteredGroups([...filteredArray]);
  };
  const getCaseworkers = async () => {
    const cw = await api.getCaseworkers();
    const active = cw && cw.filter((c) => c.active == true);
    const idAdded = active.map((w) => {
      return {
        ...w,
        caseworker_id: w.id,
        id: w.id + "cw",
      };
    });
    setCaseworkers([{ id: 9999, name: "--- Case Workers ---" }, ...idAdded]);
  };
  const getFilteredWorkers = () => {
    let filteredArray = [];
    let workerIds = [];
    selectedGroups.map((selGroup) => {
      "caseworker_id" in selGroup
        ? workerIds.push(selGroup.caseworker_id)
        : null;
    });
    caseworkers.map((worker) => {
      workerIds.some((id) => id === worker.caseworker_id)
        ? null
        : filteredArray.push(worker);
    });
    setFilteredWorkers([...filteredArray]);
  };

  const getInitialGroups = async (id) => {
    const res = await groupsAPI.getCasePermissions(id, modalActions);
    if (res) {
      setSelectedGroups(() => res);
    }
  };
  const getGroups = async () => {
    const res = await groupsAPI.getGroups(modalActions);
    if (res) {
      setGroups(() => res);
    }
  };
  const selectGroup = (e) => {
    const id = e.target.value;
    if (typeof id == "string" && id.includes("cw")) {
      if (!selectedGroups.some((group) => group.caseworker_id == id)) {
        let temp = {
          ...caseworkers.filter((cw) => cw.id == id)[0],
          edit: true,
          view: true,
          delete: true,
          manage: true,
        };
        setSelectedGroups((selectedGroups) => [...selectedGroups, temp]);
      }
    } else {
      if (!selectedGroups.some((group) => group.id == id)) {
        setSelectedGroups((selectedGroups) => [
          ...selectedGroups,
          { ...groups.filter((group) => group.id == id)[0], group_id: id },
        ]);
      }
    }
    e.target.value = "0";
  };
  const saveChanges = (id, property, value) => {
    setSelectedGroups((selectedGroups) =>
      selectedGroups.map((group) => {
        if (group.id === id) {
          return { ...group, [property]: value };
        }
        return group;
      })
    );
  };
  const removeGroup = (id) => {
    setSelectedGroups((selectedGroups) =>
      selectedGroups.filter((group) => group.id != id)
    );
  };

  const update = async () => {
    const res = await groupsAPI.updateCasePermissions(
      caseID,
      selectedGroups,
      modalActions
    );
    if (res) {
      $("#managePermissions").trigger("reveal:close");
      window.location.href = `/viewcase.php?caseID=${caseID}`;
    }
  };
  const minWidth = 80;
  return (
    <React.Fragment>
      <h2>Manage Groups Permissions</h2>
      <Paragraph>
        Update sharing settings below. Changes will not take effect until you
        press save
      </Paragraph>
      <FlexBox>
        <Table>
          <TableHead>
            <TableHeader minWidth={minWidth}>Group / Caseworker</TableHeader>
            <TableHeader minWidth={minWidth}>View</TableHeader>
            <TableHeader minWidth={minWidth}>Edit</TableHeader>
            <TableHeader minWidth={minWidth}>Delete</TableHeader>
            <TableHeader minWidth={minWidth}>Manage Permissions</TableHeader>
            <TableHeader minWidth={minWidth}>Remove</TableHeader>
          </TableHead>
          <TableBody>
            {selectedGroups.map((group) => (
              <SelectedGroup
                key={group.id}
                group={group}
                saveChanges={saveChanges}
                removeGroup={removeGroup}
                canEdit={group.manage}
              />
            ))}
            <TableRow>
              <TableCell>
                <Selector
                  data={filteredGroups.concat(filteredWorkers)}
                  selectData={selectGroup}
                  dataType={"Groups"}
                  text="Add Group / Caseworkers"
                  optionGroups={true}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </FlexBox>
      <Button size="medium" onClick={() => update()}>
        Save
      </Button>
    </React.Fragment>
  );
}

ManageGroupAccess.propTypes = {
  caseID: propTypes.oneOfType([propTypes.string, propTypes.number]),
  reset: propTypes.bool,
};

export default ManageGroupAccess;
