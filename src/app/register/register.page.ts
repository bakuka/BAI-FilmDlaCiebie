import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { CustomValidators } from './custom-validators';
import { NavController } from 'ionic-angular';
import { FilterPage } from '../filter/filter.page';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthenticationService } from '../services/authentication.service';
import {Facebook} from '@ionic-native/facebook/ngx'
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';






@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  APP_ID: number = 437719640393686;


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

  //   ngOnInit() {
  //   }

  // }

  async facebookLogin(){
		const loading = await this.loadingController.create({
			message: 'Please wait...'
		});
		this.presentLoading(loading);
		let permissions = new Array<string>();

		//the permissions your facebook app needs from the user
     permissions = ["public_profile", "email"];

		this.facebook.login(permissions)
		.then(response =>{
			let userId = response.authResponse.userID;

			//Getting name and gender properties
			this.facebook.api("/me?fields=name,email", permissions)
			.then(user =>{
				user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
				//now we have the users info, let's save it in the NativeStorage
				this.nativeStorage.setItem('facebook_user',
				{
					name: user.name,
					email: user.email,
					picture: user.picture
				})
				.then(() =>{
					this.router.navigate(["/loggedin"]);
					loading.dismiss();
				}, error =>{
					console.log(error);
					loading.dismiss();
				})
			})
		}, error =>{
			console.log(error);
			loading.dismiss();
		});
  }
  
  // facebookLogin(){
  //   this.facebook.login(['email']).then(res=>{
  // const fc=firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
  // firebase.auth().signInWithCredential(fc).then(fs=>{
    
  // }).catch(ferr=>{
  //   alert("firebase NOK")
  // })
  //   }).catch(err=>{
  //     alert(JSON.stringify(err))
  //   }).then(succ => {
  //     this.auth.afAuth.authState
  //       .subscribe(
  //         user => {
  //           if (user) {
  //             this.router.navigate(['/loggedin']);
  //           }
  //         })
  //   })
  // }

	async presentLoading(loading) {
		return await loading.present();
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
    setTimeout(() => 
    {

      this.router.navigateByUrl('/filter');
    },
    1500);}
  

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
}