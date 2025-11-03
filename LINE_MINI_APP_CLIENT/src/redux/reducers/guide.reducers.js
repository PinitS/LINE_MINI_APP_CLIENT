import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  count: 0,
};
export const slice = createSlice({
  name: "guide",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setCount } = slice.actions;

export default slice.reducer;
