import { ReactNode, createContext } from 'react';

import useSignUp from '../hooks/useSignUp';

export const SignUpContext = createContext({} as ReturnType<typeof useSignUp>);

export default function SignUpProvider({ children }: { children: ReactNode }) {
  const { ...props } = useSignUp();
  return (
    <SignUpContext.Provider value={{ ...props }}>
      {children}
    </SignUpContext.Provider>
  );
}
