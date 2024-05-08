import type { IRegister } from '../../../../screens/SignUp/interfaces/IRegister';
import type { ILogin } from '../../../../screens/Login/interfaces/ILogin';

export interface RegisterRequest extends IRegister { }
export interface LoginRequest extends ILogin { }
export interface GetUserByIdRequest {
  token?: string
}