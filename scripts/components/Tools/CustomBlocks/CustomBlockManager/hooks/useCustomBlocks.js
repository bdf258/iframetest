import { useContext, useEffect, useReducer } from "react";
import { ModalContext } from "@electedtech/electedtech-ui";
import customBlocksApi from "../../../../../api/src/customBlocks";
import localStorageHelper from "../../../../../helpers/localStorageHelper";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_INITIAL_CUSTOM_BLOCKS": {
      return { ...state, customBlocks: payload };
    }

    case "SET_NEW_CUSTOM_BLOCK": {
      const customBlocks = [...state.customBlocks, payload];
      localStorageHelper.setItem("customField_blocks", customBlocks);

      return { ...state, customBlocks };
    }

    case "UPDATE_EXISTING_CUSTOM_BLOCK": {
      // returns slice of custom blocks for the current page
      const customBlockOnCurrentPage = payload.slice(
        (state.page - 1) * state.itemLimit,
        state.page * state.itemLimit
      );

      localStorageHelper.setItem("customField_blocks", payload);

      return { ...state, customBlocks: customBlockOnCurrentPage };
    }

    case "SET_SELECTED_CUSTOM_BlOCK": {
      return {
        ...state,
        selectedCustomBlock: state.customBlocks.find(
          (customBlock) => customBlock.id === payload
        ),
      };
    }

    case "DELETE_CUSTOM_BLOCK": {
      const { customBlockId } = payload;

      const customBlocks = state.customBlocks.filter(
        (customBlock) => customBlock.id !== customBlockId
      );
      localStorageHelper.setItem("customField_blocks", customBlocks);
      return { ...state, customBlocks };
    }

    case "CLEAR_SELECTED_CUSTOM_BLOCK": {
      return {
        ...state,
        selectedCustomBlock: undefined,
      };
    }

    case "SET_VIEW": {
      return {
        ...state,
        view: payload,
      };
    }
    case "SET_FILTER_PARENT_OBJECT": {
      return {
        ...state,
        filter: {
          ...state.filter,
          parentObject: payload,
        },
      };
    }

    case "SET_CURRENT_PAGE": {
      return { ...state, page: payload };
    }

    case "SET_NUMBER_OF_PAGES": {
      return { ...state, numberOfPages: payload };
    }

    default: {
      throw new Error(`The ACTION of TYPE: ${type} is not recognised`);
    }
  }
};
const useCustomBlocks = (initialState) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
  });

  const { setModalState } = useContext(ModalContext);

  useEffect(() => {
    customBlocksApi
      .customBlocks(1, initialState.itemLimit, setModalState)
      .then((res) => {
        dispatch({
          type: "SET_INITIAL_CUSTOM_BLOCKS",
          payload: res.data,
        });
        dispatch({
          type: "SET_NUMBER_OF_PAGES",
          payload: res.pagination.pages,
        });
        dispatch({
          type: "SET_VIEW",
          payload: "TABLE",
        });
      });
  }, []);

  return [state, dispatch];
};

export default useCustomBlocks;
