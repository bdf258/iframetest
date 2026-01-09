import React, { useState } from "react";

/*global $*/
import ManageGroupAccess from "./ManageGroupAccess.jsx";
import ManageInbox from "./ManageInbox.jsx";
import { createUseStyles } from "react-jss";
import propTypes from "prop-types";

const useStyle = createUseStyles({
  close: {
    position: "absolute",
    top: 15,
    right: 8,
    fontSize: 22,
    color: "#aaa",
    cursor: "pointer",
    lineHeight: 0.5,
    border: "none",
    background: "none",
  },
});

function ManageGroupAccessContainer({ id, type }) {
  const [resetModal, setResetModal] = useState(false);
  const classes = useStyle();
  return (
    <React.Fragment>
      <button
        className={classes.close}
        onClick={() => {
          type == "case"
            ? $("#managePermissions").trigger("reveal:close")
            : $("#manageInbox").trigger("reveal:close");
          setResetModal((resetModal) => !resetModal);
        }}
      >
        &#215;
      </button>
      {/* render different component based on the js file calling this component */}
      {type == "case" ? (
        <ManageGroupAccess caseID={id} reset={resetModal} />
      ) : (
        <ManageInbox caseworkerId={id} reset={resetModal} />
      )}
    </React.Fragment>
  );
}

ManageGroupAccessContainer.propTypes = {
  id: propTypes.oneOfType([propTypes.string, propTypes.number]),
  type: propTypes.string,
};

export default ManageGroupAccessContainer;
