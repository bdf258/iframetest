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
import React, { useContext, useState } from "react";
import {
  getInstallationPreferences,
  getUserPreferences,
  setItem,
} from "../../../../../../helpers/localStorageHelper";

import AddSendFromAddress from "./AddSendFromAddress/AddSendFromAddress.jsx";
import DeleteSendFromAddress from "./DeleteSendFromAddress/DeleteSendFromAddress.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import classnames from "classnames";
import { fromAddressesFromLocalStorage } from "../../../../../common/ComposeEmail/common/getFromAddress";
import useStyles from "./styles.js";
import { useTheme } from "react-jss";

const deletionModalID = "deleteSendFromAddressModal";
const addModalID = "addSendFromAddressModal";

const userPreferences = getUserPreferences();
const installationPreferences = getInstallationPreferences();

const reorderAddresses = (addresses, oldIndex, newIndex) => {
  const oldEmail = addresses[oldIndex];
  const newEmail = addresses[newIndex];

  const newEmailOrder = addresses;
  newEmailOrder[oldIndex] = newEmail;
  newEmailOrder[newIndex] = oldEmail;
  return newEmailOrder;
};

const deleteSendFrom = ({
  addressToRemove,
  indexToRemove,
  addresses,
  setAddresses,
  modalActions,
  iln,
}) => {
  api
    .removeSendFromAddress(addressToRemove, modalActions, iln)
    .then(() => {
      addresses.splice(indexToRemove, 1);
      setAddresses([...addresses]);
      const defaultAddressIndex = addresses.findIndex(
        (addr) => addr === installationPreferences.defaultEmailAddress
      );
      if (defaultAddressIndex !== -1) addresses.splice(defaultAddressIndex, 1);

      setItem("userPreferences", {
        ...userPreferences,
        altSendEmailAs: [...addresses],
      });
      modalActions.removeById(deletionModalID);
    })
    .catch(() => {
      setAddresses(initialEmailOrder);
    });
};

const updateSendFromOrder = (
  addresses,
  setAddresses,
  oldIndex,
  newIndex,
  submitTimeout,
  setSubmitTimeout,
  modalActions
) => {
  clearTimeout(submitTimeout);
  const newEmailOrder = [...reorderAddresses(addresses, oldIndex, newIndex)];
  const altSendIsPrimary =
    newEmailOrder[0] !== installationPreferences.defaultEmailAddress;

  const defaultEmailAddressIndex = newEmailOrder.indexOf(
    installationPreferences.defaultEmailAddress
  );

  setSubmitTimeout(
    setTimeout(() => {
      if (defaultEmailAddressIndex > -1)
        // default email is not included in userPreferences object
        newEmailOrder.splice(defaultEmailAddressIndex, 1);

      api
        .updateUserPreferences(
          { altSendEmailAs: newEmailOrder, altSendIsPrimary },
          modalActions
        )
        .then((res) => setItem("userPreferences", res))
        .catch(() => setAddresses(initialEmailOrder));
    }, 1000)
  );

  // default email can only be first or last
  if (defaultEmailAddressIndex !== 0 && defaultEmailAddressIndex !== -1) {
    setAddresses(
      reorderAddresses(
        addresses,
        defaultEmailAddressIndex,
        addresses.length - 1
      )
    );
  }
};

const initialEmailOrder = fromAddressesFromLocalStorage();

