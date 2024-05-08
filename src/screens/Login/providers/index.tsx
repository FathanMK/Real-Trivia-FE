import { ReactNode, createContext } from 'react';

import useLogin from '../hooks/useLogin';

export const LoginContext = createContext({} as ReturnType<typeof useLogin>);

export default function LoginProvider({ children }: { children: ReactNode }) {
  const { ...props } = useLogin();
  return (
    <LoginContext.Provider value={{ ...props }}>
      {children}
    </LoginContext.Provider>
  );
}
