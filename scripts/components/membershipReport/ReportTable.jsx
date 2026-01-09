/*eslint-disable*/
import {
  Button,
  FlexBox,
  FormSelect,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  select: {
    maxWidth: 200 + "px",
  },
});

const DownloadLink = ({ link }) => (
  <FlexBox hAlign={"flex-end"}>
    <div style={{ marginBottom: 5 }}>
      <Button type={"text"} onClick={() => window.open(link)}>
        Download
      </Button>
    </div>
  </FlexBox>
);

const getSortMethod = ({ sortBy, sortType, ascending }) =>
  ({
    string: ascending
      ? (a, b) => (a[sortBy] > b[sortBy] ? -1 : 1)
      : (a, b) => (b[sortBy] > a[sortBy] ? -1 : 1),
    number: ascending
      ? (a, b) => (a[sortBy] > b[sortBy] ? -1 : 1)
      : (a, b) => (b[sortBy] > a[sortBy] ? -1 : 1),
  }[sortType]);

const getHeader = (reportType, sorted, setSorted) =>
  reportType === 1 ? (
    <TableHead>
      <TableHeader
        sortable
        sortedBy={sorted.sortBy === "branch"}
        onSortClick={() =>
          setSorted({
            sortBy: "branch",
            sortType: "string",
            ascending: sorted.sortBy === "branch" ? !sorted.ascending : true,
          })
        }
      >
        Branch Name
      </TableHeader>
      <TableHeader
        sortable
        sortedBy={sorted.sortBy === "active"}
        onSortClick={() =>
          setSorted({
            sortBy: "active",
            sortType: "number",
            ascending: sorted.sortBy === "active" ? !sorted.ascending : true,
          })
        }
      >
        Active
      </TableHeader>
      <TableHeader
        sortable
        sortedBy={sorted.sortBy === "lapsed"}
        onSortClick={() =>
          setSorted({
            sortBy: "lapsed",
            sortType: "number",
            ascending: sorted.sortBy === "lapsed" ? !sorted.ascending : true,
          })
        }
      >
        Lapsed
      </TableHeader>
      <TableHeader
        sortable
        sortedBy={sorted.sortBy === "new"}
        onSortClick={() =>
          setSorted({
            sortBy: "new",
            sortType: "number",
            ascending: sorted.sortBy === "new" ? !sorted.ascending : true,
          })
        }
      >
        New
      </TableHeader>
      <TableHeader
        sortable
        sortedBy={sorted.sortBy === "renewals"}
        onSortClick={() =>
          setSorted({
            sortBy: "renewals",
            sortType: "number",
            ascending: sorted.sortBy === "renewals" ? !sorted.ascending : true,
          })
        }
      >
        Renewals
      </TableHeader>
      <TableHeader
        sortable
        sortedBy={sorted.sortBy === "resigned"}
        onSortClick={() =>
          setSorted({
            sortBy: "resigned",
            sortType: "number",
            ascending: sorted.sortBy === "resigned" ? !sorted.ascending : true,
          })
        }
      >
        Resigned
      </TableHeader>
      <TableHeader
        sortable
        sortedBy={sorted.sortBy === "unfinancial"}
        onSortClick={() =>
          setSorted({
            sortBy: "unfinancial",
            sortType: "number",
            ascending:
              sorted.sortBy === "unfinancial" ? !sorted.ascending : true,
          })
        }
      >
        Unfinancial
      </TableHeader>
    </TableHead>
  ) : (
    <TableHead>
      <TableHeader
        sortable
        sortedBy={sorted.sortBy === "ID"}
        onSortClick={() =>
          setSorted({
            sortBy: "ID",
            sortType: "number",
            ascending: sorted.sortBy === "ID" ? !sorted.ascending : true,
          })
        }
      >
        ID
      </TableHeader>
      <TableHeader
        sortable
        sortedBy={sorted.sortBy === "name"}
        onSortClick={() =>
          setSorted({
            sortBy: "name",
            sortType: "string",
            ascending: sorted.sortBy === "name" ? !sorted.ascending : true,
          })
        }
      >
        Name
      </TableHeader>
      <TableHeader
        sortable
        sortedBy={sorted.sortBy === "status"}
        onSortClick={() =>
          setSorted({
            sortBy: "status",
            sortType: "string",
            ascending: sorted.sortBy === "status" ? !sorted.ascending : true,
          })
        }
      >
        Status
      </TableHeader>
      <TableHeader
        sortable
        sortedBy={sorted.sortBy === "branch"}
        onSortClick={() =>
          setSorted({
            sortBy: "branch",
            sortType: "string",
            ascending: sorted.sortBy === "branch" ? !sorted.ascending : true,
          })
        }
      >
        Branch
      </TableHeader>
      <TableHeader
        sortable
        sortedBy={sorted.sortBy === "SEC"}
        onSortClick={() =>
          setSorted({
            sortBy: "SEC",
            sortType: "string",
            ascending: sorted.sortBy === "SEC" ? !sorted.ascending : true,
          })
        }
      >
        SEC
      </TableHeader>
    </TableHead>
  );

