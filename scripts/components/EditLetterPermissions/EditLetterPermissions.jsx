import { Button, FlexBox, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import PermissionsChipInput from "../common/PermissionsChipInput";
import PropTypes from "prop-types";
import api from "@electedtech/api";

const EditLetterPermissions = ({ templateID }) => {
  const [restrictions, setRestrictions] = useState([]);
  const { modalActions } = useContext(ModalContext);

  useEffect(() => {
    getTemplateDetails();
  }, [templateID]);

  const getTemplateDetails = async () => {
    const res = await api.getLetterTemplate(templateID);
    setRestrictions(res.restrictions);
  };

  const updateRestrictions = async () => {
    const res = await api.updateLetterTemplateRestrictions(
      templateID,
      restrictions,
      modalActions
    );
    if (res) {
      window.location.reload();
    }
  };

  return (
    <FlexBox column>
      <h2 style={{ marginBottom: "10px" }}>EditLetterPermissions</h2>
      <PermissionsChipInput
        name="restrictions"
        keepErrorSpacing={false}
        value={restrictions}
        label={"Accessible By"}
        onChange={({ target: { value } }) => setRestrictions(value)}
      />
      <div style={{ marginTop: "10px" }}>
        <Button onClick={() => updateRestrictions()}>Save</Button>
      </div>
    </FlexBox>
  );
};

export default EditLetterPermissions;

EditLetterPermissions.propTypes = {
  templateID: PropTypes.string,
};
