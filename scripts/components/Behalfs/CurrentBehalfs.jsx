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

import EditBehalf from "./EditBehalf.jsx";
import ModalLink from "../Groups/ModalLink.jsx";
import behalfsAPI from "../../api/src/behalfApi.js";
import propTypes from "prop-types";
import useStyles from "./styles.js";

function CurrentBehalfs({ refresh }) {
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    getBehalfs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated, refresh]);
  const [behalfs, setBehalfs] = useState([]);
  const { modalActions } = useContext(ModalContext);

  const getBehalfs = async () => {
    const res = await behalfsAPI.getBehalfs(modalActions);

    if (res) {
      setBehalfs(() => res);
    }
  };
  const deleteBehalf = async (id) => {
    await behalfsAPI.deleteBehalf(id, modalActions);
    getBehalfs();
  };

  const behalfUpdated = () => {
    setUpdated((updated) => !updated);
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <FlexBox style={{ marginBottom: 0 }}>
        <Table>
          <TableHead>
            <TableHeader>Behalf ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader style={{ width: 150 + "px" }}>Actions</TableHeader>
          </TableHead>
          <TableBody>
            {behalfs.map((behalf) => (
              <React.Fragment key={behalf.id}>
                <TableRow>
                  <TableCell textAlign={"center"} verticalAlign={"center"}>
                    {behalf.id}
                  </TableCell>
                  <TableCell textAlign={"center"} verticalAlign={"center"}>
                    {behalf.label}
                  </TableCell>
                  <TableCell textAlign={"center"} verticalAlign={"center"}>
                    <FlexBox hAlign="center">
                      <div>
                        <ModalLink
                          component={
                            <EditBehalf
                              behalf={behalf}
                              behalfAdded={behalfUpdated}
                            />
                          }
                          title={"Edit Behalf : " + behalf.label}
                          linkText={"EDIT"}
                          customClassNames={{ card: classes.card }}
                        />
                      </div>
                      <span>&nbsp;/&nbsp; </span>
                      <div>
                        <Button
                          type="text"
                          value={behalf.id}
                          onClick={() => deleteBehalf(behalf.id)}
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

CurrentBehalfs.propTypes = {
  refresh: propTypes.bool.isRequired,
};

export default CurrentBehalfs;
