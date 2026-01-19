import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import viewCaseReducer, {
  scrollToCaseNote,
  updateCaseStatus,
} from "../components/ViewCase/slice/viewCaseSlice";

const listenerMiddleware = createListenerMiddleware();

scrollToCaseNote(listenerMiddleware.startListening);
updateCaseStatus(listenerMiddleware.startListening);

export default configureStore({
  reducer: {
    viewCase: viewCaseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
