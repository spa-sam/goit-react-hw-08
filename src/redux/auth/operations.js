import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearContacts } from "../contacts/slice";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/users/signup", credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue(
          "Invalid registration data. Please check your input."
        );
      }
      return rejectWithValue(
        "An error occurred during registration. Please try again later."
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/users/login", credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue("Invalid email or password. Please try again.");
      }
      return rejectWithValue(
        "An error occurred during login. Please try again later."
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await axios.post("/users/logout");
      token.unset();
      dispatch(clearContacts());
    } catch (error) {
      return rejectWithValue(
        "An error occurred during logout. Please try again later."
      );
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return rejectWithValue("Unable to fetch user. No token found.");
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue(
          "Invalid or expired token. Please log in again."
        );
      }
      return rejectWithValue(
        "An error occurred while fetching user data. Please try again later."
      );
    }
  }
);
