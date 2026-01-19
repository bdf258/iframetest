import { FormSelect, Placeholder } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import { allowUnassignedInbox } from "../../../../../../consts/disabledFeatures.js";
import { useIsSliderOpen } from "../../../Body/ItemList/common/useIsSliderOpen";
import { useReduxSlice } from "./UserSelect.redux";
import { useStyles } from "./styles.js";

export const anyoneInboxID = "anyone";
export const noOneInboxID = "noone";

const UserSelect = () => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { caseworkerID, updateFilters, caseworkers = [] } = useReduxSlice();

  const isDisabled = useIsSliderOpen();

  if (!caseworkers) return <Placeholder height={32} width={250} />;

  return (
    <div
      className={classes.userSelectWrapper}
      title={
        isDisabled
          ? iln.gettext(
              "You cannot change the inbox filters while the slider is open"
            )
          : undefined
      }
    >
      <FormSelect
        name="selectedUserInbox"
        value={caseworkerID}
        onChange={({ target: { value } }) =>
          isDisabled ? () => {} : updateFilters({ caseworkerID: value })
        }
        keepErrorSpacing={false}
        customClassNames={{ container: classes.container }}
      >
        <option value={anyoneInboxID}>{iln.gettext("Anyone's")}</option>
        {allowUnassignedInbox && (
          <option value={noOneInboxID}>{iln.gettext("No One's")}</option>
        )}
        {caseworkers.map(({ id, name }) => (
          <option key={id} value={parseInt(id)}>
            {name}
          </option>
        ))}
      </FormSelect>
    </div>
  );
};

export default UserSelect;
