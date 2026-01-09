import {
  Button,
  FlexBox,
  ModalContext,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import EditGroup from "./EditGroup.jsx";
import ModalLink from "./ModalLink.jsx";
import groupsAPI from "../../api/src/groupsApi.js";
import propTypes from "prop-types";

function CurrentGroups({ refresh, groupChanged }) {
  const [groups, setGroups] = useState([]);
  const { modalActions } = useContext(ModalContext);
  useEffect(() => {
    getGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const getGroups = async () => {
    const res = await groupsAPI.getGroups(modalActions);

    if (res) {
      setGroups(() => res);
    }
  };
  const deleteGroup = async (id) => {
    await groupsAPI.deleteGroup(id, modalActions);
    getGroups();
  };

  return (
    <React.Fragment>
      <FlexBox style={{ marginBottom: 0 }}>
        <Table>
          <TableHead>
            <TableHeader>Group ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader style={{ width: 150 + "px" }}>Actions</TableHeader>
          </TableHead>
          <TableBody>
            {groups.map((group) => (
              <React.Fragment key={group.id}>
                <TableRow>
                  <TableCell textAlign={"center"} verticalAlign={"center"}>
                    {group.id}
                  </TableCell>
                  <TableCell textAlign={"center"} verticalAlign={"center"}>
                    {group.name}
                  </TableCell>
                  <TableCell textAlign={"center"} verticalAlign={"center"}>
                    <FlexBox hAlign="center">
                      <div>
                        <ModalLink
                          component={
                            <EditGroup
                              groupChanged={groupChanged}
                              group={group}
                            />
                          }
                          title={"Edit Group"}
                          linkText={"EDIT"}
                        />
                      </div>
                      <span>&nbsp;/&nbsp; </span>
                      <div>
                        <Button
                          type="text"
                          value={group.id}
                          onClick={() => deleteGroup(group.id)}
                        >
                          DELETE
                        </Button>
                      </div>
                    </FlexBox>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </FlexBox>
    </React.Fragment>
  );
}

CurrentGroups.propTypes = {
  groupChanged: propTypes.func.isRequired,
  refresh: propTypes.bool.isRequired,
};
export default CurrentGroups;
