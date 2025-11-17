import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth/authApi";

interface User {
  id: string;
  nome: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = { user: null, loading: false, error: null };

export const fetchMe = createAsyncThunk("auth/fetchMe", async (_, { rejectWithValue }) => {
  try {
    const res = await authApi.me();
    return res.data as User;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Erro ao buscar usuário");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMe.fulfilled, (state, action: PayloadAction<User>) => { state.loading = false; state.user = action.payload; })
      .addCase(fetchMe.rejected, (state, action) => { state.loading = false; state.user = null; state.error = action.payload as string; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
