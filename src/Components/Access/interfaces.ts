//export Type of access page
export type IAccessType = 'login' | 'register';

//Fields
export type ILoginField = 'email' | 'password';
export type IRegisterField =
  | 'email'
  | 'password'
  | 'username'
  | 'birth'
  | 'role';
export type IAccessField = ILoginField | IRegisterField;

//Inputs at page
export interface ILoginValues {
  email: string;
  password: string;
}
export interface IRegisterValues {
  email: string;
  password: string;
  username: string;
  birth: Date;
  role: string;
}
export type IAccessValues = ILoginValues | IRegisterValues;

//Error list
export interface ILoginErrorList {
  all: string;
  email: string;
  password: string;
}
export interface IRegisterErrorList {
  all: string;
  email: string;
  password: string;
  username: string;
  birth: string;
  role: string;
}
export type IAccessErrorList = IRegisterErrorList | ILoginErrorList;
