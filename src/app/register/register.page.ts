import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from './custom-validators';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthenticationService } from '../services/authentication.service';
import { Facebook } from '@ionic-native/facebook/ngx'
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';






@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  credentials = {
    email: '',
    password: ''
  }

  public frmSignup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public googleplus: GooglePlus,
    private auth: AuthenticationService,
    private facebook: Facebook,
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController

  ) {

    this.frmSignup = this.createSignupForm();
  }

  //   ngOnInit() {}}

  facebookLogin() {
    this.facebook.login(['email']).then(res => {
      const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
      firebase.auth().signInWithCredential(fc).then(fs => {

      }).catch(ferr => {
        alert("firebase NOK")
      })
    }).catch(err => {
      alert(JSON.stringify(err))
    }).then(succ => {
      this.auth.afAuth.authState
        .subscribe(
          user => {
            if (user) {
              this.router.navigate(['/loggedin']);
            }
          })
    })
  }


  googleLogin() {
    this.googleplus.login({
      'webClientId': '153529790154-3c6mlj3o3hp34g8krin7c8dqvvmvj337.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .catch(ns => {
          alert("NOT SUCCESS")
        })
    }).then(succ => {
      this.auth.afAuth.authState
        .subscribe(
          user => {
            if (user) {
              this.router.navigate(['/loggedin']);
            }
          })
    })
  }

  errorMessage: string;

  register() {
    this.auth.register(this.credentials)
      .then(suc => {
        this.auth.afAuth.authState
          .subscribe(
            user => {
              if (user) {

                this.router.navigate(['/accountcreated']);
              }
            })
      })
      .catch(err => {
        if (err.message == "The email address is already in use by another account.") {
          err.message = "Ten adres email jest już w użyciu";
          this.errorMessage = err.message;
        }
        else
          this.errorMessage = err.message;
      })
  }

  logOut() {
    this.auth.logout()
  }

  abort() {
    this.router.navigateByUrl('/notlogged');
    setTimeout(() => {

      this.router.navigateByUrl('/filter');
    },
      1500);
  }

  haveAccount() {
    this.router.navigateByUrl('/login');
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
}