const ManageSendFromAddresses = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [addresses, setAddresses] = useState(initialEmailOrder);
  const [draggedAddress, setDraggedAddress] = useState();
  const [draggedIdx, setDraggedIndex] = useState();
  const [draggedOver, setDraggedOver] = useState();
  const [submitTimeout, setSubmitTimeout] = useState();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  return (
    <div className={classes.modal}>
      <FlexBox hAlign="flex-end">
        <Button
          onClick={() =>
            modalActions.add({
              id: addModalID,
              title: iln.gettext("Add Send From Address"),
              component: (
                <AddSendFromAddress
                  modalID={addModalID}
                  existingEmailAddresses={addresses}
                />
              ),
              blurBackground: true,
              lockWindow: true,
              allowClose: true,
            })
          }
        >
          Add Address
        </Button>
      </FlexBox>
      <br />
      <Table>
        <TableHead>
          <TableHeader>{iln.gettext("Primary")}</TableHeader>
          <TableHeader>{iln.gettext("Email")}</TableHeader>
          <TableHeader>{iln.gettext("Actions")}</TableHeader>
        </TableHead>
        <TableBody>
          {addresses &&
            addresses.reduce(
              (accumulation, address, idx) =>
                address === ""
                  ? accumulation
                  : [
                      ...accumulation,
                      <TableRow
                        key={address}
                        draggable
                        onDragStart={(e) => {
                          setDraggedAddress(address);
                          setDraggedIndex(idx);
                          e.dataTransfer.setData("index", idx);
                        }}
                        onDragEnd={() => {
                          setDraggedAddress();
                          setDraggedIndex();
                        }}
                        onDragOver={(e) => {
                          e.preventDefault(); //required for drop event to trigger
                        }}
                        onDragEnter={() => {
                          setDraggedOver(idx);
                          const newEmailOrder = reorderAddresses(
                            addresses,
                            draggedIdx,
                            idx
                          );
                          setAddresses(newEmailOrder);
                        }}
                        onDrop={(e) => {
                          const oldIndex = e.dataTransfer.getData("index");
                          const newIndex = idx;
                          updateSendFromOrder(
                            addresses,
                            setAddresses,
                            oldIndex,
                            newIndex,
                            submitTimeout,
                            setSubmitTimeout,
                            modalActions
                          );
                        }}
                        className={classnames(
                          classes.tableRow,
                          draggedAddress === address
                            ? classes.draggedRow
                            : undefined
                        )}
                      >
                        {idx === 0 ? (
                          <TableCell
                            value={idx}
                            className={classnames(
                              classes.tableCell,
                              draggedAddress === address
                                ? classes.hidden
                                : undefined
                            )}
                          >
                            &#10004; {/* tick icon */}
                          </TableCell>
                        ) : (
                          <TableCell value={idx}>
                            <button
                              className={classes.buttonReset}
                              onClick={() =>
                                updateSendFromOrder(
                                  addresses,
                                  setAddresses,
                                  idx,
                                  0,
                                  submitTimeout,
                                  setSubmitTimeout,
                                  modalActions
                                )
                              }
                            >
                              <span className={classes.hidden}>
                                {draggedOver}
                              </span>
                            </button>
                          </TableCell>
                        )}
                        <TableCell value={idx} className={classes.tableCell}>
                          {address}
                        </TableCell>
                        <TableCell value={idx} className={classes.tableCell}>
                          <Button
                            customClassNames={
                              draggedAddress === address
                                ? classes.hidden
                                : undefined
                            }
                            onClick={() =>
                              modalActions.add({
                                id: deletionModalID,
                                title: iln.gettext("Delete Send From Address"),
                                component: (
                                  <DeleteSendFromAddress
                                    emailToDelete={address}
                                    onDelete={() =>
                                      deleteSendFrom({
                                        addressToRemove: address,
                                        indexToRemove: idx,
                                        addresses,
                                        setAddresses,
                                        modalActions,
                                        iln,
                                      })
                                    }
                                  />
                                ),
                                blurBackground: true,
                                lockWindow: true,
                                allowClose: true,
                              })
                            }
                            isDisabled={
                              address ===
                                installationPreferences.defaultEmailAddress ||
                              (installationPreferences.defaultEmailAddress ===
                                "" &&
                                addresses.filter(
                                  (a) =>
                                    a ===
                                    installationPreferences.defaultEmailAddress
                                ).length === 1)
                            }
                          >
                            {iln.gettext("Delete")}
                          </Button>
                        </TableCell>
                      </TableRow>,
                    ],
              []
            )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageSendFromAddresses;
