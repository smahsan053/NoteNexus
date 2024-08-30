import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  auth: localStorage.getItem("token") ? true : false,
};

export const getLoggedIn = createAsyncThunk(
  "auth/getLoggedIn",
  async (credentials, thunkAPI) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const data = await response.json();
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // Synchronous reducers if needed
    loginHandler: (state, action) => {
      state.auth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoggedIn.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.auth = true;
        localStorage.setItem("token", action.payload.authToken);
        console.log("Login successful");
      } else {
        state.auth = false;
        console.error("Invalid email or password");
      }
    });
  },
});
export const { loginHandler } = authSlice.actions;
export default authSlice.reducer;
