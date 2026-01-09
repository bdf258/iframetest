import { FormChipInput, Placeholder } from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";
import {
  getPermissionOptions,
  userIdentity,
} from "../../../helpers/localStorageHelper.js";

import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { applyTypePrefix } from "./helpers/applyTypePrefix.js";
import classnames from "classnames";
import { prependGroupToName } from "./helpers/prependGroupToName.js";
import propTypes from "./PermissionsChipInput.propTypes.js";
import { removeGroupFromName } from "./helpers/removeGroupFromName.js";
import { removeTypePrefix } from "./helpers/removeTypePrefix.js";
import useStyles from "./PermissionsChipInput.styles.js";

/**
 * As this component joins the results of caseworkers and groups there is a
 * chance that their id may clash. To prevent this group ids should be prefixed with
 * a "g" and caseworker ids should be prefixed with a c.
 *
 * When submitting, these should prefixes be removed (id.slice(1) will remove the first
 * letter inline) and the value converted back to an int.
 */
const PermissionsChipInput = ({
  value = [],
  onChange,
  customClassNames,
  prependGroup = false,
  ...props
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const [groupsAndUsers, setGroupsAndUsers] = useState([]);

  useEffect(() => {
    let lists = [];
    lists.push(api.getGroups());
    if (!getPermissionOptions() || getPermissionOptions().displayCaseworkers)
      lists.push(
        api[userIdentity?.id == 1 ? "getAllCaseworkers" : "getCaseworkers"]()
      );
    else lists.push([]);
    Promise.all(lists).then(([groups, caseworkers]) =>
      setGroupsAndUsers([
        ...groups.map((g) => ({
          ...g,
          type: "group",
          group: "Group",
        })),
        ...caseworkers
          .filter((c) => c.active)
          .map((c) => ({
            ...c,
            type: "user",
            group: " User",
            view: true, // add view, edit, delete as not included in get(all)Caseworkers endpoints
            edit: true,
            delete: true,
          })),
      ])
    );
  }, []);

  if (!groupsAndUsers)
    return (
      <Placeholder
        className={customClassNames?.placeholder}
        width="100%"
        height={32}
      />
    );

  return (
    <FormChipInput
      label={iln.gettext("Has Access")}
      name="restrictions"
      value={{
        chips: prependGroup
          ? prependGroupToName(applyTypePrefix(value))
          : applyTypePrefix(value),
      }}
      onChange={(e) =>
        e.target.value.chips?.length > 0 &&
        onChange({
          ...e,
          target: {
            ...e.target,
            value: prependGroup
              ? removeGroupFromName(removeTypePrefix(e.target.value.chips))
              : removeTypePrefix(e.target.value.chips),
          },
        })
      }
      suggestionLabelKey="name"
      addNewChips={false}
      chipLabelKey="name"
      chipSource={
        prependGroup
          ? prependGroupToName(applyTypePrefix(groupsAndUsers))
          : applyTypePrefix(groupsAndUsers)
      }
      customClassNames={{
        ...customClassNames,
        container: classnames(
          classes.inputContainer,
          customClassNames?.container
        ),
      }}
      keepErrorSpacing={false}
      {...props}
    />
  );
};

PermissionsChipInput.propTypes = propTypes;

export default PermissionsChipInput;
