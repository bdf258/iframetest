import { Button, FlexBox, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { createUseStyles } from "react-jss";
import propTypes from "prop-types";

const useStyle = createUseStyles({
  addGroupLink: {
    margin: "4px 4px 10px 0px",
  },
});

const ModalLink = ({
  component,
  title,
  linkText = "link",
  align = "flex-end",
  type = "text",
  customClassNames = {},
}) => {
  const { modalActions } = useContext(ModalContext);
  const classes = useStyle();

  return (
    <React.Fragment>
      <FlexBox hAlign={align} className={classes.addGroupLink}>
        <Button
          type={type}
          onClick={() =>
            modalActions.add({
              id: title,
              title: title,
              allowClose: true,
              component: component,
              customClassNames: customClassNames,
            })
          }
        >
          {linkText}
        </Button>
      </FlexBox>
    </React.Fragment>
  );
};

ModalLink.propTypes = {
  align: propTypes.string,
  component: propTypes.oneOfType([
    propTypes.string,
    propTypes.func,
    propTypes.object,
  ]).isRequired,
  customClassNames: propTypes.object,
  linkText: propTypes.string,
  title: propTypes.string,
  type: propTypes.string,
};

export default ModalLink;
