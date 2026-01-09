import { configureStore } from "@reduxjs/toolkit";
import inboxReducer from "../components/Inbox/slice/inboxSlice";

export default configureStore({
  reducer: {
    inbox: inboxReducer,
  },
});
