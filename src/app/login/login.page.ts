import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = this.auth.user;
  credentials = {
    email: '',
    password: ''
  };
  
  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) {

   }

  login() {
    this.auth.login(this.credentials)
      .then(() => this.router.navigate(['/filter']))
      .catch(err => { if (err.message=="The password is invalid or the user does not have a password.") {
        err.message = "Login lub hasło nieprawidłowe";
        document.getElementById("loginError").innerHTML = err.message;}
       else if (err.message=="The email address is badly formatted."){
          err.message = "Zły format adresu email";
          document.getElementById("loginError").innerHTML = err.message;}
          else 
          document.getElementById("loginError").innerHTML = err.message;
        })
  }
  return(){
    this.router.navigate(['/register'])
  }



  ngOnInit() {
  }

}

