import {
  Button,
  FlexBox,
  FormCheckbox,
  FormTextInput,
  ModalContext,
  NotificationBox,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import { TranslationContext } from "context/translate";
import propTypes from "./Editor.propTypes.js";
import useStyles from "./Editor.styles.js";

const Editor = ({ item, modalID, onConfirm, typeKey }) => {
  const classes = useStyles({ alreadyGlobal: item.categorytypeID === 0 });
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const itemSingular = {
    casetype: iln.gettext("Case Type"),
    statustype: iln.gettext("Status Type"),
  }[typeKey];

  const [text, setText] = useState(item[typeKey] || "");
  const [global, setGlobal] = useState(item.categorytypeID === 0);
  const [closed, setClosed] = useState(item.closed || false);

  const [fetching] = useState(false);

  return (
    <div className={classes.edit}>
      {global && (
        <NotificationBox
          alertMessage={iln.gettext(
            "This %1 is marked as global and is present in every category. Any modifications will impact how this %1 is displayed across all instances where it is used.",
            itemSingular
          )}
          type="warn"
        />
      )}
      <FormTextInput
        name="text"
        value={text}
        onChange={({ target: { value } }) => setText(value)}
        label={itemSingular}
        customClassNames={{ container: classes.inputContainer }}
        keepErrorSpacing={false}
      />
      <FormCheckbox
        name="global"
        value={global}
        label={iln.gettext("Appear across all categories?")}
        onChange={() => item.categorytypeID !== 0 && setGlobal(!global)}
        customClassNames={{
          container: classes.inputContainer,
          input: classes.checkboxInput,
          label: classes.checkboxLabel,
        }}
        keepErrorSpacing={false}
      />
      {typeKey === "statustype" && (
        <FormCheckbox
          name="closed"
          value={closed}
          label={iln.gettext("Mark case as closed when selected?")}
          onChange={() => setClosed(!closed)}
          customClassNames={{
            container: classes.inputContainer,
            input: classes.checkboxInput,
            label: classes.checkboxLabel,
          }}
          keepErrorSpacing={false}
        />
      )}
      <FlexBox hAlign="space-between">
        <Button
          onClick={() => modalActions.removeById(modalID)}
          isDisabled={fetching}
        >
          {iln.gettext("Cancel")}
        </Button>

        <Button
          className={classes.confirmButton}
          isDisabled={fetching || text.trim() === ""}
          onClick={() =>
            onConfirm({
              ...item,
              [typeKey]: text,
              closed,
              categorytypeID: global ? 0 : item.categorytypeID,
            })
          }
        >
          {fetching ? (
            <Spinner />
          ) : item.id ? (
            iln.gettext("Update")
          ) : (
            iln.gettext("Create")
          )}
        </Button>
      </FlexBox>
    </div>
  );
};

Editor.propTypes = propTypes;

export default Editor;
