import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {IUser} from "../model/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {AlertifyService} from "../services/alertify.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  userName:string;
  userEmail:string;
  user:IUser;
  changePasswordForm: FormGroup;
  userSubmitted:boolean;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.createChangePasswordForm();
  }
  createChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required],
      //mobile: [null, [Validators.required, Validators.maxLength(10)]]
    }, {validators: this.passwordMatchingValidatior});
  }

  passwordMatchingValidatior(fg: FormGroup): Validators {
    // @ts-ignore
    return fg.get('password').value === fg.get('confirmPassword').value ? null :
      {notmatched: true};
  }

  changePassword() {
    this.userSubmitted = true;
    if (this.changePasswordForm.valid) {
      //this.user = Object.assign(this.user, this.changePasswordForm.value);

      this.userService.changePassword(this.password.value).subscribe(
        response => {
          this.alertify.success('Password changed');
          //console.log(response);
          //alert(response + '    data')
          // const user = response;


        }, error =>{
          this.alertify.error('Password dont changed');
        });

      this.userSubmitted = false;



    }
    else {this.alertify.error("Please, provide the required fields");}
  }

  loggedIn(){
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem('User'));
    console.log("this.user")
    console.log(this.user)
    return this.user;
  }

  get password() {
    return this.changePasswordForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword') as FormControl;
  }



}