const getRows = (reportType, report) => {
  const rows = [];
  if (reportType === 1) {
    Object.entries(report.displayData).map(([key, value]) => {
      const newObj = {};
      newObj.branch = key;
      Object.entries(value).map(([key, value]) => (newObj[key] = value));
      rows.push(newObj);
    });
  } else {
    Object.entries(report.details).map((row) => {
      Object.entries(row[1]).map((obj) => {
        const tableRow = {};
        tableRow.ID = (
          <a
            href={`viewconstituent.php?constituentID=${obj[1].ID}`}
            target={"_blank"}
            rel={"noreferrer"}
          >
            {obj[1].ID}
          </a>
        );
        tableRow.name = obj[1].name;
        tableRow.status = obj[1].status;
        tableRow.branch = obj[1].branch;
        tableRow.SEC = obj[1].SEC;
        rows.push(tableRow);
      });
    });
  }
  return rows;
};

function ReportTable({ report }) {
  const [reportType, setReportType] = useState(1);
  const [rows, setRows] = useState([]);
  const [sorted, setSorted] = useState({
    sortBy: "branch",
    sortType: "string",
    ascending: true,
  });

  useEffect(() => {
    setRows([]);

    setTimeout(() => {
      setRows(getRows(reportType, report));
    }, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportType]);

  const classes = useStyles();
  return (
    <div style={{ marginTop: 20 }}>
      <FlexBox>
        <FormSelect
          label="Report Type"
          type="text"
          name="reportType"
          customClassNames={{
            select: classes.select,
          }}
          value={reportType}
          onChange={({ target: { value } }) => {
            setReportType(() => value);
          }}
        >
          <option value={1}>Summary</option>
          <option value={2}>Details</option>
        </FormSelect>
      </FlexBox>
      {report && rows.length > 1 && <DownloadLink link={report.url} />}
      {report && rows.length > 1 ? (
        <Table>
          {getHeader(reportType, sorted, setSorted)}
          <TableBody>
            {rows.sort(getSortMethod(sorted)).map((row, idx) =>
              reportType === 1 ? (
                <TableRow key={idx}>
                  <TableCell>{row.branch}</TableCell>
                  <TableCell>{row.active}</TableCell>
                  <TableCell>{row.lapsed}</TableCell>
                  <TableCell>{row.new}</TableCell>
                  <TableCell>{row.renewals}</TableCell>
                  <TableCell>{row.resigned}</TableCell>
                  <TableCell>{row.unfinancial}</TableCell>
                </TableRow>
              ) : (
                <TableRow key={idx}>
                  <TableCell>{row.ID}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.branch}</TableCell>
                  <TableCell>{row.SEC}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      ) : (
        <div>
          Generating Report ... <Spinner />
        </div>
      )}
      {report && rows.length > 1 && <DownloadLink link={report.url} />}
    </div>
  );
}

ReportTable.propTypes = {
  report: PropTypes.any,
};
DownloadLink.propTypes = {
  link: PropTypes.string,
};
export default ReportTable;
