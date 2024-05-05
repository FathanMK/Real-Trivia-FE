import {PayloadAction, createSlice} from '@reduxjs/toolkit';

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
    removeToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const {removeToken} = userSlice.actions;

export default userSlice.reducer;
