import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
};
const apiUrl = process.env.REACT_APP_API_URL;

export const getAllNotes = createAsyncThunk(
  "notes/getAllNotes",
  async (_, thunkAPI) => {
    const response = await fetch(`${apiUrl}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;
  }
);

export const addNote = createAsyncThunk(
  "notes/addnote",
  async (note, thunkAPI) => {
    const response = await fetch(`${apiUrl}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: note.title,
        description: note.description,
        tag: note.tag,
      }),
    });
    const data = await response.json();
    return data;
  }
);

export const updateNote = createAsyncThunk(
  "notes/updatenote",
  async (note, thunkAPI) => {
    const response = await fetch(`${apiUrl}/api/notes/updatenote/${note._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: note.title,
        description: note.description,
        tag: note.tag,
      }),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deletenote",
  async (id, thunkAPI) => {
    const response = await fetch(`${apiUrl}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;
  }
);

const noteSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    // Synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotes.fulfilled, (state, action) => {

      state.notes = action.payload;
    });
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.notes.push(action.payload);
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      // Find the index of the note to update
      const index = state.notes.findIndex(
        (note) => note._id === action.payload._id
      );

      if (index !== -1) {
        // Update the existing note at the found index
        state.notes[index] = action.payload;
      } else {
        // If the note doesn't exist, optionally add it
        state.notes.push(action.payload);
      }

    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.notes = state.notes.filter(
        (note) => note._id !== action.payload.note._id
      );
    });
  },
});

// export const { updateNote } = noteSlice.actions;
export default noteSlice.reducer;
