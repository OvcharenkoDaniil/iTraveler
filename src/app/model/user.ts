
export interface RegisterVM {
  FirstName: string;
  SecondName: string;
  PhoneNumber: string;
  Email: string;
  Password: string;
}

export class SignIn {

  email:string;
  password: string;
  newPassword: string;
}
export class AccountEmailData {
  email:string;
  newEmail:string;
}

export class IUser {
  name: string;
  family_name:string;
  phonenumber:string;
  email:string;
  role: string;
}

export class Account {

  email:string;
  account_id: number;
  role:number;
  firstName: string;
  secondName: string;
  phoneNumber: string;
}

