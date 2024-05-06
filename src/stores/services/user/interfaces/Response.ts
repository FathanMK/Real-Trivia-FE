import type {IUser} from '../../../../interfaces/IUser';

export interface RegisterResponse {
  message?: string;
  user: IUser;
}
