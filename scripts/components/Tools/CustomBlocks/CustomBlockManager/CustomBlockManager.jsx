import {
  Button,
  FlexBox,
  ModalContext,
  NotificationBox,
  Pagination,
  Spinner,
  Switcher,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect } from "react";

import CustomBlockEditor from "./CustomBlockEditor/CustomBlockEditor.jsx";
// import CustomBlockFilter from "./CustomBlockFilter/CustomBlockFilter.jsx";
import CustomBlockTable from "./CustomBlockTable/CustomBlockTable.jsx";
import ErrorPage from "../../../common/ErrorPage.jsx";
import { TranslationContext } from "context/translate";
import customBlocksApi from "../../../../api/src/customBlocks";
import { getUserIdentity } from "../../../../helpers/localStorageHelper";
import useCustomBlocks from "./hooks/useCustomBlocks";
import useDeleteCustomBlock from "./DeleteCustomBlock/hooks/useDeleteCustomBlock";
import useGenericConfirmationModal from "./common/hooks/useGenericConfirmationModal";
import useStyles from "./CustomBlockManager.styles";

const filterCustomBlocks = (customBlocks, filter) => {
  if (filter.parentObject === "allParentObjects") return customBlocks;
  return customBlocks.filter(
    (customBlock) => customBlock.parent_object === filter.parentObject
  );
};

const CustomBlockManager = () => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);
  const { openModal } = useGenericConfirmationModal();
  const { openDeleteCustomBlockModal } = useDeleteCustomBlock();
  const [state, dispatch] = useCustomBlocks({
    filter: {
      parentObject: "allParentObjects",
    },
    selectedBlock: undefined,
    customBlocks: [],
    page: 1,
    numberOfPages: 1,
    view: "LOADING",
    itemLimit: 10,
  });

  const {
    customBlocks,
    selectedCustomBlock,
    filter,
    view,
    page,
    numberOfPages,
    itemLimit,
  } = state;

  const CUSTOM_BLOCK_AVAILABLE = customBlocks?.length !== 0;

  /**
   *   when a block is deleted and it is the last page one on the page
   *   this hook directs the user back to the first page
   */
  useEffect(() => {
    if (customBlocks.length === 0 && page !== 1) {
      customBlocksApi.customBlocks(1, itemLimit, modalActions).then((res) => {
        dispatch({
          type: "SET_INITIAL_CUSTOM_BLOCKS",
          payload: res.data,
        });
        dispatch({
          type: "SET_CURRENT_PAGE",
          payload: 1,
        });
        dispatch({
          type: "SET_NUMBER_OF_PAGES",
          payload: res.pagination.pages,
        });
      });
    }
  }, [customBlocks]);

  const handlePageChange = (pageToChangeTo) => {
    dispatch({
      type: "SET_VIEW",
      payload: "LOADING",
    });
    customBlocksApi
      .customBlocks(pageToChangeTo, itemLimit, modalActions)
      .then((res) => {
        dispatch({
          type: "SET_INITIAL_CUSTOM_BLOCKS",
          payload: res.data,
        });
        dispatch({
          type: "SET_CURRENT_PAGE",
          payload: pageToChangeTo,
        });
      })
      .finally(() => {
        dispatch({
          type: "SET_VIEW",
          payload: "TABLE",
        });
      });
  };

  const { isAdmin } = getUserIdentity() || {};

  if (!isAdmin) return <ErrorPage statusCode="403" />;

  return (
    <div className={classes.customBlockManagerContainer}>
      <h1>{iln.gettext("Manage Custom Blocks")}</h1>
      <Switcher selected={view}>
        {{
          LOADING: (
            <FlexBox hAlign={"center"}>
              <Spinner scale={1} />
            </FlexBox>
          ),
          TABLE: (
            <React.Fragment>
              {!CUSTOM_BLOCK_AVAILABLE && (
                <NotificationBox
                  type={"info"}
                  alertMessage={iln.gettext("No custom blocks available")}
                />
              )}
              {CUSTOM_BLOCK_AVAILABLE && (
                <React.Fragment>
                  {/*<CustomBlockFilter filter={filter} dispatch={dispatch} />*/}
                  <CustomBlockTable
                    customBlocks={filterCustomBlocks(customBlocks, filter)}
                    handleEdit={(customBlockId) => {
                      dispatch({
                        type: "SET_SELECTED_CUSTOM_BlOCK",
                        payload: customBlockId,
                      });
                      dispatch({ type: "SET_VIEW", payload: "EDIT" });
                    }}
                    handleDelete={(id, name, parent_object) => {
                      openModal(
                        "Delete Custom Block",
                        `Are you sure you want to delete the Custom Block: ${name}?`,
                        () => {
                          openDeleteCustomBlockModal(
                            id,
                            name,
                            parent_object,
                            (customBlockId) => {
                              dispatch({
                                type: "DELETE_CUSTOM_BLOCK",
                                payload: {
                                  customBlockId,
                                },
                              });
                            }
                          );
                        }
                      );
                    }}
                  />
                  <FlexBox hAlign={"center"}>
                    <Pagination
                      currentPage={page}
                      numberOfPages={numberOfPages}
                      pageChange={(pageToNavigateTo) =>
                        handlePageChange(pageToNavigateTo)
                      }
                    />
                  </FlexBox>
                </React.Fragment>
              )}
              <FlexBox hAlign={"end"}>
                <Button
                  onClick={() => {
                    dispatch({
                      type: "CLEAR_SELECTED_CUSTOM_BLOCK",
                    });
                    dispatch({ type: "SET_VIEW", payload: "EDIT" });
                  }}
                >
                  {iln.gettext("Create New Custom Block")}
                </Button>
              </FlexBox>
            </React.Fragment>
          ),
          EDIT: (
            <CustomBlockEditor
              customBlocks={customBlocks}
              saveExistingCustomBlock={(customBlocks) => {
                dispatch({
                  type: "UPDATE_EXISTING_CUSTOM_BLOCK",
                  payload: customBlocks,
                });
                dispatch({
                  type: "SET_VIEW",
                  payload: "TABLE",
                });
              }}
              saveNewCustomBlock={(customBlock) => {
                dispatch({
                  type: "SET_NEW_CUSTOM_BLOCK",
                  payload: customBlock,
                });
                dispatch({
                  type: "SET_VIEW",
                  payload: "TABLE",
                });
              }}
              selectedCustomBlock={selectedCustomBlock}
              cancelEditCustomBlock={() =>
                dispatch({
                  type: "SET_VIEW",
                  payload: "TABLE",
                })
              }
            />
          ),
        }}
      </Switcher>
    </div>
  );
};

export default CustomBlockManager;
