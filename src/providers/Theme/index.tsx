import {ReactNode, createContext} from 'react';

import useTheme from '../../hooks/useTheme';

export const ThemeContext = createContext({} as ReturnType<typeof useTheme>);

export default function Theme({children}: {children: ReactNode}) {
  const {isLight, theme, handleTheme} = useTheme();
  return (
    <ThemeContext.Provider value={{isLight, handleTheme, theme}}>
      {children}
    </ThemeContext.Provider>
  );
}
