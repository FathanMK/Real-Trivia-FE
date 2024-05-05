import {store} from '../stores';

export type TRootState = ReturnType<typeof store.getState>;
