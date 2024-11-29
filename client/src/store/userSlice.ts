import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  displayName: string | null;
  email: string | null;
  userId: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  displayName: null,
  email: null,
  userId: null,
};

interface LoginPayload {
  displayName: string;
  email: string;
  userId: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.isLoggedIn = true;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      Object.assign(state, initialState); // Resets to initialState
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
