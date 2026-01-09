import { format, isValid, parse } from "date-fns";

import React from "react";
import { TableHeader } from "@electedtech/electedtech-ui";
import compareAsc from "date-fns/compareAsc";
import compareDesc from "date-fns/compareDesc";
import datestring from "../../../types/datestring";
import propTypes from "prop-types";

const parseDateTime = (dateTimeString) => {
  try {
    const parsedDate = parse(dateTimeString, "dd/MM/yyyy hh:mm a", new Date());

    if (!isValid(parsedDate)) {
      throw new Error("Invalid date");
    }
    return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss");
  } catch (error) {
    return datestring;
  }
};

export const getSortMethod = ({ sortBy, sortType, ascending }) =>
  ({
    date: ascending
      ? (a, b) => compareAsc(new Date(a[sortBy]), new Date(b[sortBy]))
      : (a, b) => compareDesc(new Date(a[sortBy]), new Date(b[sortBy])),
    dateTime: ascending
      ? (a, b) =>
          compareAsc(
            new Date(parseDateTime(a[sortBy])),
            new Date(parseDateTime(b[sortBy]))
          )
      : (a, b) =>
          compareDesc(
            new Date(parseDateTime(a[sortBy])),
            new Date(parseDateTime(b[sortBy]))
          ),
    string: ascending
      ? (a, b) => (a[sortBy] > b[sortBy] ? -1 : 1)
      : (a, b) => (b[sortBy] > a[sortBy] ? -1 : 1),
    number: ascending
      ? (a, b) => (a[sortBy] > b[sortBy] ? -1 : 1)
      : (a, b) => (b[sortBy] > a[sortBy] ? -1 : 1),
  }[sortType]);

export const SortedHeader = ({
  sortBy,
  sortType,
  sorted,
  setSorted,
  children,
}) => {
  return (
    <TableHeader
      sortedBy={sorted.sortBy === sortBy}
      onSortClick={() =>
        setSorted({
          sortBy: sortBy,
          sortType: sortType,
          ascending: sorted.sortBy === sortBy ? !sorted.ascending : true,
        })
      }
    >
      {children}
    </TableHeader>
  );
};

SortedHeader.propTypes = {
  children: propTypes.node,
  setSorted: propTypes.func,
  sortBy: propTypes.string,
  sortType: propTypes.string,
  sorted: propTypes.object,
};
