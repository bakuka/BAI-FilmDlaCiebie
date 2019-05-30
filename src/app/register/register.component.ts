import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import * as firebase from 'firebase';
import { CustomValidators } from './custom-validators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';







@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent {

  credentials = {
    email: '',
    password: ''
  }

  registerInfo = '';
  user = null;

  public frmSignup: FormGroup;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService) {
    this.frmSignup = this.createSignupForm();
  }

  googleLogin() {
    this.authService.googleLogin()
      .then((res) => {
        this.router.navigate(['/loggedin'])
      })
      .catch((err) => console.log(err));
  }

  facebookLogin() {
    this.authService.facebookLogin()
    .then((res) =>{
      this.router.navigate(['/loggedin'])
   })
   .catch((err) => console.log(err));;
  }

  errorMessage: string;

  register() {
    this.authService.register(this.credentials)
      .then(() => this.router.navigate(['/accountcreated']))
      // .catch(err => console.log(err.message))
      .catch(err => {if (err.message=="The email address is already in use by another account."){
        err.message="Ten adres email jest już w użyciu";
        this.errorMessage=err.message;
      }
      else
      this.errorMessage=err.message;
  })}

  haveAccount(){
    this.router.navigate(['/login'])
  }

  abort(){
    this.router.navigate(['/notlogged'])
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            // CustomValidators.patternValidator(/[a-z]/, {
            //   hasSmallCase: true
            // }),
            // check whether the entered password has a special character
            // CustomValidators.patternValidator(
            //   /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            //   {
            //     hasSpecialCharacters: true
            //   }
            // ),
            Validators.minLength(6)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  submit() {
    // do signup or something
    console.log(this.frmSignup.value);
  }
}
