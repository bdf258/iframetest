import { Placeholder } from "@electedtech/electedtech-ui";
import React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import useResizeSlider from "../../common/hooks/useResizeSlider.jsx";

const useStyles = createUseStyles({
  placeholder: { marginBottom: 6 },
  contactTypeItem: { margin: "1px auto" },
  contactTypeContainer: { margin: "16px 0" },
  contactTypeHeader: {
    marginBottom: 6,
  },
  letterTemplateInput: {
    marginBottom: 5,
  },
  letterHeadInput: {
    marginBottom: 5,
  },
});

const ContactSelectPlaceHolder = () => {
  const classes = useStyles();

  useResizeSlider(600, 1250);

  return (
    <React.Fragment>
      <Placeholder
        width={310}
        height={30}
        className={classes.contactTypeHeader}
      />
      <div className={classes.contactTypeContainer}>
        <Placeholder
          width={360}
          height={20}
          className={classnames(classes.contactTypeItem, classes.placeholder)}
        />
        <Placeholder
          width={270}
          height={20}
          className={classnames(classes.contactTypeItem, classes.placeholder)}
        />
        <Placeholder
          width={180}
          height={20}
          className={classnames(classes.contactTypeItem, classes.placeholder)}
        />
        <Placeholder
          width={390}
          height={20}
          className={classnames(classes.contactTypeItem, classes.placeholder)}
        />
        <Placeholder
          width={110}
          height={20}
          className={classnames(classes.contactTypeItem, classes.placeholder)}
        />
      </div>
    </React.Fragment>
  );
};

export default ContactSelectPlaceHolder;
