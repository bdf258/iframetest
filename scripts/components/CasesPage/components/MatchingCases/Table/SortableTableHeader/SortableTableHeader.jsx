import React from "react";
import { TableHeader } from "@electedtech/electedtech-ui";
import propTypes from "./SortableTableHeader.propTypes.js";

const dispatchSetFilters = (
  newOrderBy,
  { filters: { orderBy, orderByDirection, ...filters } },
  dispatch
) =>
  dispatch({
    type: "SET_FILTERS",
    payload: {
      ...filters,
      orderBy: newOrderBy,
      orderByDirection:
        orderBy !== newOrderBy
          ? "DESC"
          : orderByDirection === "DESC"
          ? "ASC"
          : "DESC",
    },
  });

const isSortedBy = (name, { filters: { orderBy, orderByDirection } }) =>
  orderBy === name ? (orderByDirection === "DESC" ? false : true) : null;

const SortableTableHeader = ({
  sortByName,
  children,
  state,
  dispatch,
  ...props
}) => {
  return (
    <TableHeader
      {...props}
      sortedBy={isSortedBy(sortByName, state)}
      onSortClick={() => dispatchSetFilters(sortByName, state, dispatch)}
    >
      {children}
    </TableHeader>
  );
};

SortableTableHeader.propTypes = propTypes;

export default SortableTableHeader;
