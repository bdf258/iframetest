import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import scrollToCasenote from "../helpers/scrollToCasenote";
import sortCasenotes from "../helpers/sortCasenotes";

export const viewCaseSliceName = "viewCase";

const initialState = {
  selectedNote: null,
  temporaryNotes: [],
  showUpdateCaseStatusModal: false,
  caseworkers: undefined,
  constituent: undefined,
  caseDetails: undefined,
  casenotes: {
    casenotes: undefined,
    page: 1,
    hasMore: true,
    totalPages: undefined,
    totalResults: undefined,
    fetching: true,
  },
  casePermissions: undefined,
  contactTypes: undefined,
  doNotContactTypes: undefined,
};

const setCasenoteByIndex = (state, index, casenote) => {
  state.casenotes.casenotes[index] = {
    ...state.casenotes.casenotes[index],
    ...casenote,
  };
};

export const viewCaseSlice = createSlice({
  initialState,
  reducers: {
    dispatchAddTemporaryNote: (state, action) => {
      state.temporaryNotes = [...state.temporaryNotes, action.payload];
    },
    dispatchRemoveTemporaryNote: (state, action) => {
      state.temporaryNotes = state.temporaryNotes.filter(
        (tempNote) => tempNote !== action.payload
      );
    },
    dispatchSetSelectedNote: (state, action) => {
      state.selectedNote = action.payload;
    },
    dispatchRemoveSelectedNote: (state) => {
      state.selectedNote = null;
    },
    dispatchSetCaseworkers: (state, action) => {
      state.caseworkers = action.payload;
    },
    dispatchSetConstituent: (state, action) => {
      state.constituent = action.payload;
    },
    dispatchSetCaseDetails: (state, action) => {
      state.caseDetails = action.payload;
    },
    dispatchSetCasenotes: (state, action) => {
      state.casenotes.casenotes = sortCasenotes(action.payload);
    },
    dispatchAddCasenote: (state, action) => {
      state.casenotes.casenotes = sortCasenotes([
        ...state.casenotes.casenotes,
        action.payload,
      ]);
      state.casenotes.totalResults = state.casenotes.totalResults + 1;
    },
    dispatchMergeCasenotes: (state, action) => {
      const exisitngIDs = (state.casenotes.casenotes || []).map(({ id }) => id);

      const newCasenotes = [
        ...(state.casenotes.casenotes || []),
        ...action.payload.filter(({ id }) => !exisitngIDs.includes(id)),
      ];

      state.casenotes.casenotes = sortCasenotes(newCasenotes);
      if (
        action.payload.length === 0 ||
        state.casenotes.totalResults <= newCasenotes.length
      ) {
        state.casenotes.hasMore = false;
      }
    },
    dispatchUpdateCasenote: (state, { payload: { index, casenote } }) => {
      setCasenoteByIndex(state, index, casenote);
      state.casenotes.casenotes = sortCasenotes(state.casenotes.casenotes);
    },
    dispatchUpdateCasenoteThread: (state, { payload: { index, casenote } }) => {
      setCasenoteByIndex(state, index, casenote);
      state.casenotes.casenotes = sortCasenotes(state.casenotes.casenotes);
    },
    dispatchUpdateCasenoteByNoteId: (
      state,
      { payload: { noteId, casenote } }
    ) => {
      // This is temporary code to fix an issue with review dates requiring the note subTypeId to update the case note in the case note stream.
      // must be fixed at a later stage using a consistent payload for this action.
      const index = state.casenotes.casenotes.findIndex((casenote) => {
        switch (casenote.type) {
          case "reviewDate":
            return parseInt(casenote.subtypeID) === parseInt(noteId);
          default:
            return (
              parseInt(casenote.id || casenote?.detail?.id) === parseInt(noteId)
            );
        }
      });
      setCasenoteByIndex(state, index, casenote);
      state.casenotes.casenotes = sortCasenotes(state.casenotes.casenotes);
    },
    dispatchAutoUpdateCasenoteByNoteId: (
      state,
      { payload: { noteId, casenote } }
    ) => {
      // This is temporary code to fix an issue with review dates requiring the note subTypeId to update the case note in the case note stream.
      // must be fixed at a later stage using a consistent payload for this action.
      const index = state.casenotes.casenotes.findIndex((casenote) => {
        switch (casenote.type) {
          case "reviewDate":
            return parseInt(casenote.subtypeID) === parseInt(noteId);
          default:
            return (
              parseInt(casenote.id || casenote?.detail?.id) === parseInt(noteId)
            );
        }
      });
      setCasenoteByIndex(state, index, casenote);
      state.casenotes.casenotes = sortCasenotes(state.casenotes.casenotes);
    },
    dispatchRemoveCasenote: (state, action) => {
      state.casenotes.casenotes.splice(action.payload, 1);
      state.casenotes.totalResults = state.casenotes.totalResults - 1;
    },
    dispatchSetCasenotesPage: (state, action) => {
      state.casenotes.page = action.payload;
    },
    dispatchSetCasenotesFetching: (state, action) => {
      state.casenotes.fetching = action.payload;
    },
    dispatchSetCasenotesHasMore: (state, action) => {
      state.casenotes.hasMore = action.payload;
    },
    dispatchSetCasenotesTotalPages: (state, action) => {
      state.casenotes.totalPages = action.payload;
    },
    dispatchSetCasenotesTotalResults: (state, action) => {
      state.casenotes.totalResults = action.payload;
    },
    dispatchSetShowUpdateCaseStatusModal: (state, action) => {
      state.showUpdateCaseStatusModal = action.payload;
    },
    dispatchAddReviewDate: (state, action) => {
      state.casenotes.casenotes = sortCasenotes([
        ...state.casenotes.casenotes,
        action.payload,
      ]);
      state.casenotes.totalResults = state.casenotes.totalResults + 1;
    },
    dispatchSetReviewDateDetails: (
      state,
      { payload: { index, ...payload } }
    ) => {
      state.casenotes.casenotes[index].detail = {
        ...state.casenotes.casenotes[index].detail,
        ...payload,
      };
      state.casenotes.casenotes = sortCasenotes(state.casenotes.casenotes);
    },
    dispatchSetCasePermissions: (state, action) => {
      state.casePermissions = action.payload;
    },
    dispatchSetCaseRestrictions: (state, action) => {
      state.caseDetails = {
        ...state.caseDetails,
        restrictions: action.payload,
      };
    },
    dispatchSetCustomFields: (state, action) => {
      state.caseDetails.customFields = {
        ...state.caseDetails.customFields,
        ...action.payload,
      };
    },
    dispatchSetContactTypes: (state, action) => {
      state.contactTypes = action.payload;
    },
    dispatchSetDoNotContactTypes: (state, action) => {
      state.doNotContactTypes = action.payload;
    },
  },
  name: viewCaseSliceName,
});

