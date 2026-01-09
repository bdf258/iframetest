import { FlexBox, FormCheckbox } from "@electedtech/electedtech-ui";
import { format, isToday, isValid } from "date-fns";

import AttachmentIcon from "../../../../../common/icons/AttachmentIcon.jsx";
import { DATE_FORMAT } from "../../../../../../consts/Date.js";
import ItemHeading from "./ItemHeading/ItemHeading.jsx";
import ItemSubject from "./ItemSubject/ItemSubject.jsx";
import ItemSummary from "./ItemSummary/ItemSummary.jsx";
import React from "react";
import classnames from "classnames";
import { itemPropType } from "./InboxItem.propTypes.js";
import { useIsSliderOpen } from "../common/useIsSliderOpen.js";
import { useReduxSlice } from "./InboxItem.redux.js";
import { useStyles } from "./InboxItem.styles.js";

const formatDateStr = (dateStr) => {
  const date = new Date(`${dateStr.replace(" ", "T")}Z`);
  if (!isValid(date)) return null;

  return format(date, isToday(date) ? DATE_FORMAT.TIME : DATE_FORMAT.DATE);
};

const InboxItem = ({ index, item }) => {
  const allowFocusChange = !useIsSliderOpen();
  const classes = useStyles();

  const {
    selectedItems,
    focusedItem,
    addToSelected,
    removeFromSelected,
    bulkAddToSelected,
    setFocusedID,
  } = useReduxSlice();

  const selected = item.id in selectedItems;
  const focused = focusedItem?.id === item?.id;

  return (
    <li
      className={classnames(
        classes.item,
        selected ? classes.selected : focused ? classes.focused : null
      )}
    >
      <FlexBox hAlign={"left"}>
        <button
          onClick={(e) => {
            if (allowFocusChange) {
              selected ? removeFromSelected(item) : addToSelected(item);
              if (e.ctrlKey || e.metaKey) {
                if (focusedItem.id !== item.id) {
                  addToSelected(focusedItem);
                }
              } else if (e.shiftKey || e.metaKey) {
                bulkAddToSelected({ index, item });
              } else if (focusedItem.id !== item.id) {
                setFocusedID(item.id);
              }
            }
          }}
          className={classes.checkboxButton}
        >
          <FormCheckbox
            name={"itemSelect"}
            value={selected}
            keepErrorSpacing={false}
            customClassNames={{
              input: classes.checkboxInput,
            }}
          />
        </button>
        <div
          className={classes.itemContentContainer}
          onKeyDown={() => {}}
          tabIndex={index}
          role="button"
          onClick={(e) => {
            if (allowFocusChange) {
              if (e.ctrlKey || e.metaKey) {
                selected ? removeFromSelected(item) : addToSelected(item);
                if (focusedItem.id !== item.id) {
                  addToSelected(focusedItem);
                }
              } else if (e.shiftKey) {
                bulkAddToSelected({ index, item });
              } else if (focusedItem.id !== item.id) {
                setFocusedID(item.id);
              }
            }
          }}
        >
          <FlexBox column>
            <FlexBox>
              <header>
                <ItemHeading item={item} />
              </header>
              {item.attachment_count > 0 && (
                <div className={classes.attachmentIconContainer}>
                  <AttachmentIcon
                    className={classes.attachmentIcon}
                    width={18}
                    height={18}
                  />
                </div>
              )}
              <time className={classes.date}>
                {formatDateStr(item.dateTime)}
              </time>
            </FlexBox>
            <FlexBox>
              <ItemSubject subject={item.subject} />
            </FlexBox>
            {item.summary && <ItemSummary summary={item.summary} />}
          </FlexBox>
        </div>
      </FlexBox>
    </li>
  );
};

InboxItem.propTypes = itemPropType;

export default InboxItem;
