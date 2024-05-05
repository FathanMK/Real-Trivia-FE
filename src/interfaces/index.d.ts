import type {IRootStackParamList} from './IRootStackParamList';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends IRootStackParamList {}
  }
}
