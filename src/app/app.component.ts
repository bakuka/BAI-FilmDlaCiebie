import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { RegisterPage} from './register/register.page';
import { FilterPage} from './filter/filter.page';
import { Router } from '@angular/router';
import { Film } from './models/Films';
import { FilmService } from './services/film.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  islogged : string;
  userUID: String = null;
  userFilms: Film[];
  

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
    private filmService: FilmService,
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

            /***initialize user films */
            this.filmService.getUserFilms(user.uid).subscribe(films => { /*get user films*/
            this.userFilms = films;
            });
            /***** */
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
  this.router.navigate(['/mymovies'] , { state: { filmsUserList: this.userFilms
                      }});
  }

}
  