export const {
  dispatchAddTemporaryNote,
  dispatchRemoveTemporaryNote,
  dispatchSetSelectedNote,
  dispatchRemoveSelectedNote,
  dispatchSetCaseworkers,
  dispatchSetConstituent,
  dispatchSetCaseDetails,
  dispatchSetCasenotes,
  dispatchAddCasenote,
  dispatchMergeCasenotes,
  dispatchUpdateCasenoteThread,
  dispatchUpdateCasenote,
  dispatchUpdateCasenoteByNoteId,
  dispatchAutoUpdateCasenoteByNoteId,
  dispatchRemoveCasenote,
  dispatchSetCasenotesPage,
  dispatchSetCasenotesFetching,
  dispatchSetCasenotesHasMore,
  dispatchSetCasenotesTotalPages,
  dispatchSetCasenotesTotalResults,
  dispatchSetShowUpdateCaseStatusModal,
  dispatchAddReviewDate,
  dispatchSetReviewDateDetails,
  dispatchSetCasePermissions,
  dispatchSetCaseRestrictions,
  dispatchSetCustomFields,
  dispatchSetContactTypes,
  dispatchSetDoNotContactTypes,
} = viewCaseSlice.actions;

// Selectors

export const selectTemporaryNotes = (state) =>
  state[viewCaseSliceName].temporaryNotes;
export const selectSelectedCaseNote = (state) =>
  state[viewCaseSliceName].selectedNote;
export const selectCaseworkers = (state) =>
  state[viewCaseSliceName].caseworkers;
export const selectConstituent = (state) =>
  state[viewCaseSliceName].constituent;
export const selectCaseDetails = (state) =>
  state[viewCaseSliceName].caseDetails;
export const selectCaseId = (state) =>
  state[viewCaseSliceName]?.caseDetails?.id;
