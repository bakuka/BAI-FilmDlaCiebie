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
            this.router.navigateByUrl('/filter');
            this.islogged = "Wyloguj";
          } else {
            this.router.navigateByUrl('/register');
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
  this.auth.logout()
  .then(() => this.router.navigateByUrl('/register'));
}

goToFilterPage(){
this.router.navigateByUrl('/filter');
}


}
  