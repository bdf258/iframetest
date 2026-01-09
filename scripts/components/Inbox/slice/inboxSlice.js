import { createSlice } from "@reduxjs/toolkit";
import initialState from "../consts/initialState";
import sortInboxItems from "../helpers/sortInboxItems";
import { setInboxFilterOptions as updateLocalStorage } from "../../../helpers/localStorageHelper";

export const inboxSliceName = "inbox";

export const inboxSlice = createSlice({
  name: inboxSliceName,
  initialState,
  reducers: {
    dispatchSetCaseworkers: (state, action) => {
      state.caseworkers = action.payload;
    },
    dispatchUpdateInboxFilters: (state, action) => {
      // If change is not page
      if (!("page" in action.payload) || action.payload.page === 1) {
        // remove existing items
        state.results = initialState.results;
        // clear select items
        state.selected = initialState.selected;
        // clear focused item
        state.focusedID = initialState.focusedID;
        // reset the page
        state.filters.page = initialState.filters.page;
      }

      const newFilters = {
        ...state.filters,
        ...action.payload,
        contains: {
          ...state.filters.contains,
          ...(action.payload?.contains || {}),
        },
      };

      updateLocalStorage({ filters: newFilters, datetime: new Date() });
      state.filters = newFilters;
    },
    dispatchAddResults: (state, action) => {
      state.results = {
        ...state.results,
        ...action.payload,
        items: {
          ...(state.results.items || {}),
          ...action.payload.items.reduce(
            (all, next) => ({
              ...all,
              [next.id]: next,
            }),
            {}
          ),
        },
      };
    },
    dispatchAddToSelected: (state, action) => {
      state.selected = { ...state.selected, [action.payload.id]: true };

      if (!(action.payload.id in state.selected)) {
        state.lastSelectedID = action.payload.id;
      }
    },
    dispatchBulkAddToSelected: (state, action) => {
      const { index: clickedIndex, item: clickedItem } = action.payload;

      const itemIDs = sortInboxItems(
        Object.values(state.results.items),
        state.filters.dir
      ).map(({ id }) => parseInt(id));
      const lastSelectedIndex = itemIDs.findIndex(
        (id) => id === (state.lastSelectedID || itemIDs[0])
      );

      if (clickedIndex > -1 && lastSelectedIndex > -1) {
        const additionalSelected = (
          clickedIndex <= lastSelectedIndex
            ? itemIDs.slice(clickedIndex, lastSelectedIndex + 1)
            : itemIDs.slice(lastSelectedIndex, clickedIndex + 1)
        ).reduce((all, next) => ({ ...all, [next]: true }), {});

        state.selected = { ...state.selected, ...additionalSelected };
        state.focusedID = clickedItem.id;
      }
    },
    dispatchSelectAll: (state) => {
      const allIDs = Object.values(state.results.items)
        .map(({ id }) => parseInt(id))
        .reduce((all, next) => ({ ...all, [next]: true }), {});

      state.selected = allIDs;
    },
    dispatchRemoveFromSelected: (state, action) => {
      delete state.selected[action.payload.id];
    },
    dispatchResetSelected: (state) => {
      state.selected = initialState.selected;
    },
    dispatchUpdateItem: (state, action) => {
      if (
        action?.payload?.id &&
        state?.results?.items &&
        action?.payload?.id in state.results.items
      ) {
        const newItem = {
          ...state.results.items[action.payload.id],
          ...action.payload,
        };
        state.results.items = {
          ...state.results.items,
          [action.payload.id]: newItem,
        };
      }
    },
    dispatchRemoveItems: (state, action) => {
      let deleteCount = 0;

      const payload = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      payload.forEach((value) => {
        const id = value?.id || value;
        if (id in state.results.items) {
          delete state.selected[id];
          delete state.results.items[id];
          deleteCount += 1;

          if (id === state.focusedID) {
            state.focusedID = undefined;
          }
        }
      });

      state.results.pagination.rows -= deleteCount;
    },
    dispatchSetItemsLoading: (state, action) => {
      state.results.loading = action.payload;
    },
    dispatchSetFocusedID: (state, action) => {
      state.focusedID = action.payload;
      state.lastSelectedID = action.payload;
    },
    dispatchUpdateConstituents: (state, action) => {
      state.constituents[action.payload.id] = action.payload;
    },
    dispatchUpdateCases: (state, action) => {
      state.cases[action.payload.id] = action.payload;
    },
    dispatchUpdateContactTypes: (state, action) => {
      state.contactTypes = action.payload;
    },
    dispatchSetOrganisationTypes: (state, action) => {
      state.organisationTypes = action.payload;
    },
    dispatchAddOrganisationType: (state, action) => {
      console.log(
        action.payload,
        action.payload.trim() !== "" &&
          !state.organisationTypes.some(
            (orgType) =>
              orgType.trim().toLowerCase() !==
              action.payload.trim().toLowerCase()
          )
      );
      if (
        action.payload.trim() !== "" &&
        !state.organisationTypes.some(
          (orgType) =>
            orgType.trim().toLowerCase() === action.payload.trim().toLowerCase()
        )
      )
        state.organisationTypes = [
          ...state.organisationTypes,
          action.payload.trim(),
        ];
    },
    dispatchSetConnectionTypes: (state, action) => {
      state.connectionTypes = action.payload;
    },
    dispatchSetRoleTypes: (state, action) => {
      state.roleTypes = action.payload;
    },
  },
});

