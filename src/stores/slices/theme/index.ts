import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type TTheme = 'dark' | 'light';

interface IInitialState {
  theme: TTheme;
}

const initialState: IInitialState = {
  theme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<TTheme>) => {
      state.theme = action.payload;
    },
  },
});

export const {setTheme} = themeSlice.actions;

export default themeSlice.reducer;
