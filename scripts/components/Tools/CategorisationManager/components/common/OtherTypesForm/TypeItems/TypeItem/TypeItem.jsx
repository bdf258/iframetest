import { Card } from "@electedtech/electedtech-ui";
import DeleteIcon from "../../../../../../../common/icons/DeleteIcon.jsx";
import PencilIcon from "../../../../../../../common/icons/PencilIcon.jsx";
import React from "react";
import propTypes from "./TypeItem.propTypes.js";
import useStyles from "./TypeItem.styles.js";
import { useTheme } from "react-jss";

const TypeItem = ({ item, onEditClick, onDeleteClick, typeKey }) => {
  const required = item.statustype && (item.id === 1 || item.id === 2);
  const global = item.categorytypeID === 0;

  const allowEdit = item.restriction.edit;
  const allowDelete = !required && item.restriction.delete;

  const theme = useTheme();
  const classes = useStyles({
    global,
    required,
    theme,
  });

  return (
    <Card className={classes.categorisationItem}>
      {item[typeKey]}
      {allowEdit && (
        <button className={classes.iconButton} onClick={onEditClick}>
          <PencilIcon width={25} height={25} />
        </button>
      )}
      {allowDelete && (
        <button className={classes.iconButton} onClick={onDeleteClick}>
          <DeleteIcon width={25} height={25} />
        </button>
      )}
    </Card>
  );
};

TypeItem.propTypes = propTypes;

export default TypeItem;
