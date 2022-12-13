
export interface RegisterVM {
  userName: string;
  Email: string;
  Password: string;
}

export class SignIn {

  email:string;
  password: string;
  newPassword: string;
}

export interface IUser {
  name: string;
  email:string;
  role: string;
}
