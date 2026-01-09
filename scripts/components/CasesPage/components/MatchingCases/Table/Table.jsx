import { DATETIME_FORMAT, DATE_FORMAT } from "../../../consts/Date.js";
import {
  FlexBox,
  Link,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";
import {
  getCaseTypes,
  getCategoryTypes,
  getStatusTypes,
} from "../../../../../helpers/localStorageHelper.js";

import Avatar from "../../../../common/Avatar/Avatar.jsx";
import DueByDate from "./DueByDate/DueByDate.jsx";
import SortableTableHeader from "./SortableTableHeader/SortableTableHeader.jsx";
import { TranslationContext } from "context/translate";
import activePermissionsSystem from "../../../../../consts/activePermissionsSystem.js";
import format from "date-fns/format";
import getConstituentDisplayName from "../../../../../helpers/getConstituentDisplayName.js";
import prefixCaseID from "../../../../../helpers/prefixCaseID.js";
import propTypes from "./Table.propTypes.js";
import { toLocalDate } from "../../../../../helpers/timezoneHelpers.js";
import useStyles from "./Table.styles.js";

const includeAccessibleByColumn = activePermissionsSystem;

const casetypes = getCaseTypes().reduce(
  (all, { id, casetype }) => ({ ...all, [id]: casetype }),
  {}
);
const statustypes = getStatusTypes().reduce(
  (all, { id, statustype }) => ({ ...all, [id]: statustype }),
  {}
);

const categorytypes = getCategoryTypes().reduce(
  (all, { id, categorytype }) => ({ ...all, [id]: categorytype }),
  {}
);

const CasesTable = ({ state, dispatch }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return [
    <div key="table" className={classes.tableWrapper}>
      <Table className={classes.table}>
        <TableHead>
          <TableHeader>{""}</TableHeader>
          <SortableTableHeader
            sortByName="caseID"
            state={state}
            dispatch={dispatch}
          >
            {iln.gettext("Ref.")}
          </SortableTableHeader>
          <SortableTableHeader
            sortByName="surname"
            state={state}
            dispatch={dispatch}
          >
            {iln.gettext("Constituent")}
          </SortableTableHeader>
          <SortableTableHeader
            sortByName="created"
            state={state}
            dispatch={dispatch}
          >
            {iln.gettext("Opened")}
          </SortableTableHeader>
          <TableHeader>{iln.gettext("Type")}</TableHeader>
          <TableHeader>{iln.gettext("Description")}</TableHeader>
          <TableHeader>{iln.gettext("Status")}</TableHeader>
          {includeAccessibleByColumn && (
            <TableHeader minWidth={150}>
              {iln.gettext("Accessible By")}
            </TableHeader>
          )}
          <SortableTableHeader
            sortByName="lastActioned"
            state={state}
            dispatch={dispatch}
          >
            {iln.gettext("Last Actioned")}
          </SortableTableHeader>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {state.results.cases.map(
            ({
              id: caseID,
              assignedInitials,
              constituent: { id: constituentID, ...constituent },
              created,
              reviewDate,
              caseType: casetypeID,
              status: statustypeID,
              category: categoryID,
              summary,
              tagged,
              restrictions = [],
              lastActioned,
            }) => (
              <TableRow key={caseID}>
                <TableCell
                  textAlign="center"
                  verticalAlign="center"
                  className={classes.avatarCell}
                >
                  <Avatar fullname={assignedInitials} />
                </TableCell>
                <TableCell
                  textAlign="center"
                  verticalAlign="center"
                  className={classes.caseCell}
                >
                  <Link underline href={`/viewcase.php?caseID=${caseID}`}>
                    {prefixCaseID(caseID)}
                  </Link>
                </TableCell>
                <TableCell
                  textAlign="center"
                  verticalAlign="center"
                  className={classes.constituentCell}
                >
                  <Link
                    underline
                    href={`/viewconstituent.php?constituentID=${constituentID}`}
                  >
                    {getConstituentDisplayName(constituent)}
                  </Link>
                </TableCell>
                <TableCell textAlign="center" verticalAlign="center">
                  <div>{format(toLocalDate(created), DATE_FORMAT)}</div>
                  <DueByDate reviewDate={reviewDate} />
                </TableCell>
                <TableCell
                  textAlign="center"
                  verticalAlign="center"
                  className={classes.typeCell}
                >
                  {categoryID &&
                  categorytypes[categoryID] &&
                  casetypeID &&
                  casetypes[casetypeID]
                    ? `${categorytypes[categoryID]}: ${casetypes[casetypeID]}`
                    : casetypeID && casetypes[casetypeID]
                    ? casetypes[casetypeID]
                    : ""}
                </TableCell>
                <TableCell
                  textAlign="left"
                  verticalAlign="center"
                  className={classes.summaryCell}
                >
                  {summary.length > 254
                    ? `${summary.slice(0, 254)}...`
                    : summary}
                  {summary.trim() !== "" && tagged.trim() !== "" && <br />}{" "}
                  {tagged !== "" && (
                    <em>{`${iln.gettext("Tagged")}: ${tagged}`}</em>
                  )}
                </TableCell>
                <TableCell
                  textAlign="center"
                  verticalAlign="center"
                  className={classes.statusCell}
                >
                  {statustypes[statustypeID] || ""}
                </TableCell>
                {includeAccessibleByColumn && (
                  <TableCell
                    className={classes.accessibleByCell}
                    textAlign={"center"}
                    verticalAlign={"center"}
                  >
                    {restrictions.join(", ")}
                  </TableCell>
                )}
                <TableCell
                  className={classes.lastActionedCell}
                  textAlign="center"
                  verticalAlign="center"
                >
                  {format(toLocalDate(lastActioned), DATETIME_FORMAT)}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>,
    <FlexBox key="pagination" hAlign="center" vAlign={"center"}>
      <Pagination
        currentPage={state.results.page}
        numberOfPages={Math.ceil(
          state.results.totalResults / parseInt(state.results.resultsPerPage)
        )}
        pageChange={(nextPage) =>
          dispatch({
            type: "SET_FILTERS",
            payload: { ...state.filters, pageNo: nextPage },
          })
        }
      />
    </FlexBox>,
  ];
};

CasesTable.propTypes = propTypes;

export default CasesTable;
