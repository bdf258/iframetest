import React, { useState } from "react";
import { TableCell, TableRow } from "@electedtech/electedtech-ui";

import CheckBox from "./CheckBox.jsx";
import { createUseStyles } from "react-jss";
import propTypes from "prop-types";

const useStyles = createUseStyles({
  type: {
    color: "grey",
    fontWeight: "bolder",
    fontSize: ".6em",
  },
});
function SelectedGroup({ group, saveChanges, removeGroup, canEdit = true }) {
  const properties = ["view", "edit", "delete", "manage"];
  const [groupStatus, setGroupStatus] = useState(group);
  const statusChange = (e) => {
    const val = e.target.name.split(":");
    const groupId = parseInt(val[0]);
    const property = val[1];
    setGroupStatus((prevState) => ({
      ...prevState,
      [property]: !groupStatus[property],
    }));
    saveChanges(groupId, property, !groupStatus[property]);
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      <TableRow key={groupStatus.id}>
        <TableCell textAlign={"center"} verticalAlign={"center"}>
          {"caseworker_id" in group && group.caseworker_id != 0 ? (
            <>
              {group.name} <span className={classes.type}>(caseworker)</span>
            </>
          ) : (
            <>
              {group.name} <span className={classes.type}>(group)</span>
            </>
          )}
        </TableCell>
        {properties.map((prop) => (
          <TableCell textAlign={"center"} verticalAlign={"center"} key={prop}>
            <CheckBox
              readOnly={prop == "manage" ? true : canEdit ? false : true}
              statusChange={statusChange}
              checked={groupStatus[prop]}
              name={groupStatus.id + ":" + prop}
            />
          </TableCell>
        ))}
        <TableCell textAlign={"center"} verticalAlign={"center"}>
          {/* eslint-disable-next-line */}
          <span
            style={canEdit ? { cursor: "pointer" } : { cursor: "no-drop" }}
            onClick={() => (canEdit ? removeGroup(groupStatus.id) : null)}
          >
            X
          </span>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
SelectedGroup.propTypes = {
  canEdit: propTypes.bool,
  group: propTypes.shape({
    id: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    name: propTypes.oneOfType([propTypes.string, propTypes.object]).isRequired,
    group_id: propTypes.oneOfType([propTypes.string, propTypes.number]),
    updated_at: propTypes.oneOfType([
      propTypes.string,
      propTypes.arrayOf(propTypes.instanceOf(Date)),
    ]),
    created_at: propTypes.oneOfType([
      propTypes.string,
      propTypes.arrayOf(propTypes.instanceOf(Date)),
    ]),
    entity_type: propTypes.string,
    deleted: propTypes.bool,
    created_by: propTypes.oneOfType([propTypes.string, propTypes.number]),
    caseworker_id: propTypes.oneOfType([propTypes.string, propTypes.number]),
    entity_id: propTypes.oneOfType([propTypes.string, propTypes.number]),
    delete: propTypes.bool.isRequired,
    view: propTypes.bool.isRequired,
    edit: propTypes.bool.isRequired,
    manage: propTypes.bool.isRequired,
  }).isRequired,
  removeGroup: propTypes.func,
  saveChanges: propTypes.func,
};

export default SelectedGroup;
