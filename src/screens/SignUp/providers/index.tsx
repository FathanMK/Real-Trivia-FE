import {ReactNode, createContext} from 'react';

import useSignUp from '../hooks/useSignUp';

export const SignUpContext = createContext({} as ReturnType<typeof useSignUp>);

export default function SignUpProvider({children}: {children: ReactNode}) {
  const {...args} = useSignUp();
  return (
    <SignUpContext.Provider value={{...args}}>
      {children}
    </SignUpContext.Provider>
  );
}
