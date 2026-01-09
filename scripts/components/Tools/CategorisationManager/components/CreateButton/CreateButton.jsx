import { Button, FlexBox, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import CreateCategorisation from "./CreateCategorisation";
import { TranslationContext } from "context/translate";
import propTypes from "./CreateButton.propTypes.js";
import { useStyles } from "./CreateButton.styles.js";

const modalID = "createCategorisationModalID";

const CreateButton = ({ dispatch }) => {
  const classes = useStyles();

  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  return (
    <FlexBox hAlign="right">
      <Button
        onClick={() =>
          modalActions.add({
            id: modalID,
            title: "Create Categorisation",
            component: (
              <CreateCategorisation dispatch={dispatch} modalID={modalID} />
            ),
            customClassNames: { card: classes.modalWidth },
          })
        }
      >
        {iln.gettext("Create Category / Categorisation")}
      </Button>
    </FlexBox>
  );
};

CreateButton.propTypes = propTypes;

export default CreateButton;
