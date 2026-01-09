import {
  Button,
  FormHandler,
  FormTextInput,
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

import CheckBox from "../ManageGroupAccess/CheckBox.jsx";
import groupsAPI from "../../api/src/groupsApi.js";
import propTypes from "prop-types";

function AddGroup({ groupAdded }) {
  const properties = ["view", "edit", "delete", "manage"];
  const { modalActions } = useContext(ModalContext);
  const [error, setError] = useState("");
  const [groupDetails, setGroupDetails] = useState({
    view: true,
    edit: true,
    delete: true,
    manage: true,
    name: "",
  });

  useEffect(() => {
    document.addEventListener("keyup", handleKeyPress);
    return () => document.removeEventListener("keyup", handleKeyPress);
  });

  const statusChange = (e) => {
    let propName = e.target.name;
    let propValue = e.target.value;
    setGroupDetails((groupDetails) => {
      return { ...groupDetails, [propName]: propValue };
    });
  };

  const save = async () => {
    if (groupDetails.name.trim() == "") {
      setError("Please Enter name");
    } else {
      groupDetails.name = groupDetails.name.trim();
      const res = await groupsAPI.createGroup(groupDetails, modalActions);
      if (res) {
        res.result
          ? modalActions.removeById("Add Group")
          : setError(res.message);
        groupAdded();
      }
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      modalActions.removeById("Add Group");
    }
    if (e.key === "Enter") {
      save();
    }
  };
  const minWidth = 100;
  return (
    <React.Fragment>
      <Paragraph>Add group details and set default permissions.</Paragraph>
      <Table>
        <TableHead>
          <TableHeader minWidth={minWidth}>Group</TableHeader>
          <TableHeader minWidth={minWidth}>View</TableHeader>
          <TableHeader minWidth={minWidth}>Edit</TableHeader>
          <TableHeader minWidth={minWidth}>Delete</TableHeader>
          <TableHeader minWidth={minWidth}>Manage Sharing</TableHeader>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell textAlign={"center"} verticalAlign={"center"}>
              <FormHandler onSubmit={() => {}}>
                <FormTextInput
                  onChange={statusChange}
                  value={groupDetails.name}
                  readOnly={false}
                  name="name"
                  keepErrorSpacing={false}
                  error={error}
                />
              </FormHandler>
            </TableCell>
            {properties.map((prop) => (
              <TableCell
                textAlign={"center"}
                verticalAlign={"center"}
                key={prop}
              >
                <CheckBox
                  checked={groupDetails[prop]}
                  name={prop}
                  statusChange={statusChange}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
      <Button onClick={() => save()}>Save</Button>
    </React.Fragment>
  );
}

AddGroup.propTypes = {
  groupAdded: propTypes.func.isRequired,
};

export default AddGroup;
