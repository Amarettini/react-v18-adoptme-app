import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./adoptedPetSlice";

const store = configureStore({
  reducer: {
    adoptedPet,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
