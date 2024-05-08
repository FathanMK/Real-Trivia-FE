import type { IUser } from '../../../../interfaces/IUser';

export interface RegisterResponse {
  message?: string;
  user?: IUser;
}

export interface LoginResponse {
  token?: string;
}

export interface GetUserByIdResponse {
  user?: IUser
}
