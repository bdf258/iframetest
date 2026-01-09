import { configureStore } from "@reduxjs/toolkit";
import viewConstituentReducer from "../components/ViewConstituent/slice/viewConstituentSlice";

export default configureStore({
  reducer: {
    viewConstituent: viewConstituentReducer,
  },
});
