import { List, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import ConfirmationModal from "../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import { TranslationContext } from "context/translate";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  affectedFieldsListContainer: {
    textAlign: "left",
    width: 290,
    display: "block",
    margin: "0 auto",
  },
  affectedFieldsList: {
    marginTop: 0,
    paddingInlineStart: "18px !important",
  },
});

export const useOpenCaseCategoryChangeWarningModal = (onConfirm) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const classes = useStyles();

  const openCategoryChangeWaringModal = (
    newCategory,
    customFieldsToBeRemoved
  ) => {
    const customFieldNames = customFieldsToBeRemoved.map(({ name }) => name);

    modalActions.add({
      id: "caseCategoryChangeWarningModal",
      title: iln.gettext("Change Case Category"),
      component: (
        <ConfirmationModal
          onConfirm={() => {
            onConfirm(newCategory, customFieldsToBeRemoved);
            modalActions.removeById("caseCategoryChangeWarningModal");
          }}
          confirmationValue={"confirm"}
          buttonText={"Confirm"}
          message={
            <React.Fragment>
              <p>
                {iln.gettext(
                  "This will change category specific custom fields, all data will be lost for the below custom fields:"
                )}
              </p>
              <div className={classes.affectedFieldsListContainer}>
                <List indent={false}>
                  <ul className={classes.affectedFieldsList}>
                    {customFieldNames.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </List>
              </div>
              <p>
                {iln.gettext(
                  `Type "confirm" in the input below to confirm you wish to proceed.`
                )}
              </p>
            </React.Fragment>
          }
        />
      ),
      blurBackground: true,

      lockWindow: true,
      allowClose: true,
    });
  };

  return [openCategoryChangeWaringModal];
};
