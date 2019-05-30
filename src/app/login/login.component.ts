import { Component, OnInit } from '@angular/core';
import { AuthService } from '../register/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = this.authService.user;
  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

   }

  login() {
    this.authService.login(this.credentials)
      .then(() => this.router.navigate(['/loggedin']))
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
