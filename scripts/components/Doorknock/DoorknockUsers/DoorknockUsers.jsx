import {
  Button,
  FlexBox,
  Heading,
  ModalContext,
  Placeholder,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import AddDoorknockingUserForm from "./AddDoorknockingUserForm/AddDoorknockingUserForm.jsx";
import { BulkDoorKnockingUserActions } from "./BulkDoorknockingUserActions/BulkDoorKnockingUserActions.jsx";
import CheckBox from "./common/CheckBox/CheckBox.jsx";
import { DoorknockUserTableActions } from "./common/DoorknockUsersTableActions/DoorknockUserTableActions.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import useStyles from "./DoorknockUsers.styles";

const DoorknockUsers = () => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const classes = useStyles();

  const [caseworkers, setCaseworkers] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [doorknockingUsers, setDoorknockingUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActiveDoorknockingUsers = async () => {
    setDoorknockingUsers(await api.getDoorknockingUsers());
  };

  useEffect(() => {
    async function fetchCaseworkers() {
      const caseworkers = await api.getAllCaseworkers();
      setCaseworkers([
        {
          id: 0,
          label: "",
          name: "",
        },
        ...caseworkers,
      ]);
    }

    async function fetchSurveys() {
      const surveys = await api.getDoorknockSurveys();
      setSurveys([{ id: 0, label: "", name: "", visible: "1" }, ...surveys]);
    }

    Promise.all([fetchCaseworkers(), fetchSurveys()])
      .then(() => {
        fetchActiveDoorknockingUsers();
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  const saveDoorknockPermission = async (payload) => {
    await api.saveDoorknockUser(payload);
    await fetchActiveDoorknockingUsers();
    modalActions.removeById("updateOrCreateCaseTemplate");
  };

  const handleBulkDoorknockingActions = async (
    { users, selectedSurvey, selectedActivationStatus },
    modalId
  ) => {
    if (!users || users.length === 0) return;
    if (!selectedSurvey && !selectedActivationStatus) return;

    const requests = users.map((user) => {
      return api.saveDoorknockUser({
        ...user,
        ...(selectedSurvey && { survey_id: selectedSurvey }),
        ...(selectedActivationStatus && {
          active: selectedActivationStatus === "activate" ? "1" : "0",
        }),
      });
    });

    const editedUsers = await Promise.all(requests);

    const newUsers = doorknockingUsers.map((user) => {
      const userToReplace = editedUsers.find(({ id }) => id === user.id);
      return userToReplace ? userToReplace : user;
    });

    setDoorknockingUsers(() => newUsers);
    setSelectedUsers(() => []);
    modalActions.removeById(modalId);
  };

  const addOrEditEntry = (
    entry = {
      caseworker_id: 0,
      survey_id: 0,
      active: "1",
    }
  ) => {
    modalActions.add({
      customClassNames: {
        card: classes.modalCard,
      },
      id: "updateOrCreateCaseTemplate",
      title: `${
        entry.caseworker_id == 0
          ? iln.gettext("Assign survey to user")
          : iln.gettext(
              "Edit Survey for %1",
              caseworkers.find((cw) => cw.id == entry.caseworker_id)?.name
            )
      }`,
      component: (
        <AddDoorknockingUserForm
          doorknockingUsers={doorknockingUsers}
          caseworkers={caseworkers}
          surveys={surveys.filter((survey) => +survey.visible === 1)}
          saveDoorknockPermission={saveDoorknockPermission}
          entry={entry}
        />
      ),
      blurBackground: true,
      lockWindow: true,
      allowClose: true,
    });
  };
  const handleSelected = (id, selected) => {
    selected
      ? setSelectedUsers((selectedUsers) => [
          ...selectedUsers,
          caseworkers.filter((cw) => cw.id == id)[0].id,
        ])
      : setSelectedUsers((selectedUsers) => [
          ...selectedUsers.filter((selected) => selected != id),
        ]);
  };

  const deleteEntry = async (entry) => {
    Array.isArray(entry)
      ? await api.bulkDeletedDoorknockUsers({ caseworkerIDs: entry })
      : await api.deleteDoorknockUser(entry.caseworker_id);
    setSelectedUsers(() => []);
    await fetchActiveDoorknockingUsers();
  };
  useEffect(() => {}, [selectedUsers]);
  const selectAll = () => {
    setSelectedUsers(() => [
      ...doorknockingUsers.map((user) => "" + user.caseworker_id),
    ]);
  };

  const handleOpenBulkEditDoorknockersModal = () => {
    const bulkEditModal = "bulkEditDoorknockersModal";

    modalActions.add({
      id: bulkEditModal,
      title: iln.gettext("Bulk Doorknocking User Actions"),
      customClassNames: { card: classes.modalCard },
      component: (
        <BulkDoorKnockingUserActions
          surveys={surveys}
          users={doorknockingUsers.filter((user) => {
            return selectedUsers.includes(user.caseworker_id.toString());
          })}
          onCancel={() => {
            modalActions.removeById(bulkEditModal);
          }}
          onSave={({ users, selectedSurvey, selectedActivationStatus }) =>
            handleBulkDoorknockingActions(
              { users, selectedSurvey, selectedActivationStatus },
              bulkEditModal
            )
          }
        />
      ),
    });
  };

  return (
    <div>
      <div className={classes.headingContainer}>
        <FlexBox hAlign={"space-between"} vAlign={"center"}>
          <Heading
            heading={iln.gettext("Door knocking Users")}
            size="medium"
            bold
          />
          <div>
            <DoorknockUserTableActions
              doorknockingUsers={doorknockingUsers}
              deleteSelected={() => deleteEntry(selectedUsers)}
              deselectAll={() => setSelectedUsers(() => [])}
              selectAll={() => selectAll()}
              selectedUsers={selectedUsers}
              bulkEditUsers={() => handleOpenBulkEditDoorknockersModal()}
            />
          </div>
        </FlexBox>
      </div>
      {loading ? (
        <Placeholder height={500} width={"100%"} />
      ) : (
        <React.Fragment>
          <Table>
            <TableHead>
              <TableHeader>{iln.gettext("Select")}</TableHeader>
              <TableHeader>{iln.gettext("Caseworker")}</TableHeader>
              <TableHeader>{iln.gettext("Survey")}</TableHeader>
              <TableHeader>{iln.gettext("Active")}</TableHeader>
              <TableHeader>{iln.gettext("Actions")}</TableHeader>
            </TableHead>
            <TableBody>
              {doorknockingUsers.length > 0 &&
                doorknockingUsers
                  .filter((user) => user.id)
                  .map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell className={classes.tableCell}>
                        <CheckBox
                          id={entry.caseworker_id}
                          checked={
                            !!selectedUsers.find(
                              (userID) => userID == entry.caseworker_id
                            )
                          }
                          handleSelected={handleSelected}
                        />
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {
                          caseworkers.find(
                            (caseworker) =>
                              +caseworker.id === +entry.caseworker_id
                          )?.name
                        }
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {
                          surveys.find(
                            (survey) => survey.id === entry.survey_id
                          )?.name
                        }
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {entry.active === "1" ? "Yes" : "No"}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <FlexBox hAlign={"center"}>
                          <Button
                            type={"text"}
                            onClick={() => addOrEditEntry(entry)}
                          >
                            Edit
                          </Button>
                          &nbsp;/&nbsp;
                          <Button
                            type={"text"}
                            onClick={() => deleteEntry(entry)}
                          >
                            Delete
                          </Button>
                        </FlexBox>
                      </TableCell>
                    </TableRow>
                  ))}
              {doorknockingUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} textAlign={"center"}>
                    {iln.gettext("No data")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className={classes.footerContainer}>
            <FlexBox hAlign="flex-end">
              <DoorknockUserTableActions
                doorknockingUsers={doorknockingUsers}
                deleteSelected={() => deleteEntry(selectedUsers)}
                deselectAll={() => setSelectedUsers(() => [])}
                selectAll={() => selectAll()}
                selectedUsers={selectedUsers}
                bulkEditUsers={() => handleOpenBulkEditDoorknockersModal()}
              />
            </FlexBox>
          </div>
          <FlexBox hAlign="flex-end">
            <Button onClick={() => addOrEditEntry()}>
              {iln.gettext("Add New")}
            </Button>
          </FlexBox>
        </React.Fragment>
      )}
    </div>
  );
};

export default DoorknockUsers;
