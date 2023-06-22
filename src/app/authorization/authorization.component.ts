import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, NgForm} from '@angular/forms';
import {IUser, RegisterVM, SignIn} from 'src/app/model/user';

import {AlertifyService} from "../services/alertify.service";
import * as alertyfy from 'alertifyjs';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SearchNavBarComponent} from "../search-nav-bar/search-nav-bar.component";
@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent implements OnInit {
// @ts-ignore
  registrationForm: FormGroup;
  loginForm: FormGroup;
  // @ts-ignore
  user: any = {};
  User: RegisterVM;


  // @ts-ignore
  userSubmitted: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private alertify: AlertifyService,
              private dialog: MatDialog

  ) { }



  ngOnInit() {

    this.createRegisterationForm();
    this.createLoginForm();
  }

  createRegisterationForm() {
    this.registrationForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(5)]],
      secondName: [null, [Validators.required, Validators.minLength(5)]],
      phoneNumber: [null, [Validators.required, Validators.minLength(12),Validators.maxLength(12)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      confirmPassword: [null, Validators.required],

    }, {validators: this.passwordMatchingValidatior});
  }
  createLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  passwordMatchingValidatior(fg: FormGroup): Validators {
    // @ts-ignore
    return fg.get('password').value === fg.get('confirmPassword').value ? null :
      {notmatched: true};
  }


  Register() {
    console.log(this.registrationForm.value);
    this.userSubmitted = true;
    if (this.registrationForm.valid) {
      //this.user = Object.assign(this.user, this.registrationForm.value);
      this.authService.Register(this.userData()).subscribe(
        response => {
          // this.alertify.success('Tickets received');
          if (response!=null){
            //console.log("Register executed")
            this.alertify.success("Вы зарегистрированы");
            this.dialog.closeAll();
            var user = new SignIn();
            user.email = this.userData().Email
            user.password = this.userData().Password
            //this.login(user)
          }
        }, error =>{
           this.alertify.error('Пользователь с таким email уже существует');
        }
      )
      ;
      this.userSubmitted = false;



    }
    else {this.alertify.error("Заполните все поля");}
    // this.userSubmitted = true;
    // if (this.registrationForm.valid) {
    // this.user = Object.assign(this.user, this.registerationForm.value);
    // this.authService.registerUser(this.userData()).subscribe(() =>
    // {
    //   this.onReset();
    //   this.alertify.success('Congrats, you are successfully registered');
    // });
    // }
  }

  public get isLoggedIn(): boolean {
    return this.authService.isAuthenticated()
  }

  // loginForm: NgForm
  LoginWithForm() {
    console.log("loginForm.value")
    console.log(this.loginForm.value)
    this.login(this.loginForm.value);

  }
  login(loginData:SignIn){
    this.authService.login(loginData).subscribe(
      response => {
        this.alertify.success('Вы вошли в систему');

        //console.log(response);
        //alert(response + '    data')
        //const user = response;
        this.dialog.closeAll();
        //this.router.navigate(['/main']);
      }, error =>{
        this.alertify.error('Такого пользователя не существует');
      });
  }


  onReset() {
    this.userSubmitted = false;
    this.registrationForm.reset();
  }


  userData(): RegisterVM {
    return this.User = {
      FirstName: this.firstName.value,
      SecondName: this.secondName.value,
      PhoneNumber: this.phoneNumber.value,
      Email: this.email.value,
      Password: this.password.value
    };
  }

  // ------------------------------------
  // Getter methods for all form controls
  // ------------------------------------




  // get userName() {
  //   return this.registrationForm.get('userName') as FormControl;
  // }
  get firstName() {
    return this.registrationForm.get('firstName') as FormControl;
  }
  get secondName() {
    return this.registrationForm.get('secondName') as FormControl;
  }
  get phoneNumber() {
    return this.registrationForm.get('phoneNumber') as FormControl;
  }

  get email() {
    return this.registrationForm.get('email') as FormControl;
  }

  get password() {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get passwordForLogin() {
    return this.loginForm.get('password') as FormControl;
  }
  get emailForLogin() {
    return this.loginForm.get('email') as FormControl;
  }

}
