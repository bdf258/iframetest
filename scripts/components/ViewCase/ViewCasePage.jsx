import { InfiniteScroll, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useRef } from "react";

import ActionsAndNotes from "./ActionsAndNotes/ActionsAndNotes.jsx";
import CaseDetails from "./CaseDetails/CaseDetails.jsx";
import CasesErrorPage from "./ViewCaseErrorPage/ViewCaseErrorPage.jsx";
import ConstituentDetails from "./ConstituentDetails/ConstituentDetails.jsx";
import CustomBlocks from "./CustomBlocks/CustomBlocks.jsx";
import DropFilesToCase from "./DropFilesToCase";
import Footer from "../common/Footer.jsx";
import Page from "../common/Page.jsx";
import { TranslationContext } from "context/translate";
import dragEventContainsFiles from "../../helpers/dragEventContainsFiles.js";
import useGetNextCasenotesPage from "./hooks/useGetNextCasenotesPage.js";
import useMountViewCasePage from "./hooks/useMountViewCasePage.js";
import { useReduxSlice } from "./ViewCasePage.redux.js";
import { useStyles } from "./styles";
import { useTheme } from "react-jss";
import { useUpdateCaseDetailsModal } from "./hooks/useUpdateCaseDetailsModal";
import useWindowDragEvents from "../../hooks/useWindowDragEvents.js";

const dragAndDropModalID = "dragAndDropModalID";

const scrolltoTop = ({ current: element }) =>
  element.scrollTo({ top: 0, behavior: "smooth" });

const ViewCasePage = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const iln = useContext(TranslationContext);

  const { modalActions } = useContext(ModalContext);

  const infiniteScrollRef = useRef();
  const mountViewCasePage = useMountViewCasePage();
  const getNextCasenotesPage = useGetNextCasenotesPage();
  const {
    hasMore,
    caseDetails,
    casenotesFetching,
    showCaseStatusModal,
    caseID,
  } = useReduxSlice();

  useUpdateCaseDetailsModal(showCaseStatusModal);

  useWindowDragEvents({
    onDragEnter: (e) =>
      dragEventContainsFiles(e) &&
      modalActions.add({
        id: dragAndDropModalID,
        component: <DropFilesToCase modalID={dragAndDropModalID} />,
      }),
  });

  useEffect(() => {
    mountViewCasePage();
  }, []);

  if (caseDetails?.statusCode)
    return (
      <CasesErrorPage
        statusCode={caseDetails.statusCode}
        caseID={caseID}
        iln={iln}
      />
    );

  return (
    <React.Fragment>
      <InfiniteScroll
        hasMore={hasMore}
        loading={casenotesFetching}
        forwardRef={infiniteScrollRef}
        className={classes.infiniteScroll}
        onScrollBottom={() => getNextCasenotesPage()}
      >
        <Page>
          <div>
            <ConstituentDetails />
            <CaseDetails />
            <CustomBlocks
              customClassNames={{
                inputSpecificClasses: {
                  date: {
                    container: classes.customFieldDateInputContainer,
                  },
                },
              }}
            />
            <ActionsAndNotes />
          </div>
        </Page>
      </InfiniteScroll>
      <Footer onClick={() => scrolltoTop(infiniteScrollRef)} />
    </React.Fragment>
  );
};

export default ViewCasePage;
