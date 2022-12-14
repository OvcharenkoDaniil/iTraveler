import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, NgForm} from '@angular/forms';
import {IUser, RegisterVM, SignIn} from 'src/app/model/user';


import {UserService} from "../services/user.service";
import {AlertifyService} from "../services/alertify.service";
import * as alertyfy from 'alertifyjs';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent implements OnInit {
// @ts-ignore
  registrationForm: FormGroup;
  // @ts-ignore
  user: any = {};
  User: RegisterVM;


  // @ts-ignore
  userSubmitted: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private alertify: AlertifyService,
              private dialog: MatDialog,
              private userService: UserService,

  ) { }



  ngOnInit() {
    // this.registerationForm = new FormGroup({
    //   userName: new FormControl(null, Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null, [Validators.required]),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    // }, this.passwordMatchingValidatior);
    this.createRegisterationForm();
  }

  createRegisterationForm() {
    this.registrationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
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
            this.alertify.success("???? ????????????????????????????????");
            this.dialog.closeAll();
          }
        }, error =>{
          // this.alertify.error('Tickets does not received');
        }
      )
      ;
      this.userSubmitted = false;



    }
    else {this.alertify.error("?????????? ???????????????????????? ?????? ????????????????????");}
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

  Login(loginForm: NgForm) {

    // const token = this.authService.authUser(loginForm.value);
    this.authService.login(loginForm.value).subscribe(
      response => {
        this.alertify.success('???? ?????????? ?? ??????????????');

        //console.log(response);
        //alert(response + '    data')
        //const user = response;
        this.dialog.closeAll();
        //this.router.navigate(['/main']);
      }, error =>{
        this.alertify.error('???????????? ???????????????????????? ???? ????????????????????');
        });
  }
  // onLogin(loginForm: NgForm) {
  //   console.log(loginForm.value);
  //   // const token = this.authService.authUser(loginForm.value);
  //   this.authService.authUser(loginForm.value).subscribe(
  //     (response: UserForLogin) => {
  //       console.log(response);
  //       const user = response;
  //       if (user) {
  //         localStorage.setItem('token', user.token);
  //         localStorage.setItem('userName', user.userName);
  //         this.alertify.success('Login Successful');
  //         this.router.navigate(['/']);
  //       }
  //     }
  //   );
  //
  //
  // }

  onReset() {
    this.userSubmitted = false;
    this.registrationForm.reset();
  }


  userData(): RegisterVM {
    return this.User = {
      userName: this.userName.value,
      Email: this.email.value,
      Password: this.password.value
    };
  }

  // ------------------------------------
  // Getter methods for all form controls
  // ------------------------------------
  get userName() {
    return this.registrationForm.get('userName') as FormControl;
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

  get mobile() {
    return this.registrationForm.get('mobile') as FormControl;
  }

  // login(form: NgForm) {
  //   const credentials = {
  //     'username': form.value.username,
  //     'password': form.value.password,
  //   }
  //   this.http.post("https://localhost:7138/api/auth/login", credentials).subscribe(response => {
  //     const token = (<any>response).token;
  //     localStorage.setItem("jwt", token);
  //     // this.invalidLogin = false;
  //     this.router.navigate(["/"]);
  //   }, error => {
  //     //Console.log("1111111111111111");
  //     // this.invalidLogin = true;
  //   })
  // }

}
