import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  username?: string;
  password?: string;
}

const initialState: IInitialState = {
  username: '',
  password: "",
};

const savedUserSlice = createSlice({
  name: 'savedUser',
  initialState,
  reducers: {
    setSavedAccount: (state, action: PayloadAction<IInitialState>) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
  },
});

export const { setSavedAccount } = savedUserSlice.actions;

export default savedUserSlice.reducer;
