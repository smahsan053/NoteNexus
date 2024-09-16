import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  auth: localStorage.getItem("token") ? true : false,
};
const apiUrl = process.env.REACT_APP_API_URL;

export const getLoggedIn = createAsyncThunk(
  "auth/getLoggedIn",
  async (credentials, thunkAPI) => {
    const response = await fetch(`${apiUrl}/api/auth/login`, {
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
export const getUser = createAsyncThunk("auth/getuser", async (_, thunkAPI) => {
  const response = await fetch(`${apiUrl}/api/auth/getuser`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });
  const data = await response.json();
  return data.user;
});

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
        toast.success("Login successful!");
      } else {
        state.auth = false;
        toast.error("Invalid email or password");
      }
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      // const data = action.payload;
      // console.log(data);
      // return data;
    });
  },
});
export const { loginHandler } = authSlice.actions;
export default authSlice.reducer;
