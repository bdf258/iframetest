import {
  FlexBox,
  InfiniteScroll,
  List,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useEffect, useMemo, useRef, useState } from "react";

import DropFilesToInbox from "./DropFilesToInbox/DropFilesToInbox.jsx";
import InboxItem from "./InboxItem/InboxItem.jsx";
import ItemListPlaceholder from "./ItemListPlaceholder.jsx";
import SelectAllButtons from "./SelectAllButtons/SelectAllButtons.jsx";
import { useIsSliderOpen } from "./common/useIsSliderOpen.js";
import { useReduxSlice } from "./ItemList.redux.js";
import { useStyles } from "./styles";

const ItemList = () => {
  const hideList = useIsSliderOpen();
  const classes = useStyles({ hideList });

  const scrollRef = useRef();

  const [showDropZone, setShowDropZone] = useState(false);

  const { items, itemsLoading, hasMore, page, updateFilters } = useReduxSlice();

  useEffect(() => {
    if (scrollRef?.current && itemsLoading)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [itemsLoading]);

  const inboxItems = useMemo(
    () =>
      (items || []).map((item, index) => (
        <InboxItem index={index} item={item} key={item.id} />
      )),
    [items.length]
  );

  if (!items) {
    return (
      <aside className={classes.listContainer}>
        <ItemListPlaceholder />
      </aside>
    );
  }

  return (
    <aside
      className={classes.itemList}
      ref={scrollRef}
      onDragEnter={(e) => {
        e.stopPropagation();
        setShowDropZone(true);
      }}
    >
      {showDropZone ? (
        <DropFilesToInbox
          onCloseClick={() => {
            setShowDropZone(false);
            updateFilters({ page: 1 });
          }}
        />
      ) : (
        <InfiniteScroll
          loading={itemsLoading}
          hasMore={hasMore}
          onScrollBottom={() => updateFilters({ page: page + 1 })}
          className={classes.InfiniteScrollContainer}
        >
          <SelectAllButtons />
          <List indent={false} bulletPoints={false}>
            <ul className={classes.list}>
              {inboxItems}
              {itemsLoading && (
                <li className={classes.loadingMoreItemsContainer}>
                  <FlexBox hAlign="center" vAlign="center">
                    <Spinner scale={1} />
                  </FlexBox>
                </li>
              )}
            </ul>
          </List>
        </InfiniteScroll>
      )}
    </aside>
  );
};

export default ItemList;
