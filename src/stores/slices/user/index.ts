import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../services/user';

interface IInitialState {
  token: string;
  isLoading: boolean
}

const initialState: IInitialState = {
  token: '',
  isLoading: false
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
        state.isLoading = true
      }
    )
  },
});

export const { removeToken } = userSlice.actions;

export default userSlice.reducer;
