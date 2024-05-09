import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../services/user';

interface IInitialState {
  token: string;
}

const initialState: IInitialState = {
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeToken: (state) => {
      state.token = "";
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      userApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token!
      }
    ),
      builder.addMatcher(
        userApi.endpoints.checkToken.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token!
        }
      )
  },
});

export const { removeToken } = userSlice.actions;

export default userSlice.reducer;
