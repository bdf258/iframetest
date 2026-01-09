import React, { useContext } from "react";

import { Button } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import propTypes from "./DoorknockUsersTableActions.propTypes";

export const DoorknockUserTableActions = ({
  doorknockingUsers,
  selectedUsers,
  selectAll,
  deselectAll,
  deleteSelected,
  bulkEditUsers,
}) => {
  const iln = useContext(TranslationContext);

  return (
    <div>
      {selectedUsers.length > 0 && (
        <Button type={"text"} onClick={() => deleteSelected()}>
          {iln.gettext("Delete")}
        </Button>
      )}
      {selectedUsers.length > 1 && <span>&nbsp; - &nbsp; </span>}
      {selectedUsers.length > 1 && (
        <Button type={"text"} onClick={() => bulkEditUsers()}>
          {iln.gettext("Edit")}
        </Button>
      )}
      {selectedUsers.length > 1 && <span>&nbsp; - &nbsp; </span>}
      {doorknockingUsers.length > 0 && (
        <Button
          type={"text"}
          onClick={() =>
            selectedUsers.length > 0 ? deselectAll() : selectAll()
          }
        >
          {selectedUsers.length > 0
            ? iln.gettext("Deselect All")
            : iln.gettext("Select All")}
        </Button>
      )}
    </div>
  );
};

DoorknockUserTableActions.propTypes = propTypes;
