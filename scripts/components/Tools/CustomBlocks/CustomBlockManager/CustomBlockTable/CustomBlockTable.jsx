import {
  Button,
  NotificationBox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import propTypes from "./CustomBlockTable.propTypes";

const CustomBlockTable = ({ customBlocks, handleEdit, handleDelete }) => {
  const iln = useContext(TranslationContext);

  if (!customBlocks || customBlocks.length === 0) {
    return (
      <NotificationBox
        type={"info"}
        alertMessage={iln.gettext("No custom blocks available")}
      />
    );
  }

  return (
    <Table>
      <TableHead>
        <TableHeader>{iln.gettext("Name")}</TableHeader>
        <TableHeader>{iln.gettext("Parent Object")}</TableHeader>
        <TableHeader>{iln.gettext("Type")}</TableHeader>
        <TableHeader>{iln.gettext("Actions")}</TableHeader>
        <TableHeader>{iln.gettext("Delete")}</TableHeader>
      </TableHead>
      <TableBody>
        {customBlocks.map(({ name, parent_object, type, id }, index) => {
          const coreBlock = type === "core";
          return (
            <TableRow key={index}>
              <TableCell textAlign={"center"} verticalAlign={"center"}>
                {name}
              </TableCell>
              <TableCell textAlign={"center"} verticalAlign={"center"}>
                {parent_object}
              </TableCell>
              <TableCell textAlign={"center"} verticalAlign={"center"}>
                {type}
              </TableCell>
              <TableCell textAlign={"center"} verticalAlign={"center"}>
                <Button
                  isDisabled={coreBlock}
                  type="text"
                  onClick={() => !coreBlock && handleEdit(id)}
                >
                  {iln.gettext("Edit")}
                </Button>
              </TableCell>
              <TableCell textAlign={"center"} verticalAlign={"center"}>
                <Button
                  isDisabled={coreBlock}
                  type="text"
                  onClick={() =>
                    !coreBlock && handleDelete(id, name, parent_object)
                  }
                >
                  {iln.gettext("Delete")}
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

CustomBlockTable.propTypes = propTypes;

export default CustomBlockTable;
