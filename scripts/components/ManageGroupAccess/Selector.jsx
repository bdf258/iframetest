import { FormSelect } from "@electedtech/electedtech-ui";
import React from "react";
import { createUseStyles } from "react-jss";
import propTypes from "prop-types";

const useStyles = createUseStyles({
  optionHeader: {
    color: "grey",
    fontWeight: "bold",
    fontSize: "1.2em",
    cursor: "default",
  },
});

const Selector = ({
  data,
  id = "id",
  value = "name",
  selectData,
  dataType,
  currentValue = "",
  text = "",
  optionGroups = false,
  onSelectorClick = () => {},
}) => {
  // To set the current value as the default/first value of selector
  if (!currentValue) {
    data = [
      {
        [id]: 0,
        [value]: text ? text : "+ Add " + dataType + "\xa0\xa0\xa0",
      },
      ...data,
    ];
  }
  const classes = useStyles();
  let groupedData = [];
  if (optionGroups) {
    /*creating new copy of data and the objects inside, otherwise it keeps referencing to the original ones and adds 
<span> tags to the original data*/
    groupedData = data.map((obj) => {
      return { ...obj };
    });
    groupedData.map((entity) => {
      if (entity[id] != 0) {
        entity[value] = (
          //adding span tags to the group heaaders, to style them as group headers and differentiate from selectable options
          //9999 is just an ID to differentiate option group heading.
          <span className={entity[id] == 9999 ? classes.optionHeader : null}>
            {entity[value]}
          </span>
        );
      }
    });
  }
  const getOptions = (data) => {
    return data.map((dataEntity) => {
      return (
        <option key={dataEntity[value]} value={dataEntity[id]}>
          {dataEntity[value]}
        </option>
      );
    });
  };
  return (
    <>
      {data && (
        //eslint-disable-next-line
        <div onClick={onSelectorClick}>
          <FormSelect
            customClassNames={{
              select: classes.select,
              dropDown: classes.dropDown,
            }}
            keepErrorSpacing={false}
            onChange={(e) =>
              [0, 9999].includes(e.target.value) ? null : selectData(e)
            }
            name={dataType}
            value={currentValue ? currentValue : 0}
          >
            {groupedData.length > 0
              ? getOptions(groupedData)
              : getOptions(data)}
          </FormSelect>
        </div>
      )}
    </>
  );
};

Selector.propTypes = {
  currentValue: propTypes.oneOfType([propTypes.string, propTypes.number]),
  data: propTypes.arrayOf(propTypes.any).isRequired,
  dataType: propTypes.string,
  id: propTypes.string,
  onSelectorClick: propTypes.func,
  optionGroups: propTypes.bool,
  selectData: propTypes.func,
  text: propTypes.string,
  value: propTypes.string,
};

export default Selector;
