import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RequestParams } from "./SearchParams";

interface searchParamsState {
  value: RequestParams;
}

const initialState: searchParamsState = {
  value: {
    location: "",
    animal: null,
    breed: "",
  },
};

const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState,
  reducers: {
    all: (state, action: PayloadAction<RequestParams>) => {
      state.value = action.payload;
    },
  },
});

export const { all } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
