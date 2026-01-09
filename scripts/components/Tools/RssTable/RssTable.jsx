import {
  Button,
  Chip,
  ModalContext,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import RssUploadFrom from "./RssUploadForm/RssUploadForm.jsx";
import api from "../../../api/protected.index.js";
import classnames from "classnames";
import useStyles from "./RssUpload.styles.js";

const RssTable = () => {
  const [feeds, setFeeds] = useState([]);
  const { modalActions } = useContext(ModalContext);

  const getRssFeeds = async () => {
    api.getRssFeeds().then((res) => {
      setFeeds(() =>
        res.map((feed) => {
          return {
            ...feed,
            restrictions: feed.restrictions.map((g) => {
              return { ...g, label: g.name };
            }),
          };
        })
      );
    });
  };
  useEffect(() => {
    getRssFeeds();
  }, []);

  const classes = useStyles();

  const getModal = (btn, feed = {}) => ({
    id: `${btn} RSS Feed`,
    title: `${btn} RSS Feed`,
    component: (
      <RssUploadFrom
        action={btn}
        feed={feed}
        getRssFeeds={getRssFeeds}
        modalActions={modalActions}
      />
    ),
    customClassNames: {
      card: classes.modalCard,
    },
  });

  return (
    <div>
      <Button
        customClassNames={classes.addButton}
        onClick={() => modalActions.add(getModal("Upload"))}
      >
        + Add new RSS feed
      </Button>
      <Table>
        <TableHead>
          <TableHeader>Name</TableHeader>
          <TableHeader>URL</TableHeader>
          <TableHeader className={classes.actions}>Groups/Users</TableHeader>
          <TableHeader className={classes.actions}>&nbsp;</TableHeader>
        </TableHead>
        <TableBody>
          {feeds.map((feed) => (
            <TableRow key={feed.id}>
              <TableCell className={classes.tableCell}>{feed.name}</TableCell>
              <TableCell
                className={classnames(classes.tableCell, classes.urlCell)}
              >
                {feed.url}
              </TableCell>
              <TableCell className={classnames(classes.tableCell)}>
                {feed.restrictions.map((group) => (
                  <Chip
                    customClassNames={{ container: classes.chipDisplay }}
                    key={`${group.id + group.name}`}
                    value={group.name}
                    size="large"
                  >
                    {group.name}
                  </Chip>
                ))}
              </TableCell>
              <TableCell
                className={classnames(classes.tableCell, classes.actionsCell)}
              >
                <Button
                  type="text"
                  onClick={(e) =>
                    modalActions.add(getModal(e.target.innerText, feed))
                  }
                >
                  Edit
                </Button>{" "}
                /{" "}
                <Button
                  type="text"
                  onClick={(e) =>
                    modalActions.add(getModal(e.target.innerText, feed))
                  }
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RssTable;
