import { Component, OnInit, ViewChild } from '@angular/core';
import { Film } from '../models/Films';
import { Filter } from '../models/filters';
import { FilterPage } from '../filter/filter.page';
import { Router } from '@angular/router';
import { YouTubeSearchService } from '../youtube-search/youtube-search.service';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion';
import { Shake } from '@ionic-native/shake/ngx';
import { Platform } from 'ionic-angular';
import { IonContent } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { FilmService } from '../services/film.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {

  userUID: String = null;
  showUserWatchButton: Boolean = false;
  showYTPlayer: Boolean = false;
  naxtChoosedFilm: Film;
  userFilms: Film[];
  userAvoidFilms: Film[];

  /**motion */
  data: any;
  subscription: any;
  /*** */

  /*YT*/
  player: YT.Player;
  public idRadomFIlmYT: string;
  /****/

  /*page binds*/
  choosedFilm = {} as Film;
  skippedFilms = {} as Film[];
  filmsList = {} as Film[];
  filterProperty = {} as Filter;

  pageFilmTitle: string;
  pageFilmYear: number;
  pagefilmScore: number;
  pageFilmGenres: string[];
  pageFilmCountries: string[];
  pageimgURL: string;
  pageFilmOriginalTitle: string;
  filterReference: FilterPage;
  /*******/

  constructor(private router: Router,
    private youtube: YouTubeSearchService,
    private platform: Platform,
    private auth: AuthenticationService,
    private filmService: FilmService) {
    this.initializePage();

    /* for logged user */
    this.auth.afAuth.authState.subscribe(
      user => {
        if (user) {
          this.userUID = user.uid;
          this.showUserWatchButton = true; /* show button for logged user*/
          this.filmService.getUserFilms(user.uid).subscribe(films => { /*get user films*/
            this.userFilms = films;
            console.log("liczba filmów zalogowanego użytkownika: " + this.userFilms.length );
          });
          this.filmService.getUserAvoidFilms(user.uid).subscribe(films => { /*get user avoid films*/
            this.userAvoidFilms = films;
            console.log("liczba filmów pomijanych przez użytkownika: " + this.userAvoidFilms.length );
          });  
        }
      });
    /*************/
  }


  ngOnInit() {

  }

  // Scrolling to element
  @ViewChild(IonContent) content: IonContent;

  logScrollStart() {
  }
  logScrolling() {
  }
  logScrollEnd() {
  }
  ScrollToBottom() {
    this.content.scrollToBottom(1500);
  }
  ScrollToTop() {
    this.content.scrollToTop(1500);
  }
  // end scrolling

  /***YT */
  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }

  onStateChange(event) {
  }
  /*****/

  initializePage() {
    this.choosedFilm = this.router.getCurrentNavigation().extras.state.filmObj;
    this.skippedFilms = this.router.getCurrentNavigation().extras.state.skippedFilms;
    this.filterProperty = this.router.getCurrentNavigation().extras.state.filterObj;
    this.filmsList = this.router.getCurrentNavigation().extras.state.filmsList;
    this.naxtChoosedFilm = this.router.getCurrentNavigation().extras.state.filmObj;

    this.bindVariables(this.choosedFilm);
  }

  bindVariables(film: Film) {
    this.pageFilmTitle = film.tittle;
    this.pageFilmYear = film.year;
    this.pagefilmScore = film.score;
    this.pageFilmGenres = film.genres;
    this.pageFilmCountries = film.countries;
    this.pageimgURL = film.imgURL;
    this.pageFilmOriginalTitle = film.originalTittle;


    this.youtube.search(film.tittle + "zwiastun PL").switch().subscribe(); / load trailer from YT /
  }

  clickRandomNextFilm() {
    var chooseFilm: Film;
    var minYearFilter: number = this.filterProperty.minYear;
    var maxYearFilter: number = this.filterProperty.maxYear;
    var movieGenres: string[] = this.filterProperty.genres;
    var movieCountries: string[] = this.filterProperty.countries;

    var filteredFilms: Film[] = [];
    filteredFilms = this.filterFilms(this.filmsList, minYearFilter, maxYearFilter, movieGenres, movieCountries, this.filterProperty.score);

    if (filteredFilms.length == 0) {
      window.alert("brak filmu z podanymi kryteriami");
      return;
    } else if (filteredFilms.length == 1) {
      chooseFilm = filteredFilms[0];
      this.skippedFilms.push(chooseFilm) /* adding to skipped list*/
    } else {
      chooseFilm = this.randomFilm(filteredFilms);
      this.skippedFilms.push(chooseFilm) /* adding to skipped list*/
    }
    this.bindVariables(chooseFilm);
    this.naxtChoosedFilm = chooseFilm;

    /***turn off the trialer*/
    this.showYTPlayer = false;
    this.player.stopVideo();
    /*****/
  }

  filterFilms(films, minYar, maxYear, genresTab, countriesTab, minScore) {
    var filteredFilms: Film[];
    filteredFilms = [];
    filteredFilms.pop();

    return filteredFilms = films.filter(filterData => {
                                                        
                                                        /* checking if the film is in user list*/
                                                        if (this.userUID != null){
                                                          for (var i = 0; i < this.userFilms.length; i++){
                                                            if (this.userFilms[i].id == filterData.id) {
                                                              return null;
                                                            }
                                                          }
                                                        }
                                                        /**********/

                                                        /* checking if the film is in user avoid list*/
                                                        if (this.userUID != null){
                                                          for (var i = 0; i < this.userAvoidFilms.length; i++){
                                                            if (this.userAvoidFilms[i].id == filterData.id) {
                                                              return null;
                                                            }
                                                          }
                                                        }
                                                        /**********/

                                                        /* checking if the film has been choosen before, if yes, it cannot be choosen*/
                                                        for (var i = 0; i < this.skippedFilms.length; i++) {
                                                          if (this.skippedFilms[i].id == filterData.id) {
                                                            return null;
                                                          }
                                                        }
                                                        /********* */

                                                        if (genresTab != null) {
                                                          var checkFilmGenre: Boolean = false;
                                                          for (var i = 0; i < filterData.genres.length; i++) {
                                                            for (var j = 0; j < genresTab.length; j++) {
                                                              if (filterData.genres[i] == genresTab[j]) {
                                                                checkFilmGenre = true;
                                                              }
                                                            }
                                                          }
                                                          if (checkFilmGenre == false) {
                                                            return null;
                                                          }
                                                        }
                                                        if (countriesTab != null) {
                                                          var checkFilmCountries: Boolean = false;
                                                          for (var i = 0; i < filterData.countries.length; i++) {
                                                            for (var j = 0; j < countriesTab.length; j++) {
                                                              if (filterData.countries[i] == countriesTab[j]) {
                                                                checkFilmCountries = true;
                                                              }
                                                            }
                                                          }
                                                          if (checkFilmCountries == false) {
                                                            return null;
                                                          }
                                                        }

                                                        return filterData.year >= Number.parseFloat(minYar) && filterData.year <= Number.parseFloat(maxYear)
                                                          && filterData.score >= minScore;
                                                        }
                                        );
  }

  randomFilm(films: Film[]) {
    var random = Math.floor(Math.random() * (films.length - 1) + 1);
    return films[random];
  }

  clickTrailer() {
    this.showYTPlayer = true;
    this.player.loadVideoById(String(this.youtube.getFilmId()));
  }

  startMotion() {
    var previousValueX = 0;
    var previousValueY = 0;
    var previousValueZ = 0;

    var options: DeviceMotionAccelerometerOptions = {
      frequency: 500
    };

    this.subscription = DeviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.data = acceleration;

      if (acceleration.x - previousValueX > 5 || acceleration.y - previousValueY > 5 || acceleration.z - previousValueZ > 5) {
        this.clickRandomNextFilm();
      }
      previousValueX = acceleration.x;
      previousValueY = acceleration.y;
      previousValueZ = acceleration.z;
    })
  }

  stopMotion() {
    this.subscription.unsubscribe();
  }

  clickUserWatched(){
    this.filmService.addUserFilm(this.userUID, this.naxtChoosedFilm );
    alert("film " + this.naxtChoosedFilm.tittle + " został dodany do twojej listy oglądanych filmów");
    this.clickRandomNextFilm();
  }

  clickUserAvoidFilm(){
    this.filmService.addUserAvoidFilm(this.userUID, this.naxtChoosedFilm );
    alert("film " + this.naxtChoosedFilm.tittle + " nie bedzie więcej pokazywany");
    this.clickRandomNextFilm();
  }
}