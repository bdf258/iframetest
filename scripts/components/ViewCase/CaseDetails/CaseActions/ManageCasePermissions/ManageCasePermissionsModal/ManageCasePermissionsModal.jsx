import {
  Button,
  FlexBox,
  FormCheckbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@electedtech/electedtech-ui";

import React from "react";
import { dispatchSetCaseRestrictions, dispatchSetCasePermissions } from "../../../../slice/viewCaseSlice";
import propTypes from "./propTypes";
import { useDispatch } from "react-redux";
import { useReduxSlice } from "../../../CaseDetails.redux";
import { useStyles } from "../styles";
import { useTheme } from "react-jss";
import getPermissions from "../../../../helpers/getPermissions";
import { caseworkerID } from "../../../../../../helpers/localStorageHelper";
import api from "@electedtech/api";

const ManageCasePermissionsModal = ({ update }) => {
  const {
    caseDetails: { restrictions },
  } = useReduxSlice();
  const dispatch = useDispatch();

  const updateRestriction = (name, value) => {
    const [identifier, property] = name.split(":");
    const updatedRestrictions = restrictions.map((r) =>
      `${r.id + r.type}` == identifier ? { ...r, [property]: value } : r
    );
    
    dispatch(dispatchSetCaseRestrictions(updatedRestrictions));
    
    // Recalculate permissions in real-time for immediate UI feedback
    api.getOwnGroups().then((groups) => {
      const newPermissions = getPermissions(groups, caseworkerID, updatedRestrictions);
      dispatch(dispatchSetCasePermissions(newPermissions));
    });
  };
  
  const theme = useTheme();
  const classes = useStyles({ theme });
  const properties = ["view", "edit", "delete"];
  const hasNoViewPermissions =
    restrictions.filter(({ view }) => view).length === 0;

  return (
    <div className={classes.modal}>
      <FlexBox>
        <Table>
          <TableHead>
            <TableHeader>Group / Caseworker</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>View</TableHeader>
            <TableHeader>Edit</TableHeader>
            <TableHeader>Delete</TableHeader>
          </TableHead>
          <TableBody>
            {restrictions.map((restriction) => (
              <TableRow key={`${restriction.id + restriction.type}`}>
                <TableCell className={classes.cell}>
                  {restriction.name}
                </TableCell>
                <TableCell className={classes.cell}>
                  {restriction.type}
                </TableCell>
                {properties.map((property) => (
                  <TableCell key={property} className={classes.cell}>
                    <FormCheckbox
                      customClassNames={{
                        container: classes.checkboxContainer,
                      }}
                      value={restriction[property]}
                      name={`${restriction.id + restriction.type}:${property}`}
                      textAlign="center"
                      onChange={({ target: { name, value } }) => {
                        updateRestriction(name, value);
                      }}
                      keepErrorSpacing={false}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </FlexBox>
      <Button
        isDisabled={hasNoViewPermissions}
        title={
          hasNoViewPermissions
            ? "At least 1 view permission is required"
            : undefined
        }
        onClick={() => update(restrictions)}
      >
        Save
      </Button>
    </div>
  );
};

ManageCasePermissionsModal.propTypes = propTypes;

export default ManageCasePermissionsModal;
