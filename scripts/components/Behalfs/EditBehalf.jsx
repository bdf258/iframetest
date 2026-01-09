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

import Selector from "../ManageGroupAccess/Selector.jsx";
import behalfApi from "../../api/src/behalfApi.js";
// import caseworkerApi from "../../api/src/caseworkers.js";
import groupsApi from "../../api/src/groupsApi.js";
import letterheadsApi from "../../api/src/letterHeads.js";
import propTypes from "prop-types";
import useStyles from "./styles.js";

function EditBehalf({ behalf = "", behalfAdded }) {
  useEffect(() => {
    behalf.id
      ? getBehalfDetails(behalf.id)
      : setBehalfDetails({
          default_letterhead: "",
          default_group: "",
          default_from: "",
          label: "",
        });

    getGroups();
    getLetterheads();
    // getFromAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [behalfDetails, setBehalfDetails] = useState("");
  const { modalActions } = useContext(ModalContext);
  const [groupsList, setGroupsList] = useState([]);
  const [letterheadsList, setLetterheadsList] = useState([]);
  // const [fromAddressesList, setFromAddressesList] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("Loading Details");
  const [existingBehalfs, setExistingBehalfs] = useState([]);
  const name = useRef("");
  const classes = useStyles();

  useEffect(() => {
    document.addEventListener("keyup", handleKeyPress);
    return () => document.removeEventListener("keyup", handleKeyPress);
  });

  const getBehalfDetails = async (id) => {
    const res = await behalfApi.getBehalfs(modalActions, id);

    if (res) {
      res[0].label ? (name.current = res[0].label) : null;
      setBehalfDetails(...res);
    }
    const allBehalfs = await behalfApi.getBehalfs(modalActions);
    if (allBehalfs) {
      setExistingBehalfs(() => [...allBehalfs]);
    }
  };

  const getGroups = async () => {
    const res = await groupsApi.getGroups();
    if (res) {
      setGroupsList([...res]);
    }
  };

  const getLetterheads = async () => {
    const res = await letterheadsApi.searchLetterHeads();
    if (res) {
      setLetterheadsList([...res]);
      if (res.length == 0) {
        setMessage("You dont have permssion to access any letterhead");
      }
    }
  };

  // const getFromAddresses = async () => {
  //   const res = await caseworkerApi.getCaseworkers();
  //   if (res) {
  //     let addresses = res
  //       .map((caseworker) => caseworker.emails)
  //       .flat()
  //       .filter((email) => email !== "")
  //       .map((email) => {
  //         return {
  //           id: email,
  //           email,
  //         };
  //       });
  //     setFromAddressesList([...addresses]);
  //   }
  // };

  const dataSelected = (e) => {
    const val = e.target.value;

    switch (e.target.name) {
      case "Letterhead":
        val !== "0"
          ? setBehalfDetails((behalfDetails) => {
              return {
                ...behalfDetails,
                default_letterhead: val,
              };
            })
          : null;
        break;
      case "Group":
        val !== "0"
          ? setBehalfDetails((behalfDetails) => {
              return {
                ...behalfDetails,
                default_group: val,
              };
            })
          : null;
        break;
      case "fromAddress":
        val !== "0"
          ? setBehalfDetails((behalfDetails) => {
              return {
                ...behalfDetails,
                default_from: val,
              };
            })
          : null;
        break;
      case "onBehalfOfName":
        val !== "0"
          ? setBehalfDetails((behalfDetails) => {
              return {
                ...behalfDetails,
                label: val,
              };
            })
          : null;
        break;
      default:
        break;
    }
  };

  const saveDetails = async () => {
    if (
      behalfDetails.default_letterhead == "" ||
      behalfDetails.default_group == "" ||
      // behalfDetails.default_from == "" ||
      behalfDetails.label == ""
    ) {
      setError("Please Enter a value for all fields");
    } else if (
      existingBehalfs &&
      name.current != behalfDetails.label &&
      existingBehalfs.some(
        (behalf) => behalf.label == behalfDetails.label.trim()
      )
    ) {
      setError("A 'Behalf Of' with this name already exists");
    } else {
      setError("");
      let res = "";
      res = behalf.id
        ? await behalfApi.updateBehalf(
            behalfDetails.id,
            behalfDetails,
            modalActions
          )
        : await behalfApi.createBehalf(behalfDetails, modalActions);
      behalfAdded();
      if (res.message != "ok") {
        setError(res.message);
      } else {
        behalf.id
          ? modalActions.removeById("Edit Behalf : " + name.current)
          : modalActions.removeById("Add Behalf Of");
      }
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      behalf.id
        ? modalActions.removeById("Edit Behalf : " + name.current)
        : modalActions.removeById("Add Behalf Of");
    }
    if (e.key === "Enter") {
      saveDetails();
    }
  };

  const minWidth = 155;
  // const emailWidth = 325;
  return (
    <React.Fragment>
      {behalfDetails &&
      groupsList.length != 0 &&
      letterheadsList.length != 0 ? (
        // && fromAddressesList.length != 0
        <>
          <FlexBox column style={{ marginBottom: 0 }}>
            <Table className={classes.table}>
              <TableHead>
                <TableHeader minWidth={minWidth}>Name</TableHeader>
                <TableHeader minWidth={minWidth}>Default Group</TableHeader>
                <TableHeader minWidth={minWidth}>
                  Default Letterhead
                </TableHeader>
                {/* <TableHeader minWidth={emailWidth}>
                  Default From Address
                </TableHeader> */}
              </TableHead>
              <TableBody>
                <React.Fragment key={behalfDetails.id}>
                  <TableRow>
                    <TableCell textAlign={"center"} verticalAlign={"center"}>
                      <FormHandler
                        state={{ onBehalfOfName: behalfDetails.label }}
                        onSubmit={() => {}}
                      >
                        <FormTextInput
                          onChange={(e) => dataSelected(e)}
                          name="onBehalfOfName"
                          keepErrorSpacing={false}
                        />
                      </FormHandler>
                    </TableCell>
                    <TableCell textAlign={"center"} verticalAlign={"center"}>
                      {groupsList.length != 0 && (
                        <Selector
                          data={groupsList}
                          value={"name"}
                          dataType={"Group"}
                          selectData={dataSelected}
                          currentValue={
                            behalfDetails.default_group
                              ? parseInt(behalfDetails.default_group)
                              : null
                          }
                        ></Selector>
                      )}
                    </TableCell>
                    <TableCell textAlign={"center"} verticalAlign={"center"}>
                      {letterheadsList.length != 0 && (
                        <Selector
                          data={letterheadsList}
                          value={"name"}
                          dataType={"Letterhead"}
                          selectData={dataSelected}
                          currentValue={
                            behalfDetails.default_letterhead &&
                            parseInt(behalfDetails.default_letterhead)
                          }
                        ></Selector>
                      )}
                    </TableCell>
                    {/* <TableCell textAlign={"center"} verticalAlign={"center"}>
                      <FormHandler
                        state={{ fromAddress: behalfDetails.default_from }}
                        onSubmit={() => {}}
                      >
                        <FormTextInput
                          onChange={(e) => dataSelected(e)}
                          name="fromAddress"
                          keepErrorSpacing={false}
                        />
                      </FormHandler> */}
                    {
                      //IF EMAIL ADDRESSES ARE REQUIRED AS DROP DOWN FROM THE CASEWORKERS ADDRESS
                      /* {fromAddressesList.length != 0 && (
                        <Selector
                          data={fromAddressesList}
                          value={"email"}
                          dataType={"fromAddress"}
                          selectData={dataSelected}
                          currentValue={
                            behalfDetails.default_from
                              ? {
                                  current: behalfDetails.default_from,
                                  checkBy: "email",
                                }
                              : null
                          }
                          // }
                        ></Selector>
                      )} */
                    }
                    {/* </TableCell> */}
                  </TableRow>
                </React.Fragment>
              </TableBody>
            </Table>
            <span style={{ color: "red" }}>{error}</span>
          </FlexBox>
          <Button onClick={() => saveDetails()}>Save</Button>
        </>
      ) : (
        <h3>{message}</h3>
      )}
    </React.Fragment>
  );
}

EditBehalf.propTypes = {
  behalf: propTypes.shape({
    id: propTypes.oneOfType([propTypes.string, propTypes.number]),
    default_letterhead: propTypes.oneOfType([
      propTypes.string,
      propTypes.number,
    ]),
    default_group: propTypes.oneOfType([propTypes.string, propTypes.number]),
    default_from: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
    default_signature: propTypes.string,
    created_by: propTypes.oneOfType([propTypes.string, propTypes.number]),
    updated_at: propTypes.oneOfType([
      propTypes.string,
      propTypes.arrayOf(propTypes.instanceOf(Date)),
    ]),
    created_at: propTypes.oneOfType([
      propTypes.string,
      propTypes.arrayOf(propTypes.instanceOf(Date)),
    ]),
    deleted: propTypes.oneOfType([propTypes.string, propTypes.bool]),
    updated_by: propTypes.oneOfType([propTypes.string, propTypes.number]),
  }),
  behalfAdded: propTypes.func,
};

export default EditBehalf;
