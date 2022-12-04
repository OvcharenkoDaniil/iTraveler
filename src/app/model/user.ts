export interface UserForRegister {
    userName: string;
    email?: string;
    password: string;
    mobile?: number;
}

export interface Register {
  userName: string;
  email: string;
  password: string;
  mobile: number;
}

export interface SignIn {

  email:string;
  password: string;
}
export interface IUser {
  name: string;
  email:string;
  role: string;
}
