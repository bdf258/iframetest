import { Button } from "@electedtech/electedtech-ui";
import CrossIcon from "../icons/CrossIcon.jsx";
import DeleteIcon from "../icons/DeleteIcon.jsx";
import DownArrowIcon from "../icons/DownArrowIcon.jsx";
import PencilIcon from "../icons/PencilIcon.jsx";
import PlusIcon from "../icons/PlusIcon.jsx";
import React from "react";
import UpArrowIcon from "../icons/UpArrowIcon.jsx";
import classnames from "classnames";
import propTypes from "./propTypes";
import useStyles from "./styles";

const IconButton = ({
  customClassNames,
  onClick,
  colour,
  height = 30,
  width = 30,
  icon,
  isDisabled,
}) => {
  const classes = useStyles(height, width);

  const getIcon = () => {
    switch (icon) {
      case "plus": {
        return <PlusIcon width={width} height={height} colour={colour} />;
      }
      case "cross": {
        return <CrossIcon width={width} height={height} colour={colour} />;
      }
      case "upArrow": {
        return <UpArrowIcon width={width} height={height} colour={colour} />;
      }
      case "downArrow": {
        return <DownArrowIcon width={width} height={height} colour={colour} />;
      }
      case "pencil": {
        return <PencilIcon width={width} height={height} colour={colour} />;
      }
      case "bin": {
        return <DeleteIcon width={width} height={height} colour={colour} />;
      }
      default: {
        throw new Error(`Icon of type ${icon} is not supported`);
      }
    }
  };

  return (
    <Button
      customClassNames={classnames(
        classes.button,
        customClassNames,
        isDisabled ? classes.disabled : null
      )}
      onClick={onClick}
      isDisabled={isDisabled}
    >
      {getIcon()}
    </Button>
  );
};

IconButton.propTypes = propTypes;

export default IconButton;
