import { Provider } from "react-redux";
import { persistor, store } from "../../stores";
import { PersistGate } from "redux-persist/integration/react";
import { ReactNode } from "react";

export default function Redux({children}: {children: ReactNode}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}