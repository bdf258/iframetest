import React, { useContext } from "react";

import ConfirmationModal from "../../../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "prop-types";

const DeleteSendFromAddress = ({ onDelete, emailToDelete }) => {
  const iln = useContext(TranslationContext);

  return (
    <ConfirmationModal
      validatorIsNumber={false}
      errorTextToDisplay={iln.gettext(
        "Input doesn't match the email address above"
      )}
      confirmationValue={emailToDelete}
      modifyInputValues={(text) => text.trim().toLowerCase()}
      message={
        <React.Fragment>
          <div>
            {iln.gettext("Are you sure you wish to")}{" "}
            <b>{iln.gettext("delete")}</b>{" "}
            {iln.gettext("the send from address")} <b>{emailToDelete}</b>?{" "}
            {iln.gettext(
              "You will not longer be able to send email from this address and this cannot be undone."
            )}
          </div>
          <br />
          <div>
            {iln.gettext(
              "To confirm deletion, please type the email address in the box below:"
            )}
          </div>
          <br />
        </React.Fragment>
      }
      onConfirm={onDelete}
    />
  );
};

DeleteSendFromAddress.propTypes = {
  emailToDelete: propTypes.string.isRequired,
  onDelete: propTypes.func.isRequired,
};

export default DeleteSendFromAddress;
