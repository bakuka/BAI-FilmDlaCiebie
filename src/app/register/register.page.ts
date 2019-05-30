import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { CustomValidators } from './custom-validators';
import { NavController } from 'ionic-angular';
import { FilterPage } from '../filter/filter.page';
import { Router } from '@angular/router';
import * as firebase  from 'firebase';
import { GooglePlus} from '@ionic-native/google-plus/ngx';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from 'ionic-angular';




@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  {



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
    private alertCtrl: AlertController,
    

  ) {
    
    this.frmSignup = this.createSignupForm();
   }

//   ngOnInit() {
//   }

// }

loginAlert() {
  let alert = this.alertCtrl.create({
    title: 'Zalogowano pomyślnie',
    subTitle: 'Zostaniesz przekierowany na stronę filtrów',
    buttons: ['OK']
  });
  alert.present();
}

registerAlert() {
  let alert = this.alertCtrl.create({
    title: 'Zarejestrowano pomyślnie',
    subTitle: 'Zostaniesz przekierowany na stronę filtrów',
    buttons: ['OK']
  });
  alert.present();
}

googleLogin(){
  this.googleplus.login({
    'webClientId': '153529790154-3c6mlj3o3hp34g8krin7c8dqvvmvj337.apps.googleusercontent.com',
    'offline': true
  }).then(res=>{
    firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
    .then(suc => {
      alert("Zalogowano pomyślnie");
      this.router.navigateByUrl('/filter');
    }).catch(ns=>{
      alert("NOT SUCCESS")
    })
  })
}

errorMessage: string;
registerInfo: string;
register() {
  this.auth.register(this.credentials)
     
    .then(() => 
    
    this.router.navigateByUrl('/home'))
    // .catch(err => console.log(err.message))
    .catch(err => {if (err.message=="The email address is already in use by another account."){
      err.message="Ten adres email jest już w użyciu";
      this.errorMessage=err.message;
    }
    else 
    this.errorMessage=err.message;
})}

logOut(){
  this.auth.logout()
}

abort(){
  this.router.navigateByUrl('/filter');
}

haveAccount(){
  this.router.navigateByUrl('/login');
}

submit() {
  // do signup or something
  console.log(this.frmSignup.value);
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
  }}