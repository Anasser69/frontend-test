import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@env";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}?_page=${page}&_limit=5`);
      const data = await response.json();

      if (page === 1) {
        await AsyncStorage.setItem("users", JSON.stringify(data));
      }

      return { data, page };
    } catch (error) {
      const cachedData = await AsyncStorage.getItem("users");
      if (cachedData) {
        return { data: JSON.parse(cachedData), page: 1 };
      }
      throw Error("Failed to fetch users");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: {},
    loading: false,
    error: null,
    searchQuery: "",
    currentPage: 1,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    incrementPage: (state) => {
      state.currentPage += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        const newUsers = action.payload.data;
        newUsers.forEach((user) => {
          state.users[user.id] = user;
        });
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery, incrementPage } = userSlice.actions;
export default userSlice.reducer;
