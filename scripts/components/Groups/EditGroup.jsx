import {
  Button,
  FlexBox,
  FormHandler,
  FormTextInput,
  ModalContext,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useRef, useState } from "react";

import CheckBox from "../ManageGroupAccess/CheckBox.jsx";
import Selector from "../ManageGroupAccess/Selector.jsx";
import groupsAPI from "../../api/src/groupsApi.js";
import propTypes from "prop-types";

const properties = ["view", "edit", "delete", "manage"];
const caseWorkers = JSON.parse(localStorage.getItem("caseworkers"))
  .filter((cw) => cw.active != "0")
  .map((cw) => (cw.id ? cw : { ...cw, id: cw.ID }));
function EditGroup({ groupChanged, group }) {
  useEffect(() => {
    getGroupDetails(group.id);
  }, []);
  const { modalActions } = useContext(ModalContext);
  const [users, setUsers] = useState([]);
  const [groupDetails, setGroupDetails] = useState("");
  const [groupPermissions, setGroupPermissions] = useState();
  const [error, setError] = useState("");
  const [existingGroups, setExistingGroups] = useState([]);
  const name = useRef("");
  const scrollRef = useRef("");

  const getGroupDetails = async (id) => {
    const res = await groupsAPI.getGroups(modalActions, id);
    if (res) {
      res[0].name ? (name.current = res[0].name) : null;
      setGroupDetails(...res);
      const { caseworkers, ...props } = res[0];
      setUsers(() => [...caseworkers]);
      setGroupPermissions({ ...props });
    }

    const allGroups = await groupsAPI.getGroups(modalActions);
    if (allGroups) {
      setExistingGroups(() => [...allGroups]);
    }
  };
  useEffect(() => {
    document.addEventListener("keyup", handleKeyPress);
    return () => document.removeEventListener("keyup", handleKeyPress);
  });

  useEffect(() => {
    users && groupPermissions ? updateGroupDetails() : null;
  }, [users, groupPermissions]);

  const selectUser = (e) => {
    const userID = e.target.value;
    if (userID !== "0" && !users.some((user) => user.id == userID)) {
      caseWorkers.map((worker) =>
        worker.id === userID ? setUsers((users) => [...users, worker]) : null
      );
    }
    e.target.value = "0";
  };
  const statusChange = (e) => {
    setGroupPermissions((groupPermissions) => {
      return { ...groupPermissions, [e.target.name]: e.target.value };
    });
  };
  const removeUser = (id) => {
    setUsers((users) => users.filter((user) => user.id !== id));
  };
  const updateGroupDetails = () => {
    setGroupDetails({
      ...groupDetails,
      caseworkers: [...users],
      view: groupPermissions.view,
      edit: groupPermissions.edit,
      delete: groupPermissions.delete,
      manage: groupPermissions.manage,
    });
  };
  const saveDetails = async () => {
    if (groupDetails.name.trim() == "") {
      setError("Please enter name");
    } else if (
      existingGroups &&
      name.current != groupDetails.name &&
      existingGroups.some((grp) => grp.name == groupDetails.name.trim())
    ) {
      setError("A Group with this name already exists");
    } else {
      groupDetails.name = groupDetails.name.trim();
      setError("");
      const res = await groupsAPI.updateGroup(
        groupDetails.id,
        groupDetails,
        modalActions
      );
      if (res.message != "ok") {
        setError(res.message);
      } else {
        modalActions.removeById("Edit Group");
        groupChanged();
      }
    }
  };

  const scrollDown = () => {
    const div = scrollRef.current;
    if (div) {
      //setting timeout to wait for the options to load before it scrolls down
      setTimeout(
        () => div.scrollTo({ top: div.scrollHeight + 100, behavior: "smooth" }),
        10
      );
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      modalActions.removeById("Edit Group");
    }
    if (e.key === "Enter") {
      saveDetails();
    }
  };
  const minWidth = 80;
  return (
    <React.Fragment>
      <div style={{ minWidth: "35vw" }}>
        {/* just to ensure minimum width of the modal} */}
        {groupDetails && (
          <>
            <FormHandler
              state={{ groupName: groupDetails.name }}
              onSubmit={() => {}}
            >
              <FormTextInput
                label={"Name"}
                error={error}
                onChange={(e) =>
                  setGroupDetails((groupDetails) => {
                    return { ...groupDetails, name: e.target.value };
                  })
                }
                name="groupName"
                keepErrorSpacing={false}
              />
            </FormHandler>
            {/* <Heading heading="Group Permissions" size="small"></Heading> */}
            <h3>Group Permissions</h3>
            <Table>
              <TableHead>
                <TableHeader minWidth={minWidth}>View</TableHeader>
                <TableHeader minWidth={minWidth}>Edit</TableHeader>
                <TableHeader minWidth={minWidth}>Delete</TableHeader>
                <TableHeader minWidth={minWidth}>Manage Sharing</TableHeader>
              </TableHead>
              <TableBody>
                {groupPermissions ? (
                  <TableRow>
                    {properties.map((prop) => (
                      <TableCell
                        key={prop}
                        textAlign={"center"}
                        verticalAlign={"center"}
                      >
                        <CheckBox
                          //   readOnly={canEdit ? false : true}
                          statusChange={statusChange}
                          checked={groupPermissions[prop]}
                          name={prop}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>-</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {/* <Heading heading="Members" size="small"></Heading> */}
            <h3>Members</h3>
            <FlexBox style={{ marginBottom: 0 }}>
              <div
                style={{
                  width: "100%",
                }}
                ref={scrollRef}
              >
                <div
                  style={{
                    maxHeight: "35vh",
                    overflowY: "auto",
                    marginBottom: 16,
                  }}
                >
                  <Table style={{ marginBottom: 0 }}>
                    <TableHead>
                      <TableHeader>Name</TableHeader>
                      <TableHeader>Email</TableHeader>
                      <TableHeader>Remove</TableHeader>
                    </TableHead>

                    <TableBody>
                      {users.map((user) => (
                        <React.Fragment key={user.id}>
                          <TableRow>
                            <TableCell
                              textAlign={"center"}
                              verticalAlign={"center"}
                            >
                              {user.caseworkerName}
                            </TableCell>
                            <TableCell
                              textAlign={"center"}
                              verticalAlign={"center"}
                            >
                              {user.email}
                            </TableCell>
                            <TableCell
                              textAlign={"center"}
                              verticalAlign={"center"}
                            >
                              <span
                                role="button"
                                onKeyUp={() => removeUser(user.id)}
                                tabIndex={0}
                                style={{ cursor: "pointer" }}
                                onClick={() => removeUser(user.id)}
                              >
                                X
                              </span>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <Selector
                  data={caseWorkers.filter(
                    (worker) => !users.some((user) => user.id === worker.id)
                  )}
                  value={"caseworkerName"}
                  selectData={selectUser}
                  dataType={"User"}
                  text={"+ Add User to the Group"}
                  onSelectorClick={scrollDown}
                />
              </div>
            </FlexBox>
            <FlexBox hAlign={"flex-end"}>
              <div style={{ marginTop: `${10}px` }}>
                <Button onClick={() => saveDetails()}>Save</Button>
              </div>
            </FlexBox>
          </>
        )}
      </div>
    </React.Fragment>
  );
}

EditGroup.propTypes = {
  group: propTypes.shape({
    id: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    caseworkers: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.oneOfType([propTypes.string, propTypes.number])
          .isRequired,
        caseworkerName: propTypes.string.isRequired,
        email: propTypes.string,
      })
    ),
    delete: propTypes.bool.isRequired,
    view: propTypes.bool.isRequired,
    edit: propTypes.bool.isRequired,
    manage: propTypes.bool.isRequired,
  }),

  groupChanged: propTypes.func,
};

export default EditGroup;