export const selectCasenotes = (state) =>
  state[viewCaseSliceName].casenotes.casenotes;
export const selectCasenotesPage = (state) =>
  state[viewCaseSliceName].casenotes.page;
export const selectCasenotesFetching = (state) =>
  state[viewCaseSliceName].casenotes.fetching;
export const selectCasenotesHasMore = (state) =>
  state[viewCaseSliceName].casenotes.hasMore;
export const selectCasenotesTotalPages = (state) =>
  state[viewCaseSliceName].casenotes.totalPages;
export const selectCasenotesTotalResults = (state) =>
  state[viewCaseSliceName].casenotes.totalResults;
export const selectShowCaseStatusModal = (state) =>
  state[viewCaseSliceName].showUpdateCaseStatusModal;
export const selectCasePermissions = (state) =>
  state[viewCaseSliceName].casePermissions;
export const selectCustomFields = (state) =>
  state[viewCaseSliceName].caseDetails?.customFields;
export const selectContactTypes = (state) =>
  state[viewCaseSliceName].contactTypes;
export const selectDoNotContactTypes = (state) =>
  state[viewCaseSliceName].doNotContactTypes;

export default viewCaseSlice.reducer;

//*=============================================================
// SIDE EFFECTS: IMPORTANT
// When adding new actions to the redux store, they must be accounted for in the side effects.
// Not accounting for new actions or changing the way actions work may cause the listeners to break.
//*=============================================================

// Side effect handles the opening of the case status modal.
// There are two ways to open the modal:
// By force when setting the openUpdateCaseStatusModal property to true.
// A combination of the case note properties and the type of action.

export const scrollToCaseNote = (startListening) => {
  startListening({
    matcher: isAnyOf(dispatchAddCasenote, dispatchAddReviewDate),
    effect: async (action) => {
      scrollToCasenote(action.payload.id);
    },
  });
};

const openStatusModal = (status) => !!status;
const addingOrEditingANote = (actionType, action) => {
  const caseNoteType = action?.payload?.casenote?.type;

  return (
    (actionType === "viewCase/dispatchUpdateCasenote" ||
      actionType === "viewCase/dispatchAddCasenote") &&
    caseNoteType === "note"
  );
};

const savingALetter = (actionType, action) => {
  const caseNoteType = action?.payload?.casenote?.type;
  const openUpdateStatusModal =
    action?.payload?.casenote?.openUpdateStatusModal;

  return (
    (actionType === "viewCase/dispatchUpdateCasenote" ||
      actionType === "viewCase/dispatchUpdateCasenoteByNoteId") &&
    caseNoteType === "letter" &&
    openUpdateStatusModal
  );
};
const sendingAnEmail = (email, actionType) => {
  const caseNoteType = email.hasOwnProperty("casenote")
    ? email?.casenote?.type
    : email?.type;

  if (caseNoteType !== "email") return false;

  const emailType = email.hasOwnProperty("casenote")
    ? email.casenote.detail.type
    : email.detail.type;

  return (
    (actionType === "viewCase/dispatchUpdateCasenote" ||
      actionType === "viewCase/dispatchAddCasenote" ||
      actionType === "viewCase/dispatchUpdateCasenoteByNoteId") &&
    emailType === "sent"
  );
};

export const updateCaseStatus = (startListening) => {
  startListening({
    predicate: (action) => {
      if (action.type === "viewCase/dispatchRemoveSelectedNote") return false;

      // openUpdateCaseStatusModal property is true
      // opens case status modal
      if (openStatusModal(action.payload?.openUpdateStatusModal)) {
        return true;
      }

      const actionType = action.type;

      //updating a letter
      //opens case status modal
      if (savingALetter(actionType, action)) {
        return true;
      }

      // adding or updating a note
      // opens case status modal
      if (addingOrEditingANote(actionType, action)) {
        //checks if we don't want to open case status modal
        return action.payload.hasOwnProperty("openUpdateStatusModal")
          ? action.payload?.openUpdateStatusModal
          : true;
      }

      // email sent
      // opens case status modal
      if (sendingAnEmail(action.payload, action.type)) {
        return true;
      }

      return false;
    },
    effect: async (action, listerApi) => {
      listerApi.dispatch(dispatchSetShowUpdateCaseStatusModal(true));
    },
  });
};
