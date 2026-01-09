import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import FieldFilter from "./FieldFilter/FieldFilter.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./CustomFieldTable.propTypes.js";
import useFilterCustomFields from "./hooks/useFilterCustomFields.js";

const CustomFieldsTable = ({ handleEditExistingField, customFields }) => {
  const iln = useContext(TranslationContext);

  const [filter, setFilter] = useState({
    category: -1,
    object: "cases",
  });

  const [filteredCustomFields] = useFilterCustomFields(filter, customFields);
  return (
    <React.Fragment>
      <FieldFilter
        handleFilterChanged={(filterItem) =>
          setFilter({ ...filter, ...filterItem })
        }
        value={filter}
      />
      {filter.category && filter.object && (
        <Table>
          <TableHead>
            <TableHeader>{iln.gettext("Field Name")}</TableHeader>
            <TableHeader>{iln.gettext("Parent Object")}</TableHeader>
            <TableHeader>{iln.gettext("Block")}</TableHeader>
            <TableHeader>{iln.gettext("Type")}</TableHeader>
            <TableHeader>{iln.gettext("Categories")}</TableHeader>
            <TableHeader>{iln.gettext("Actions")}</TableHeader>
          </TableHead>
          <TableBody>
            {filteredCustomFields.map(
              ({ name, object, customDisplayBlock, type, categories, id }) => (
                <TableRow key={id}>
                  <TableCell textAlign={"center"} verticalAlign={"center"}>
                    {name}
                  </TableCell>
                  <TableCell textAlign={"center"} verticalAlign={"center"}>
                    {object}
                  </TableCell>
                  <TableCell textAlign={"center"} verticalAlign={"center"}>
                    {customDisplayBlock}
                  </TableCell>
                  <TableCell textAlign={"center"} verticalAlign={"center"}>
                    {type}
                  </TableCell>
                  <TableCell textAlign={"center"} verticalAlign={"center"}>
                    {categories}
                  </TableCell>
                  <TableCell textAlign={"center"} verticalAlign={"center"}>
                    <Button
                      type="text"
                      onClick={() => handleEditExistingField(id)}
                    >
                      {iln.gettext("Edit")}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
};

CustomFieldsTable.propTypes = propTypes;
export default CustomFieldsTable;
