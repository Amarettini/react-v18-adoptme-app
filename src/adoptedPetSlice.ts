import { createSlice } from "@reduxjs/toolkit";
import { Pet } from "./APIResponsesTypes";

export const adoptedPetSlice = createSlice({
  name: "adoptedPet",
  initialState: {
    value: null as Pet | null,
  },
  reducers: {
    adopt: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { adopt } = adoptedPetSlice.actions;
export default adoptedPetSlice.reducer;
