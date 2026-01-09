import {
  Button,
  Chip,
  ModalContext,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import DeleteConfirmation from "./DeleteConfirmation/DeleteConfirmation.jsx";
import KmlEditor from "../KmlEditor/index.js";
import { TranslationContext } from "context/translate";
import propTypes from "./KmlTable.propTypes.js";
import useStyles from "./KmlTable.styles.js";

const editModalID = "editKmlModalID";
const deleteModalID = "deleteKmlModalID";

const KmlTable = ({ state, dispatch }) => {
  const classes = useStyles();

  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableHeader>{iln.gettext("Name")}</TableHeader>
        <TableHeader>{iln.gettext("Permissions")}</TableHeader>
        <TableHeader>{iln.gettext("Actions")}</TableHeader>
      </TableHead>
      <TableBody>
        {state.map((kml, index) => (
          <TableRow key={kml.id}>
            <TableCell className={classes.kmlCell}>{kml.name}</TableCell>
            <TableCell className={classes.kmlCell}>
              {kml.restrictions.map(({ id, name }) => (
                <Chip key={id} value={id} size="large">
                  {name}
                </Chip>
              ))}
            </TableCell>
            <TableCell className={classes.actionCell}>
              <Button
                size="small"
                onClick={() =>
                  modalActions.add({
                    id: editModalID,
                    title: iln.gettext("Edit KML"),
                    component: (
                      <KmlEditor
                        kml={{ ...kml, index }}
                        dispatch={dispatch}
                        modalID={editModalID}
                      />
                    ),
                    allowClose: true,
                  })
                }
              >
                {iln.gettext("Edit")}
              </Button>
              <Button
                size="small"
                onClick={() =>
                  modalActions.add({
                    id: deleteModalID,
                    title: iln.gettext("Delete KML"),
                    component: (
                      <DeleteConfirmation
                        kml={{ ...kml, index }}
                        dispatch={dispatch}
                        modalID={deleteModalID}
                      />
                    ),
                    allowClose: true,
                  })
                }
              >
                {iln.gettext("Delete")}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

KmlTable.propTypes = propTypes;

export default KmlTable;
