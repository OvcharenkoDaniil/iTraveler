
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
export class AccountDeleteData {
  email:string;
}

export class IUser {
  name: string;
  email:string;
  role: string;
}

export class Account {

  email:string;
  account_id: number;
  role:number;
  name: string;
}

