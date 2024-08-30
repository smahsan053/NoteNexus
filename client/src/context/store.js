import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "../features/note/NoteSlice.js";
import authReducer from "../features/auth/AuthSlice.js";
export const store = configureStore({
  reducer: {
    note: noteReducer,
    auth: authReducer,
  },
});
