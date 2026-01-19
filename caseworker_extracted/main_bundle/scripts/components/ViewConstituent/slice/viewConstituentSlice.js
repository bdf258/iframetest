import { createSlice } from "@reduxjs/toolkit";

export const viewConstituentSliceName = "viewConstituent";

const initialState = {
  constituent: undefined,
};

export const viewConstituentSlice = createSlice({
  initialState,
  reducers: {
    dispatchSetConstituent: (state, action) => {
      state.constituent = action.payload;
    },
  },
  name: viewConstituentSliceName,
});

export const { dispatchSetConstituent } = viewConstituentSlice.actions;

export const selectConstituentDetails = (state) =>
  state[viewConstituentSliceName].constituent;

export default viewConstituentSlice.reducer;
