import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { RegisterPage} from './register/register.page';
import { FilterPage} from './filter/filter.page';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  islogged : string;
  userUID: String = null;
  

  rootPage;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Movie',
      url: '/movie',
      icon: 'list'
    },
    {
      title: 'Filtry',
      url: '/filter',
      icon: 'list'
    },
    {
     
      title: 'Wyloguj',
      url: '/register',
      icon: 'list',
      click: 'logOut()'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthenticationService,
    private router: Router,
  ) {
    this.initializeApp();

  }



	initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.userUID = user.uid;
            this.router.navigate(['/filter']);
            this.islogged = "Wyloguj";
          } else {
            this.router.navigate(['']);
            this.islogged = "Zaloguj";
          }
        },
        () => {
          this.router.navigateByUrl('/register');
        }
      );
    });

  
}
logOut(){

  if (this.userUID != null){
  this.router.navigate(['/loggedout']);
  setTimeout(() => 
{
    this.auth.logout();
     this.userUID=null;
    
},
2000);}
else{
  this.router.navigate(['/register']);
}



}

goToFilterPage(){
this.router.navigateByUrl('/filter');
}

goToMoviesPage(){
  this.router.navigateByUrl('/mymovies');
  }

}
  