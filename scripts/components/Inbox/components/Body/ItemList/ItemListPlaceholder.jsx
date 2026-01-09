import { FlexBox, Placeholder } from "@electedtech/electedtech-ui";
import React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  placeholder: { margin: "5px 0" },
  item: { marginBottom: 5, width: 250 },
  itemContent: { marginTop: 10 },
  itemSeparator: { margin: "10px 0" },
  checkbox: { margin: "0 8px" },
});

const ItemListPlaceholder = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.item}>
        <FlexBox vAlign={"center"}>
          <Placeholder className={classes.checkbox} height={16} width={16} />
          <div className={classes.itemContent}>
            <Placeholder
              width={200}
              height={15}
              className={classnames(classes.placeholder)}
            />
            <Placeholder
              width={100}
              height={15}
              className={classnames(classes.placeholder)}
            />
            <Placeholder
              width={50}
              height={15}
              className={classnames(classes.placeholder)}
            />
          </div>
        </FlexBox>
        <Placeholder
          width={250}
          height={1}
          className={classnames(classes.itemSeparator)}
        />
      </div>
      <div className={classes.item}>
        <FlexBox vAlign={"center"}>
          <Placeholder className={classes.checkbox} height={16} width={16} />
          <div className={classes.itemContent}>
            <Placeholder
              width={200}
              height={15}
              className={classnames(classes.placeholder)}
            />
            <Placeholder
              width={100}
              height={15}
              className={classnames(classes.placeholder)}
            />
            <Placeholder
              width={50}
              height={15}
              className={classnames(classes.placeholder)}
            />
          </div>
        </FlexBox>
        <Placeholder
          width={250}
          height={1}
          className={classnames(classes.itemSeparator)}
        />
      </div>
      <div className={classes.item}>
        <FlexBox vAlign={"center"}>
          <Placeholder className={classes.checkbox} height={16} width={16} />
          <div className={classes.itemContent}>
            <Placeholder
              width={200}
              height={15}
              className={classnames(classes.placeholder)}
            />
            <Placeholder
              width={100}
              height={15}
              className={classnames(classes.placeholder)}
            />
            <Placeholder
              width={50}
              height={15}
              className={classnames(classes.placeholder)}
            />
          </div>
        </FlexBox>
        <Placeholder
          width={250}
          height={1}
          className={classnames(classes.itemSeparator)}
        />
      </div>
    </React.Fragment>
  );
};

export default ItemListPlaceholder;
