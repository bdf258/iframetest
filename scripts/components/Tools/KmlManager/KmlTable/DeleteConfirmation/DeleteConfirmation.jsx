import React, { useContext } from "react";

import ConfirmationModal from "../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import propTypes from "./DeleteConfirmation.propTypes.js";

const DeleteConfirmation = ({ kml, dispatch, modalID }) => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  return (
    <ConfirmationModal
      key="sdf"
      confirmationValue={kml.name}
      message={[
        <p key={1}>
          {iln.gettext("Are you sure you want to delete the KML named")}{" "}
          <strong>{kml.name}</strong>? {iln.gettext("This cannot be undone.")}
        </p>,
        <p key={2}>
          {iln.gettext(
            "To confirm please enter the name of the KML into the box below and click"
          )}{" "}
          <strong>{iln.gettext("Delete")}</strong>.
        </p>,
      ]}
      onConfirm={() => {
        api.deleteKML(kml.id).then(() => {
          modalActions.removeById(modalID);
          dispatch({
            type: "DELETE_KML",
            payload: kml.index,
          });
        });
      }}
    />
  );
};

DeleteConfirmation.propTypes = propTypes;

export default DeleteConfirmation;