export const {
  dispatchSetCaseworkers,
  dispatchUpdateInboxFilters,
  dispatchAddResults,
  dispatchUpdateItem,
  dispatchRemoveItems,
  dispatchSetItemsLoading,
  dispatchSetFocusedID,
  dispatchAddToSelected,
  dispatchBulkAddToSelected,
  dispatchRemoveFromSelected,
  dispatchResetSelected,
  dispatchSelectAll,
  dispatchUpdateConstituents,
  dispatchUpdateCases,
  dispatchUpdateContactTypes,
  dispatchSetOrganisationTypes,
  dispatchAddOrganisationType,
  dispatchSetConnectionTypes,
  dispatchSetRoleTypes,
} = inboxSlice.actions;

// Selectors
export const selectCaseworkers = (state) => state[inboxSliceName].caseworkers;
export const selectFilters = (state) => state[inboxSliceName].filters;
export const selectFilterInboxType = (state) =>
  state[inboxSliceName].filters.inboxType;
export const selectFilterCaseworkerID = (state) =>
  state[inboxSliceName].filters.caseworkerID;
export const selectFilterSortDirection = (state) =>
  state[inboxSliceName].filters.dir;
export const selectFilterPage = (state) => state[inboxSliceName].filters.page;
export const selectFilterContainsType = (state) =>
  state[inboxSliceName].filters.contains.type;
export const selectFilterContainsValue = (state) =>
  state[inboxSliceName].filters.contains.value;
export const selectItems = (state) =>
  sortInboxItems(
    state[inboxSliceName].results.items
      ? Object.values(state[inboxSliceName].results.items)
      : state[inboxSliceName].results.items,
    selectFilterSortDirection(state)
  );
export const selectItemsLength = (state) =>
  Object.values(state[inboxSliceName].results?.items || {}).length;
export const selectItemsTotal = (state) =>
  state[inboxSliceName].results?.pagination.rows;
export const selectItemsLoading = (state) =>
  state[inboxSliceName].results.loading;
export const selectHasMore = (state) =>
  selectItems(state)?.length < state[inboxSliceName].results.pagination.rows;
export const selectSelected = (state) => state[inboxSliceName].selected;
export const selectSelectedItemIds = (state) =>
  Object.keys(selectSelected(state)).map((id) => parseInt(id));
export const selectSelectedItems = (state) =>
  selectItems(state)?.filter((item) => item.id in selectSelected(state));
export const selectItemsAssignedToCase = (state) =>
  selectItems(state)?.filter(
    (item) => item.id in selectSelected(state) && !!item.caseID
  );
export const selectItemsWithoutCase = (state) =>
  selectItems(state)?.filter(
    (item) => item.id in selectSelected(state) && !item.caseID
  );
export const selectDeletableItems = (state) =>
  selectItems(state)?.filter(
    ({ id, caseID, type }) =>
      id in selectSelected(state) && (!caseID || type === "draft")
  );
export const selectFocusedID = (state) => state[inboxSliceName].focusedID;
export const selectFocusedItem = (state) => {
  const focusedID = state[inboxSliceName].focusedID;
  const items = state[inboxSliceName].results.items;

  if (items !== undefined) {
    if (focusedID === undefined) {
      return sortInboxItems(
        Object.values(items),
        state[inboxSliceName].filters.dir
      )[0];
    } else {
      return items[focusedID];
    }
  }
};
export const selectCases = (state) => state[inboxSliceName].cases;
export const selectConstituents = (state) => state[inboxSliceName].constituents;
export const selectContactTypes = (state) => state[inboxSliceName].contactTypes;
export const selectOrganisationTypes = (state) =>
  state[inboxSliceName].organisationTypes;
export const selectConnectionTypes = (state) =>
  state[inboxSliceName].connectionTypes;
export const selectRoleTypes = (state) => state[inboxSliceName].roleTypes;

export default inboxSlice.reducer;
