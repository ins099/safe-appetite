import {createSlice} from '@reduxjs/toolkit';
// import {User} from '../../src/utils/interface.ts';

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, {payload}) => {
      state.accessToken = payload;
    },
    setFCMToken: (state, {payload}) => {
      state.fcmToken = payload;
    },
    setTempToken: (state, {payload}) => {
      state.tempToken = payload;
    },
    setIsRegister: (state, {payload}) => {
      state.isRegister = payload;
    },
    setUser: (state, {payload}) => {
      Object.keys(payload).forEach((key: string) => {
        state[key] = payload[key];
      });
    },
  },
});

export const {setUser, setToken, setIsRegister, setTempToken, setFCMToken} =
  userSlice.actions;

export default userSlice.reducer;
